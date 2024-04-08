<template>
  <div>
    <div v-if="manual">
      <h1>{{ manual.title }}</h1>
      <p v-for="line in manual.instructions.split('\n\n')">{{ line }}</p>
    </div>
    <div>
      <p @click="navigateTo('/')"><b>Back Home</b></p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: manual } = await useAsyncData(String(route.params.title), () =>
  queryContent('/')
    .where({ id: String(route.params.id) })
    .findOne()
);
</script>

<style scoped>
h1 {
  text-transform: capitalize;
}

b {
  cursor: pointer;
}
</style>
