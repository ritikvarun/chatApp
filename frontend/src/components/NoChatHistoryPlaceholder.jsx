import { MessageSquareDashed } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
      <div className="size-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
        <MessageSquareDashed className="size-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">
        No conversation history
      </h3>
      <p className="text-xs text-slate-400 max-w-xs">
        Say hello to <span className="text-cyan-400 font-medium">{name}</span> to start your conversation! 👋
      </p>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
