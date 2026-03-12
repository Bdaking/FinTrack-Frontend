import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    // Changed to flex-col for mobile and md:flex-row for desktop
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side: Form content */}
      <div className="w-full md:w-[60vw] px-8 md:px-12 pt-8 pb-12 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-black mb-8">Spendora</h2>
        {children}
      </div>

      {/* Right side: Responsive decorative background */}
      {/* REMOVED: 'hidden md:block' to keep it visible on mobile */}
      <div className="w-full md:w-[40vw] h-100 md:h-screen bg-violet-50 relative overflow-hidden p-8">
        {/* Floating Stat Card - Added responsive positioning */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 scale-90 md:scale-100 origin-top-left">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income & expenses"
            value="4,30,000"
            color="bg-violet-600"
          />
        </div>

        {/* Decorative Shapes */}
        <div className="w-64 h-64 rounded-[40px] bg-violet-500 absolute -top-10 -right-10 opacity-20"></div>

        {/* Main Card Image - Adjusted for mobile visibility */}
        <div className="absolute bottom-10 md:bottom-20 right-6 md:right-10 w-[80%] md:w-[85%] z-10">
          <img
            src={CARD_2}
            alt="Transaction Chart"
            className="w-full h-auto shadow-2xl rounded-2xl"
          />
        </div>

        {/* Bottom decorative purple shape */}
        <div className="w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-10 -left-10 opacity-10"></div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 min-w-70">
      <div
        className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-full`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
          {label}
        </h6>
        <span className="text-2xl font-bold text-slate-800">₹{value}</span>
      </div>
    </div>
  );
};
