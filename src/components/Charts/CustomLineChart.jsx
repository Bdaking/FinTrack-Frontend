import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-xl rounded-xl p-3 border border-purple-100">
          <p className="text-xs font-bold text-purple-600 uppercase mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-bold text-gray-900 ml-1">
              ₹{payload[0].value.toLocaleString("en-IN")}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#875cf5",
              strokeWidth: 2,
              strokeDasharray: "5 5",
            }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#incomeGradient)"
            strokeWidth={4}
            activeDot={{
              r: 8,
              fill: "#875cf5",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            dot={{ r: 4, fill: "#875cf5", strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
