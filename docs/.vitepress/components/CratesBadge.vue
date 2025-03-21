<script setup lang="ts">
const props = defineProps<{
  repo: string
}>()
</script>

<template>
  <div class="min-w-32 flex items-start justify-center flex-col">
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo license" loading="lazy"
        :src="`https://img.shields.io/crates/l/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}/versions`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo version" loading="lazy"
        :src="`https://img.shields.io/crates/v/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo size" loading="lazy"
        :src="`https://img.shields.io/crates/size/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo downloads (latest)" loading="lazy"
        :src="`https://img.shields.io/crates/dv/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo downloads (recent)" loading="lazy"
        :src="`https://img.shields.io/crates/dr/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="repo downloads (total)" loading="lazy"
        :src="`https://img.shields.io/crates/d/${props.repo}?style=flat`">
    </a>
    <a :href="`https://crates.io/crates/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="msrv" loading="lazy"
        :src="`https://img.shields.io/crates/msrv/${props.repo}?style=flat`">
    </a>
    <a :href="`https://docs.rs/${props.repo}`" target="_blank">
      <img class="h-4 mt-1 bg-cover hover:opacity-80 transition-opacity" alt="msrv" loading="lazy"
        :src="`https://img.shields.io/docsrs/${props.repo}?style=flat`">
    </a>
  </div>
</template>
