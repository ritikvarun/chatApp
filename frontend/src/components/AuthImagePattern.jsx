const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-12 bg-slate-800/30 text-center relative overflow-hidden h-full w-full">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-cyan-500/20 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
