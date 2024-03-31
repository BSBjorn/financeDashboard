<script setup>
import { onMounted, ref } from "vue";

import { supabase } from "../../lib/supabaseClient";

const transcations = ref([]);
const error = ref(null);
async function getTransactions() {
  let { data, error } = await supabase.from("transactions").select();
  if (error) {
    throw new Error(error.message);
  }
  transcations.value = data;
}

onMounted(() => {
  getTransactions();
});
</script>

<template>
  <div class="card">
    <h2 class="card-title">Latest Transactions</h2>
    <button @click="fetchTransactions">Refresh</button>
    <ul>
      <li v-for="transaction in transcations" :key="transaction.id">
        {{ transaction.amount }} - {{ transaction.description }}
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
