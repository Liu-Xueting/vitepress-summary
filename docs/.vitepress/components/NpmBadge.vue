<script setup lang="ts">
const props = defineProps<{
  repo: string
}>()
</script>

<template>
  <div class="min-w-32 flex items-start justify-center flex-col">
    <a :href="`https://www.npmjs.com/package/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo license" loading="lazy"
        :src="`https://img.shields.io/npm/l/${props.repo}?style=flat`">
    </a>
    <a :href="`https://www.npmjs.com/package/${props.repo}?activeTab=versions`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo version" loading="lazy"
        :src="`https://img.shields.io/npm/v/${props.repo}?style=flat`">
    </a>
    <a :href="`https://www.npmjs.com/package/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo downloads" loading="lazy"
        :src="`https://img.shields.io/npm/dm/${props.repo}?style=flat`">
    </a>
    <a :href="`https://www.npmjs.com/package/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo last update" loading="lazy"
        :src="`https://img.shields.io/npm/last-update/${props.repo}?style=flat`">
    </a>
  </div>
</template>
