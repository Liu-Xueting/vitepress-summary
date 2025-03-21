<script setup lang="ts">
const props = defineProps<{
  repo: string
}>()
</script>

<template>
  <div class="min-w-32 flex items-start justify-center flex-col">
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo license" loading="lazy"
        :src="`https://img.shields.io/pypi/l/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}/#history`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo version" loading="lazy"
        :src="`https://img.shields.io/pypi/v/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo downloads" loading="lazy"
        :src="`https://img.shields.io/pypi/dm/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo format" loading="lazy"
        :src="`https://img.shields.io/pypi/format/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo status" loading="lazy"
        :src="`https://img.shields.io/pypi/status/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo python version" loading="lazy"
        :src="`https://img.shields.io/pypi/pyversions/${props.repo}?style=flat`">
    </a>
    <a :href="`https://pypi.org/project/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo implementation" loading="lazy"
        :src="`https://img.shields.io/pypi/implementation/${props.repo}?style=flat`">
    </a>
  </div>
</template>
