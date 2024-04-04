import { supabase } from "../lib/supabaseClient";
async function getMonthlyBalance(): Promise<{
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
}> {
  // Object to store monthly balances
  const monthlyBalances: { [month: string]: number } = {};

  const transactions = await getTransactions();
  // Iterate through transactions
  transactions?.forEach((transaction: any) => {
    const month = new Date(transaction.date).toLocaleString("nb-NO", {
      month: "long",
    });
    const amount = transaction.amount;
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

  const positive = {
    100: "#dcf1f0",
    200: "#a9dcd9",
    300: "#8fd1ce",
    400: "#5ab6b3",
    500: "#3f9b99",
  };

  const negative = {
    100: "#f8ebe8",
    200: "#f4dad4",
    300: "#ebc0b6",
    400: "#db9584",
    500: "#cd7a66",
  };

  function getColor(month: number, colorMap: any) {
    if (month > 7000) return colorMap[500];
    if (month > 5000) return colorMap[400];
    if (month > 4000) return colorMap[300];
    if (month > 2000) return colorMap[200];
    if (month >= 0) return colorMap[100];
  }

  const backgroundColor = data.map((month: any) => {
    return month < 0 ? getColor(-month, negative) : getColor(month, positive);
  });
  // Prepare datasets
  const datasets = [
    {
      label: "Monthly Balance",
      backgroundColor: backgroundColor,
      data,
    },
  ];

  return { labels, datasets };
}

async function getTransactions() {
  let { data: transactions, error } = await supabase
    .from("transactions")
    .select("date,amount");
  return transactions;
}

export { getMonthlyBalance };
