//fetch transactions from the API/transaionts.json file
import transactions from "../api/transactions.json";

// Function to get monthly balance
function getMonthlyBalance(): {
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
} {
  // Object to store monthly balances
  const monthlyBalances: { [month: string]: number } = {};

  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    const month = new Date(
      transaction.Dato.split(".").reverse().join("-")
    ).toLocaleString("nb-NO", {
      month: "long",
    });
    const amount = parseFloat(transaction.Beløp.replace(",", "."));

    // Add amount to the corresponding month
    if (monthlyBalances[month]) {
      monthlyBalances[month] += amount;
    } else {
      monthlyBalances[month] = amount;
    }
  });

  // Extract months and balances
  const labels = Object.keys(monthlyBalances);
  const data = Object.values(monthlyBalances);

  // Prepare datasets
  const datasets = [
    {
      label: "Monthly Balance",
      backgroundColor: [
        "#edb4de",
        "#e185c7",
        "#d460af",
        "#c04292",
        "#a53177",
        "#892b63",
        "#7c2b5b",
        "#451230",
        "#fbf4f9",
        "#f9eaf6",
        "#f4d6ed",
      ],
      data,
    },
  ];

  return { labels, datasets };
}

// Function to get last 30 days activity
function getLastDaysActivity(daysBackward: number = 30): {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
} {
  // Get the current date
  const currentDate = new Date();
  // Calculate the date daysBackward days ago
  const thirtyDaysAgo = new Date(
    currentDate.getTime() - daysBackward * 24 * 60 * 60 * 1000
  );

  // Object to store daily expenses
  const dailyExpenses: { [date: string]: number } = {};

  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    const transactionDate = new Date(
      transaction.Dato.split(".").reverse().join("-")
    ); // Convert date string to Date object
    const amount = parseFloat(transaction.Beløp.replace(",", ".")); // Parse amount

    // Check if the transaction date is within the last daysBackward days and if it's an expense
    if (transactionDate >= thirtyDaysAgo && amount < 0) {
      const dateKey = `${transactionDate
        .getDate()
        .toString()
        .padStart(2, "0")}.${(transactionDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      // Add inverted amount (positive value) to the corresponding date
      if (dailyExpenses[dateKey]) {
        dailyExpenses[dateKey] += Math.abs(amount);
      } else {
        dailyExpenses[dateKey] = Math.abs(amount);
      }
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
      label: "Spent",
      data,
      fill: {
        target: "origin",
        above: "#c2d8df", // Area will be red above the origin
        below: "#c2d8df", // And blue below the origin
      },
      borderColor: "#6598ab",
      tension: 0.2,
    },
  ];

  return { labels, datasets };
}

// Function to get monthly income/expense
function getMonthlyIncomeExpense(): {
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
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

  // Initialize variables to store total income and total expenses
  let totalIncome = 0;
  let totalExpense = 0;

  // Iterate through transactions
  transactions.forEach((transaction: any) => {
    const transactionDate = new Date(
      transaction.Dato.split(".").reverse().join("-")
    ); // Convert date string to Date object
    const amount = parseFloat(transaction.Beløp.replace(",", ".")); // Parse amount

    // Check if the transaction date is within the last full month
    if (
      transactionDate >= firstDayOfLastFullMonth &&
      transactionDate <= lastDayOfLastFullMonth
    ) {
      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpense -= amount; // Convert negative expense to positive
      }
    }
  });

  // Prepare labels and datasets arrays
  const labels = ["Income", "Expenses"];
  const datasets = [
    {
      label: "Data One",
      backgroundColor: ["#c2d8df", "#6598ab"],
      data: [totalIncome, totalExpense],
    },
  ];

  return { labels, datasets };
}

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

// Export functions to be used by the frontend
export {
  getMonthlyBalance,
  getLastDaysActivity,
  getMonthlyIncomeExpense,
  getMonthlyExpensesBreakdown,
};
