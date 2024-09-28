<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { useI18n } from "vue-i18n";
import AddWidgetMenuItem from "./AddWidgetMenuItem.vue";
import { nextTick } from "vue";
import { newWidget, store, Widget, addWidget as _addWidget } from "./store";
import { nanoid } from "nanoid";

const { t } = useI18n();

const addWidget = (kind: Widget["kind"]) => {
  const id = nanoid();
  const widget = newWidget(kind)
  _addWidget(widget, store.widgets.length)
  nextTick(() => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    el?.focus();
  });
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      class="group flex max-w-max flex-row items-center justify-center rounded-md px-3 py-1.5
        text-neutral-500 outline-1 outline-neutral-300 transition-[outline]
        hover:text-slate-600 hover:shadow-sm hover:outline"
      ref="button"
    >
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
      <span
        class="relative top-[0.5px] pl-2 opacity-0 transition-opacity group-hover:opacity-100"
        v-if="true"
      >
        {{ t("add-widget") }}
      </span>
    </MenuButton>
    <transition
      class="origin-top-left"
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <MenuItems
        class="absolute left-0 top-0 origin-top-right divide-y divide-neutral-200
          rounded-md bg-neutral-50 shadow-sm outline-1 outline-neutral-300 outline text-neutral-600 maw-w-max"
      >
        <div>
          <AddWidgetMenuItem :text="t('text-widget')" @click="addWidget('text')">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 15q-.425 0-.712-.288T16 14v-4q0-.425.288-.712T17 9h3q.425 0 .713.288T21 10v1h-1.5v-.5h-2v3h2V13H21v1q0 .425-.288.713T20 15zm-7.5 0V9h4q.425 0 .713.288T14.5 10v1q0 .425-.288.713T13.5 12q.425 0 .713.288T14.5 13v1q0 .425-.288.713T13.5 15zm1.5-3.75h2v-.75h-2zm0 2.25h2v-.75h-2zM3 15v-5q0-.425.288-.712T4 9h3q.425 0 .713.288T8 10v5H6.5v-1.5h-2V15zm1.5-3h2v-1.5h-2z"/></svg>
          </AddWidgetMenuItem>

          <AddWidgetMenuItem :text="t('image-widget')" @click="addWidget('welcome')" class=" border-t border-neutral-300 rounded-t-none">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm1-2h12l-3.75-5l-3 4L9 13zm-1 2V5z"/></svg>
          </AddWidgetMenuItem>
          
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<i18n lang="yaml">
en:
  add-widget: "Add widget"
  text-widget: "Text widget"
  image-widget: "Image widget"
de:
  add-widget: "Widget hinzufügen"
  text-widget: "Text-Widget"
  image-widget: "Bild-Widget"
</i18n>
