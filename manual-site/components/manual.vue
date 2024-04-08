<template>
  <div>
    <h1>Manual</h1>
    <p>Title: {{ manual.title }}</p>
    <p>Instructions: {{ manual.instructions }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IManual } from '~~/types/manual.type';

const props = defineProps({
  manual: {
    type: Object,
    required: true,
  },
});

const { manual } = props;
</script>
