import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import { useAuthStore } from "./store/userAuthstore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="min-h-screen bg-[#edf2f8] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-600/20 border-t-cyan-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf2f9] via-[#f1f5fa] to-[#e8eef8] relative flex items-center justify-center p-0 sm:p-3 md:p-6 overflow-hidden text-slate-800">
      {/* DECORATORS - SUBTLE GRID BG & AMBIENT GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e135_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e135_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />
      <div className="absolute top-0 -left-16 size-[28rem] bg-indigo-300/35 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -right-16 size-[28rem] bg-cyan-300/40 rounded-full blur-[130px] pointer-events-none" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;

