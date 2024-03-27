<script setup>
import { ref, computed } from "vue";
import LineChart from "../charts/LineChart.vue";
import { getLastDaysActivity } from "../../composables/transcations.ts";
const days = ref(10);
const chartData = computed(() => getLastDaysActivity(days.value));
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
        class="p-2 border rounded w-16"
        type="number"
        v-model="days"
        min="4"
        max="90"
      />
      days
    </h2>

    <LineChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>
