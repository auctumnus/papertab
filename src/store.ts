import { reactive, markRaw, Component, watch } from 'vue'
import WelcomeWidget from './widgets/WelcomeWidget.vue'
import TextWidget from './widgets/TextWidget.vue'
import { nanoid } from 'nanoid'

export interface Widget {
    kind: 'welcome' | 'text'
    id: string
    widget: Component
}

export const store = reactive({
    widgets: [
        {
            id: 'welcome',
            kind: 'welcome',
            widget: markRaw(WelcomeWidget),
        },
        {
            id: 'text',
            kind: 'text',
            widget: markRaw(TextWidget),
        }
    ] as Widget[]
})

const widgetWithId = (kind: Widget["kind"], id: string) => {
    const component = (() => {
        switch (kind) {
            case 'welcome':
                return WelcomeWidget
            case 'text':
                return TextWidget
            default:
                return null
        }
    })()
    if(!component) {
        return null
    }
    const widget = markRaw(component)

    return { id, kind, widget }
}

const widgets = localStorage.getItem('widgets')
if (widgets) {
    const parsed = JSON.parse(widgets) as { id: string, kind: 'welcome' | 'text' }[]
    store.widgets = parsed.map(({ id, kind }) => widgetWithId(kind, id)).filter(Boolean) as Widget[]
}

watch(store.widgets, () => {
    const serializable = store.widgets.map(({ id, kind }) => ({ id, kind }))
    localStorage.setItem('widgets', JSON.stringify(serializable))
})

export const newWidget = (kind: Widget["kind"]) => widgetWithId(kind, nanoid())

export const addWidget = (widget: Widget, position: number) => {
    store.widgets.splice(position, 0, widget)
}