import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Users } from "lucide-react";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="p-3 border-b border-slate-700/50">
      <div className="grid grid-cols-2 gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700/60">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "chats"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare className="size-3.5" />
          <span>Chats</span>
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "contacts"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="size-3.5" />
          <span>Contacts</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
