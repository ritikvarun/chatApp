import React from "react";

const BorderAnimatedContainer = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full h-full p-[1px] rounded-2xl overflow-hidden ${className}`}>
      {/* Animated gradient border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 rounded-2xl animate-pulse opacity-75" />
      {/* Inner card container */}
      <div className="relative w-full h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimatedContainer;
