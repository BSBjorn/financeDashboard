<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../../lib/supabaseClient";

const transcations = ref([]);
const error = ref(null);
async function getTransactions() {
  let { data, error } = await supabase
    .from("transactions")
    .select("date,amount,description,id")
    .order("date", { ascending: false })
    .limit(15);
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
      <li
        v-for="transaction in transcations"
        :key="transaction.id"
        class="grid grid-cols-3 gap-4"
      >
        <span>
          {{ new Date(transaction.date).toLocaleDateString("nb-NO") }}
        </span>
        <span> {{ transaction.amount }}kr</span>
        <span>
          {{ transaction.description }}
        </span>
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
