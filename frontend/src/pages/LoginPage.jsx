import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import AuthImagePattern from "../components/AuthImagePattern";
import {
  MessageCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl md:h-[750px] min-h-[600px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center md:border-r border-slate-700/50 overflow-y-auto">
              <div className="w-full max-w-md mx-auto">
                {/* LOGO & HEADING */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3 shadow-lg shadow-cyan-500/10">
                    <MessageCircle className="size-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Sign in to your account to continue
                  </p>
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="size-4" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="size-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold rounded-lg text-sm transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] mt-2"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* SIGNUP REDIRECT */}
                <div className="text-center mt-6">
                  <p className="text-slate-400 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* PATTERN / ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2">
              <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue your conversations and catch up with your messages."
              />
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
