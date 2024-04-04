function getLastDaysActivity(
  transactions: [],
  daysBackward: number
): {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: object;
    borderColor: string;
    tension: number;
  }[];
} {
  // Get the current date
  const currentDate = new Date();
  // Calculate the date daysBackward days ago
  const daysAgo = new Date(
    currentDate.getTime() - daysBackward * 24 * 60 * 60 * 1000
  );

  // Object to store daily expenses
  const dailyExpenses: { [date: string]: number } = {};
  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    const transactionDate = new Date(transaction.date); // Convert date string to Date object
    let amount = transaction.amount;
    amount = -amount; // Invert the amount to make it negative - and - is +...
    const dateKey = `${transactionDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(transactionDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    // Add inverted amount to the corresponding date
    if (dailyExpenses[dateKey]) {
      dailyExpenses[dateKey] += amount;
    } else {
      dailyExpenses[dateKey] = amount;
    }
  });

  // Generate labels (dates) array for the last daysBackward days
  const labels: string[] = [];
  for (let i = 0; i < daysBackward; i++) {
    const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    // Add date in 'DD.MM' format to the beginning of the array
    labels.unshift(formattedDate);

    // Check if the date has expenses, otherwise set it to 0
    if (!dailyExpenses[formattedDate]) {
      dailyExpenses[formattedDate] = 0;
    }
  }

  // Prepare data array with expenses for each day
  const data = labels.map((date) => dailyExpenses[date]);

  // Prepare datasets
  const datasets = [
    {
      label: "Daily summary",
      data,
      fill: {
        target: "origin",
        above: "#ebe6ff", // And blue below the origin
        below: "#bfaaff", // Area will be red above the origin
      },
      borderColor: "#a17aff",
      tension: 0.3,
    },
  ];

  return { labels, datasets };
}

export { getLastDaysActivity };
