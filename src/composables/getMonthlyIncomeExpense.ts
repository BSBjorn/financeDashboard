function getMonthlyIncomeExpense(transactions): {
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
} {
  // Initialize variables to store total income and total expenses
  let totalIncome = 0;
  let totalExpense = 0;

  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    if (transaction.amount > 0) {
      totalIncome += transaction.amount;
    } else {
      totalExpense -= transaction.amount; // Convert negative expense to positive
    }
  });

  // Prepare labels and datasets arrays
  const labels = ["Income", "Expenses"];
  const datasets = [
    {
      label: "Transaksjoner",
      backgroundColor: ["#a17aff", "#5ca1b4"],
      data: [totalIncome, totalExpense],
    },
  ];

  return { labels, datasets };
}

export { getMonthlyIncomeExpense };
