<template>
  <div>
    <h1>All Pages</h1>
    <!-- <Spread
      v-for="(manual, index) in manuals"
      :key="manual.id"
      :manual="manual"
      :idx="index"
    /> -->
    <Spread :manual="manuals[0]" :idx="0" />
  </div>
</template>

<script setup lang="ts">
const { data: manuals } = await useAsyncData('manuals', () =>
  queryContent('/manual').find()
);

const fixedManuals = computed(() => {
  return manuals.value?.map((manual: any) => {
    return {
      ...manual,
      instructions:
        '<p>' + manual.instructions.replace(/\n/g, '<br />') + '</p>',
    };
  });
});
</script>
