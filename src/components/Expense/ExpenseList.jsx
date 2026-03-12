import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Added margin bottom */}
        <h5 className="text-lg font-semibold">
          Sum hman tawhna te (money spend on)
        </h5>
        <button
          className="card-btn flex items-center gap-2"
          onClick={onDownload}
        >
          <LuDownload className="text-base" />
          <span>Download</span>
        </button>
      </div>

      {/* Added gap-4 to prevent cards from touching (Inter-symbol Interference) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id || Math.random()}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm py-4">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
