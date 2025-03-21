<script setup lang="ts">
const props = defineProps<{
  repo: string
}>()
</script>

<template>
  <div class="min-w-32 flex items-start justify-center flex-col">
    <a :href="`https://github.com/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo license" loading="lazy"
        :src="`https://img.shields.io/github/license/${props.repo}?style=flat`">
    </a>
    <a :href="`https://github.com/${props.repo}/stargazers`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo stars" loading="lazy"
        :src="`https://img.shields.io/github/stars/${props.repo}?style=flat`">
    </a>
    <a :href="`https://github.com/${props.repo}/tags`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo tag" loading="lazy"
        :src="`https://img.shields.io/github/v/tag/${props.repo}?style=flat`">
    </a>
    <a :href="`https://github.com/${props.repo}/commits/`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo release date" loading="lazy"
        :src="`https://img.shields.io/github/last-commit/${props.repo}?style=flat`">
    </a>
  </div>
</template>
