<script setup lang="ts">
import AddWidget from "./AddWidget.vue";
import { VueDraggable } from 'vue-draggable-plus'
import { store } from "./store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

</script>

<template>
  <div class="flex flex-row justify-center">
    <main class="mx-4 my-4 flex flex-col justify-center gap-2">
      <VueDraggable v-model="store.widgets" handle=".drag-point" :animation="150" easing="cubic-bezier(0.2, 0.0, 0, 1.0)">
        <div v-for="widget in store.widgets" :key="widget.id" class="widget-container group">
          <div class="drag-point w-8 h-1fr group-hover:opacity-100 opacity-0 text-slate-400 transition-opacity">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 15v-2h16v2zm0-4V9h16v2z"/></svg>
          </div>
          <component class="widget place-self-center" :is="widget.widget" :id="widget.id" />
          <div class="pl-2 w-8 h-1fr group-hover:opacity-100 opacity-0 text-slate-400 transition-opacity">
            <button :aria-label="t('close')" @click="store.widgets = store.widgets.filter(({ id }) => id !== widget.id)">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
            </button>
          </div>
        </div>
      </VueDraggable>
      <div class="mx-8">
        <AddWidget />
      </div>
    </main>
  </div>
</template>

<style lang="css" scoped>
main {
  width: 768px;
}

.widget-container {
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  grid-template-rows: 1fr;
  align-items: center;
  
}

.widget-container + .widget-container {
  margin-top: 1rem;
}
</style>

<i18n lang="yaml">
en:
  close: "Close"
de:
  close: "Schließen"
</i18n>