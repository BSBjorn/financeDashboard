<script setup>
import { ref, computed, onMounted } from "vue";
import LineChart from "../charts/LineChart.vue";
import { getLastDaysActivity } from "../../composables/getLastDaysActivity";
import { supabase } from "../../lib/supabaseClient";

const transcations = ref([]);
const loading = ref(false);
const days = ref(20);
const lastDate = computed(() => {
  const currentDate = new Date();
  const numberOfDays = days.value;
  const date = new Date(
    currentDate.setDate(currentDate.getDate() - numberOfDays)
  );
  return date;
});

const chartData = computed(() =>
  getLastDaysActivity(transcations.value, days.value)
);

async function getTransactions() {
  loading.value = true;
  let { data, error } = await supabase
    .from("transactions")
    .select("date,amount,description,category,subcategory,id")
    .order("date", { ascending: false })
    .neq("subcategory", "Budsjettoverførsel")
    .gt("date", lastDate.value.toISOString());

  if (error) {
    throw new Error(error.message);
  }
  transcations.value = data;
  loading.value = false;
}

onMounted(() => {
  getTransactions();
});

const chartOptions = {
  plugins: {
    legend: {
      display: false, // This hides all text in the legend and also the labels.
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      suggestedMax: 4000,
      title: {
        display: true,
        text: "Amount",
      },
    },
  },
};
</script>

<template>
  <div>
    <h2 class="card-title inline-block">
      Last
      <input
        class="p-1 border rounded w-16"
        type="number"
        v-model="days"
        @change="getTransactions(days)"
        min="4"
        max="90"
      />
      days
    </h2>
    <p v-if="loading">Loading</p>
    <LineChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>
