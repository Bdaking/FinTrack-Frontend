import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split("");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return sortedData.map((item) => ({
    // CHANGE: Combine Date and Source so each bar has a unique label
    month: `${moment(item?.date).format("DD MMM")} - ${item?.source || ""}`,
    amount: Number(item?.amount) || 0,
    source: item?.source,
  }));
};
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const chartData = sortedData.map((item, index) => ({
    // FIX: Combine Date and Category so each point moves the line forward
    month: `${moment(item?.date).format("DD MMM")} - ${item?.category || index}`,
    amount: Number(item?.amount),
    category: item?.category,
  }));

  return chartData;
};
