<script setup>
import Aside from "./components/Aside.vue";
import { onMounted, ref } from "vue";
import Auth from "./components/Auth.vue";
import { supabase } from "./lib/supabaseClient.ts";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div
    class="window flex min-h-screen bg-gradient-to-br from-elephant-50 via-violet-100 to-elephant-200"
  >
    <Aside />
    <main class="p-8">
      <RouterView v-if="session" :session="session" />
      <Auth v-else />
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
