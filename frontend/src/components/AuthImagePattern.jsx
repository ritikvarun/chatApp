const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-slate-50/90 via-sky-50/40 to-blue-50/50 border-l border-slate-200/80 text-center relative overflow-hidden h-full w-full">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-56 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md w-full flex flex-col items-center relative z-10">
        {/* HERO IMAGE CONTAINER */}
        <div className="relative w-full max-w-[320px] lg:max-w-[360px] aspect-square mb-6 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-600/15 border-2 border-white/90 bg-white/80 backdrop-blur-md p-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/25">
          <img
            src="/auth-hero.png"
            alt="Chat App Illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
