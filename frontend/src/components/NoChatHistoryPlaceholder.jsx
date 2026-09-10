import { MessageSquareDashed } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
      <div className="size-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-cyan-600 shadow-sm">
        <MessageSquareDashed className="size-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">
        No conversation history
      </h3>
      <p className="text-xs text-slate-500 max-w-xs">
        Say hello to <span className="text-cyan-600 font-semibold">{name}</span> to start your conversation! 👋
      </p>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
