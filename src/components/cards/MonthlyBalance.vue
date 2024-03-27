<script setup>
import BarChart from "../charts/BarChart.vue";
import { getMonthlyBalance } from "../../composables/transcations.ts";
const chartData = getMonthlyBalance();
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
        text: "Month",
      },
    },
    y: {
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
    <h2 class="card-title">Monthly Balance</h2>
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>
