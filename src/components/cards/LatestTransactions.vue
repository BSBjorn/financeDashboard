<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../../lib/supabaseClient";

const transcations = ref([]);
const error = ref(null);
async function getTransactions() {
  let { data, error } = await supabase
    .from("transactions")
    .select("Dato,Beløp,Tekst,id")
    .order("Dato", { ascending: false })
    .limit(5);
  transcations.value = data;

  if (error) {
    throw new Error(error.message);
  }
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
        {{ transaction.Beløp }} - {{ transaction.Tekst }}
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
