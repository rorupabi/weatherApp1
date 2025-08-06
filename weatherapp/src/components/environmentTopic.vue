<template>
  <div>
    <h2 class="font-bold text-2xl">Save Trees by clicking the button</h2>
    <ul>
      <li v-for="topic in topics" :key="topic.id">{{ topic.name }}</li>
    </ul>
    <button @click="saveTrees">Save Trees</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        { id: 1, name: "Climate Change" },
        { id: 2, name: "Pollution" },
        { id: 3, name: "Deforestation" },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  color: green;
}
</style>