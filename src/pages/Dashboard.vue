<script setup>
import MonthlyBalance from "../components/cards/MonthlyBalance.vue";
import LastXDays from "../components/cards/LastXDays.vue";
import LastMonthExpenseBreakdown from "../components/cards/LastMonthExpenseBreakdown.vue";
import LastMonthIncomeExpense from "../components/cards/LastMonthIncomeExpense.vue";
import LatestTransactions from "../components/cards/LatestTransactions.vue";
</script>

<template>
  <div class="p-8 grid grid-cols-5 gap-8">
    <LatestTransactions class="card col-span-3" />
    <MonthlyBalance class="card col-span-2" />
    <LastMonthIncomeExpense class="card col-span-2" />
    <LastXDays class="card col-span-3" />
    <LastMonthExpenseBreakdown class="card col-span-3" />
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  display: grid;
  grid-template-columns: 300px 3fr;
}
</style>
