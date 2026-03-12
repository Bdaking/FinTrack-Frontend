import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // Identify the correct key for the X-Axis (month for income, category for expenses)
  const xKey = data && data[0]?.month ? "month" : "category";

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#b692f6";
  };

  const BarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {/* Display whichever key is present */}
            {payload[0].payload.month || payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-medium text-gray-900 ml-1">
              ₹{payload[0].payload.amount}
            </span>
          </p>
          {/* Optional: Show source for income data */}
          {payload[0].payload.source && (
            <p className="text-[10px] text-gray-400 mt-1">
              Source: {payload[0].payload.source}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />

          <XAxis
            dataKey={xKey} // Use the dynamic key detected above
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            tickLine={false}
          />

          <Tooltip content={<BarTooltip />} cursor={{ fill: "#f5f5f5" }} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
