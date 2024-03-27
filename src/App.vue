<script setup>
import Aside from "./components/Aside.vue";
import MonthlyBalance from "./components/cards/MonthlyBalance.vue";
import Last30Days from "./components/cards/Last30Days.vue";
import LastMonthExpenseBreakdown from "./components/cards/LastMonthExpenseBreakdown.vue";
import LastMonthIncomeExpense from "./components/cards/LastMonthIncomeExpense.vue";
</script>

<template>
  <div class="window flex h-screen bg-slate-50">
    <Aside />
    <main class="p-8 grid grid-cols-5 gap-8">
      <MonthlyBalance class="card col-span-2" />
      <Last30Days class="card col-span-3" />
      <LastMonthExpenseBreakdown class="card col-span-3" />
      <LastMonthIncomeExpense class="card col-span-2" />
    </main>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  display: grid;
  grid-template-columns: 300px 3fr;
}
</style>
