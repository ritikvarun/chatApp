import React from "react";

const BorderAnimatedContainer = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full h-full flex-1 p-0 sm:p-[1px] sm:rounded-2xl overflow-hidden flex flex-col ${className}`}>
      {/* Animated gradient border glow on larger screens */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 sm:rounded-2xl animate-pulse opacity-50" />
      {/* Inner card container */}
      <div className="relative w-full h-full flex-1 bg-white sm:bg-white/95 backdrop-blur-xl sm:rounded-2xl border-0 sm:border border-slate-200/90 shadow-none sm:shadow-2xl sm:shadow-slate-400/25 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimatedContainer;
