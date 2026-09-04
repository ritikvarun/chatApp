import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-900/40 text-center">
      <div className="max-w-md flex flex-col items-center gap-4">
        {/* Animated Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center animate-bounce border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              <MessageSquare className="size-8 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-slate-100">Welcome to ChatApp!</h2>
        <p className="text-slate-400 text-sm">
          Select a conversation from the sidebar or click on Contacts to start messaging.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
