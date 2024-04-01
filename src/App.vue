<script setup>
import Aside from "./components/Aside.vue";
</script>

<template>
  <div class="window flex h-screen bg-slate-50">
    <Aside />
    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  display: grid;
  grid-template-columns: 300px 3fr;
}
</style>
