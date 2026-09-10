import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Users } from "lucide-react";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="p-3 border-b border-slate-200/80">
      <div className="grid grid-cols-2 gap-1 bg-slate-200/60 p-1 rounded-lg border border-slate-200/80">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "chats"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm shadow-blue-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
          }`}
        >
          <MessageSquare className="size-3.5" />
          <span>Chats</span>
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "contacts"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm shadow-blue-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
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
