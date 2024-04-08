<template>
  <div>
    <h1>All Manuals</h1>
    <input type="text" v-model="filter" placeholder="Search for a manual..." />
    <span>{{ filteredManuals?.length }}/{{ manuals?.length }}</span>
    <div class="manuals-list">
      <div
        v-for="manual in filteredManuals"
        :key="manual.id"
        @click="navigateTo('/manual/' + manual.id)"
      >
        <p>{{ manual.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filter: Ref<string> = ref('');

const { data: manuals } = await useAsyncData('manuals', () =>
  queryContent('/manual').find()
);

const filteredManuals = computed(() => {
  return manuals.value?.filter(
    (x: any) => x.title.toLowerCase().includes(filter.value.toLowerCase()),
    { lazy: true }
  );
});
</script>

<style scoped>
span {
  margin-left: 10px;
}

.manuals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
}

p {
  text-transform: capitalize;
  cursor: pointer;
  margin: 5px;
}
</style>
