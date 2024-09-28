<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";
defineProps<{
    text: string;
}>()
</script>

<template>
    <MenuItem v-slot="{ active }">
        <button
            class="group flex max-w-max whitespace-nowrap items-center rounded-md px-3 py-1.5 transition-colors"
            :class="{ 'text-neutral-950': active, 'pr-[calc(.75rem+1.5px)]': !active }"
        >
            <slot class="h-6 w-6" />
            <span class="relative top-[0.5px] pl-2" :class="{'font-medium': active}">
                {{ text }}
            </span>
        </button>
    </MenuItem>
</template>