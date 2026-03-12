import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {/* LABEL: Changed to white/light-blue for high visibility on your dark modal */}
      <label className="text-[14px] font-semibold text-black block mb-1.5 tracking-wide">
        {label}
      </label>

      {/* INPUT BOX: White background with Orange focus border */}
      <div className="flex items-center bg-white border-2 border-transparent focus-within:border-orange-500 rounded-lg px-3 py-2.5 transition-all shadow-md">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          // Using a deep blue for the text you type
          className="w-full bg-transparent outline-none text-blue-900 font-medium placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-orange-500 cursor-pointer shrink-0 ml-2"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-blue-300 cursor-pointer shrink-0 ml-2 hover:text-orange-400"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
