<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../../lib/supabaseClient";

const transcations = ref([]);
const error = ref(null);
const to = ref(14);
const from = ref(0);

async function nextPage() {
  to.value = to.value + 15;
  from.value = from.value + 15;

  await getTransactions(from.value, to.value);
}

async function previousPage() {
  to.value = to.value - 15;
  from.value = from.value - 15;
  await getTransactions(from.value, to.value);
}
async function getTransactions() {
  let { data, error } = await supabase
    .from("transactions")
    .select("date,amount,description,id,category")
    .order("date", { ascending: false })
    .range(from.value, to.value);

  if (error) {
    throw new Error(error.message);
  } else {
    transcations.value = data;
  }
}

onMounted(() => {
  getTransactions();
});
</script>

<template>
  <div class="card">
    <h2 class="card-title">Latest Transactions</h2>
    <ul class="text-sm">
      <li
        v-for="transaction in transcations"
        :key="transaction.id"
        class="mb-1 border-b border-gray-200 pb-1"
      >
        <span class="text-ellipsis text-xs">
          {{ transaction.category }}
        </span>
        <span class="grid grid-cols-[1fr_1fr_3fr] gap-2">
          <span>
            {{
              new Date(transaction.date).toLocaleDateString("nb-NO", {
                day: "2-digit",
                month: "long",
              })
            }}
          </span>
          <span
            :class="
              transaction.amount < 0 ? '-ml-2 text-red-500' : 'text-green-800'
            "
          >
            {{ transaction.amount }}kr</span
          >
          <span class="line-clamp-1">
            {{ transaction.description }}
          </span>
        </span>
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
    <div class="flex gap-8">
      <button
        class="btn mt-8 disabled:opacity-10"
        @click="previousPage"
        :disabled="from <= 0"
      >
        Previous
      </button>
      <button class="btn mt-8" @click="nextPage">Next</button>
    </div>
  </div>
</template>
