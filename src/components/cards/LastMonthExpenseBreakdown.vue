<script setup>
import { ref, computed } from "vue";
import DoughnutChart from "../charts/DoughnutChart.vue";
import { getMonthlyExpensesBreakdown } from "../../composables/transcations.ts";
const days = ref(10);
const chartData = computed(() => getMonthlyExpensesBreakdown());
const chartOptions = {
  //  plugins: {
  //    legend: {
  //      display: true, // This hides all text in the legend and also the labels.
  //    },
  //  },
  //  scales: {
  //    x: {
  //      title: {
  //        display: true,
  //        text: "Date",
  //      },
  //    },
  //    y: {
  //      max: 6000,
  //      suggestedMax: 3000,
  //      title: {
  //        display: true,
  //        text: "Amount",
  //      },
  //    },
  //  },
};
</script>

<template>
  <div>
    <h2 class="card-title inline-block">Monthly Breakdown</h2>

    <DoughnutChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>
