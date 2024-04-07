<script setup>
import { ref, computed, onMounted } from "vue";
import BarChart from "../charts/BarChart.vue";
import { getMonthlyIncomeExpense } from "../../composables/getMonthlyIncomeExpense.ts";
import { supabase } from "../../lib/supabaseClient.ts";

const transcations = ref([]);
const loading = ref(false);
const chartData = computed(() => getMonthlyIncomeExpense(transcations.value));

const currentDate = new Date();
const monthsAgo = ref(1);

const firstDayOfCurrentMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

// Calculate the first day of the last full month
const selectedMonthsAgo = computed(() => {
  let selectedMonthsAgo = new Date(firstDayOfCurrentMonth);
  let firstDayOfSelectedMonthsAgo = new Date(
    selectedMonthsAgo.setMonth(selectedMonthsAgo.getMonth() - monthsAgo.value)
  );
  let lastDayOfSelectedMonthsAgo = new Date(
    firstDayOfSelectedMonthsAgo.getFullYear(),
    firstDayOfSelectedMonthsAgo.getMonth() + 1,
    1
  );
  return { firstDayOfSelectedMonthsAgo, lastDayOfSelectedMonthsAgo };
});

function previousMonth() {
  monthsAgo.value++;
  getTransactions();
}
function nextMonth() {
  monthsAgo.value--;
  getTransactions();
}

async function getTransactions() {
  loading.value = true;
  let { data, error } = await supabase
    .from("transactions")
    .select("date,amount,description,category,subcategory,id")
    .neq("subcategory", "Budsjettoverførsel")
    .order("date", { ascending: true })
    .gt(
      "date",
      selectedMonthsAgo.value.firstDayOfSelectedMonthsAgo.toISOString()
    )
    .lte(
      "date",
      selectedMonthsAgo.value.lastDayOfSelectedMonthsAgo.toISOString()
    );

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
    //x: {
    //  title: {
    //    display: true,
    //    text: "Month",
    //  },
    //},
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
    <h2 class="card-title">
      Monthly Balance

      <span class="capitalize">
        {{
          new Date(
            selectedMonthsAgo.firstDayOfSelectedMonthsAgo
          ).toLocaleDateString("nb-NO", {
            month: "long",
            year: "numeric",
          })
        }}
      </span>
    </h2>
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
    <div class="flex gap-8 justify-center mt-8">
      <button class="btn" @click="previousMonth">Forrige</button>
      <button class="btn" @click="nextMonth">Neste</button>
    </div>
  </div>
</template>
