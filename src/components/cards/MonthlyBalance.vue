<script setup>
import { ref, onMounted } from "vue";
import BarChart from "../charts/BarChart.vue";
import { getMonthlyBalance } from "../../composables/monthlyBalance.ts";

const chartData = ref(null);
async function fetchData() {
  let data = await getMonthlyBalance();
  chartData.value = data;
  // Use chartData here
}
onMounted(() => {
  fetchData();
});
const chartOptions = {
  plugins: {
    legend: {
      display: false, // This hides all text in the legend and also the labels.
    },
  },
  scales: {
    //x: {
    //  title: {
    //    display: true,
    //    text: "Month",
    //  },
    //},
    //y: {
    //  title: {
    //    display: false,
    //    text: "Amount",
    //  },
    //},
  },
};
</script>

<template>
  <div>
    <h2 class="card-title">Monthly Balance</h2>
    <BarChart
      v-if="chartData"
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
  </div>
</template>
