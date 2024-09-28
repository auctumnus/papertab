<script setup lang="ts">
import { useNow } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

defineProps<{
  id: string;
}>()

const now = useNow();

const timeFormatter = Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "numeric",
});

const { t } = useI18n();

const time = computed(() => {
  const n = now.value;
  return timeFormatter.format(n);
});

const greeting = computed(() => {
  const n = now.value;
  if (n.getHours() > 12) {
    return t("good-afternoon");
  } else if (n.getHours() > 18) {
    return t("good-evening");
  } else {
    return t("good-morning");
  }
});

const due = computed(() => {
  return t("tasks", {
    total: 10,
    soon: 3,
  });
});
</script>

<template>
  <div :id="id" class="flex h-60 w-full flex-col justify-center align-middle group-hover:bg-neutral-100 rounded-md">
    <span class="text-center text-3xl font-semibold text-neutral-800">{{
      time
    }}</span>
    <span class="text-center text-neutral-500">{{ greeting }} {{ due }}</span>
  </div>
</template>

<i18n lang="yaml">
en:
  good-morning: "Good morning."
  good-afternoon: "Good afternoon."
  good-evening: "Good evening."
  tasks: "You have {total} tasks due, with {soon} due soon."
de:
  good-morning: "Guten Morgen."
  good-afternoon: "Guten Tag."
  good-evening: "Guten Abend."
</i18n>
