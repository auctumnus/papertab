<script setup lang="ts">
import { useLocalStorage, useTextareaAutosize } from "@vueuse/core";
import { nextTick, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { store, newWidget } from "../store";
import { nanoid } from "nanoid";

const props = defineProps<{
  id: string;
}>()

const text = ref("");

const { textarea } = useTextareaAutosize({ input: text });

const { t } = useI18n();

const storage = useLocalStorage(`widget-text-${props.id}`, "");

onMounted(() => {
  text.value = storage.value;
})

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const myIndex = store.widgets.findIndex((widget) => widget.id === props.id);
    const newTextWidget = newWidget('text')
    store.widgets.splice(myIndex + 1, 0, newTextWidget);
    nextTick(() => {
      const el = document.getElementById(newTextWidget.id)
      el?.scrollIntoView({ behavior: "smooth" });
      el?.focus();
    })
  } else if(e.key === 'Backspace' && text.value === '') {
    const myIndex = store.widgets.findIndex((widget) => widget.id === props.id);
    if (myIndex > 0) {
      store.widgets.splice(myIndex, 1);
      nextTick(() => {
        const el = document.getElementById(store.widgets[myIndex - 1].id)
        el?.scrollIntoView({ behavior: "smooth" });
        el?.focus();
      })
    }
  }
}

watch(text, () => {
  storage.value = text.value;
})
</script>

<template>
  <textarea
    class="w-full resize-none appearance-none rounded border border-transparent
      bg-neutral-50 px-3.5 py-2.5 text-neutral-600 outline-none transition-colors
      placeholder:text-neutral-300 group-hover:bg-neutral-100 focus:bg-neutral-100 dark:bg-neutral-800
      dark:text-neutral-50 dark:placeholder:text-neutral-600"
    :id="id"
    ref="textarea"
    :placeholder="t('type-here')"
    v-model="text"
    @keydown="onKeydown"
  ></textarea>
</template>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>

<i18n lang="yaml">
en:
  type-here: "Type here..."
de:
  type-here: "Hier tippen..."
</i18n>
