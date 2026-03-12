import React from "react";

const CharAvatar = ({ width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${style || ""} 
        relative flex items-center justify-center rounded-full 
        bg-linear-to-br from-primary via-violet-500 to-indigo-600
        shadow-[0_10px_40px_-10px_rgba(135,92,245,0.5)] 
        border-[3px] border-white
        ring-1 ring-purple-100/50
        transition-all duration-500 ease-out hover:brightness-110 hover:shadow-purple-400/40`}
    >
      {/* 1. Top-left high-intensity light reflection (Specular Highlight) */}
      <div className="absolute top-1 left-1 w-1/2 h-1/2 bg-linear-to-br from-white/40 to-transparent rounded-full blur-[1px] pointer-events-none" />

      {/* 2. Soft center glow to add "Volume" */}
      <div className="absolute inset-2 rounded-full bg-radial from-white/10 to-transparent pointer-events-none" />

      {/* 3. Bottom crescent shadow for 3D depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/10 rounded-b-full blur-xs" />
    </div>
  );
};

export default CharAvatar;
