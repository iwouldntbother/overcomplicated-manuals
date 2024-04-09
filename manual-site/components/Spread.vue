<template>
  <div>
    <h1>{{ manual.title }}</h1>
    <span>{{ manual.id }}</span>
    <p>{{ manual.instructions }}</p>
    <span class="footerText">William Westwood</span>
    <span class="pageNo">{{ idx + 1 }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  manual: {
    type: Object,
    required: true,
  },
  idx: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
div {
  width: 3508px;
  height: 2480px;
  background-color: white;
  color: black;
  padding: 20px;
  box-sizing: content-box;
  position: relative;
}

h1 {
  max-width: 1754px;
  font-size: 8rem;
}

span {
  font-size: 2rem;
}

p {
  white-space: break-spaces;
  font-size: 0.9vw;
  line-height: 1.1vw;
  margin: 2rem 0 0 0;
  padding: 0;
  height: 90%;
  column-count: 2;
  padding-right: 5%;
  column-gap: 5%;
  column-fill: auto;
  break-inside: avoid;
}

.pageNo {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 2rem;
}

.footerText {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 2rem;
}
</style>
