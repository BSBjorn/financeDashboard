<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient.ts";

const loading = ref(false);
const email = ref("");
const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="grid place-content-center h-full">
    <div class="card max-w-screen-sm grid gap-4">
      <h1 class="header">Supabase + Vue 3</h1>
      <div>
        <button class="btn bg-violet-200" @click="signInWithGitHub">
          GitHub Sign In
        </button>
      </div>
      <form class="grid gap-2" @submit.prevent="handleLogin">
        <p class="description">Sign in via magic link with your email below</p>
        <input
          class="p-2 w-full border border-gray-300 rounde"
          required
          type="email"
          placeholder="Your email"
          v-model="email"
        />
        <input
          type="submit"
          class="btn"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>
