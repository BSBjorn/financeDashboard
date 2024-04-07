// Function to get monthly expenses breakdown by category
function getMonthlyExpensesBreakdown(): {
  labels: string[];
  datasets: { backgroundColor: string[]; data: number[] }[];
} {
  // Get the current date
  const currentDate = new Date();

  // Calculate the first day of the current month
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Calculate the first day of the last full month
  const firstDayOfLastFullMonth = new Date(firstDayOfCurrentMonth);
  firstDayOfLastFullMonth.setMonth(firstDayOfLastFullMonth.getMonth() - 1);

  // Calculate the last day of the last full month
  const lastDayOfLastFullMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfLastFullMonth.setDate(0);

  // Object to store monthly expenses breakdown by category
  const monthlyExpensesBreakdown: { [category: string]: number } = {};

  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    const transactionDate = new Date(
      transaction.Dato.split(".").reverse().join("-")
    ); // Convert date string to Date object
    const category = transaction.Kategori; // Main category of the transaction
    const amount = parseFloat(transaction.Beløp.replace(",", ".")); // Parse amount

    // Check if the transaction date is within the last full month
    if (
      transactionDate >= firstDayOfLastFullMonth &&
      transactionDate <= lastDayOfLastFullMonth &&
      amount < 0
    ) {
      // Add amount to the corresponding category
      if (monthlyExpensesBreakdown[category]) {
        monthlyExpensesBreakdown[category] += Math.abs(amount);
      } else {
        monthlyExpensesBreakdown[category] = Math.abs(amount);
      }
    }
  });

  // Extract categories and amounts
  const categories = Object.keys(monthlyExpensesBreakdown);
  const amounts = Object.values(monthlyExpensesBreakdown);

  // Prepare labels and datasets arrays
  const labels = categories;
  const datasets = [
    {
      backgroundColor: [
        "#deebef",
        "#c2d8df",
        "#97bcc9",
        "#6598ab",
        "#4c8095",
        "#40677a",
        "#395665",
        "#354955",
        "#2f3f4a",
        "#1c2730",
      ], // Example colors
      data: amounts,
    },
  ];

  return { labels, datasets };
}
