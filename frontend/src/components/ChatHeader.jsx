import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="size-10 rounded-full object-cover border border-slate-700 bg-slate-800"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/avatar.png";
            }}
          />
          <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-emerald-400">Online</p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors cursor-pointer"
        title="Close chat"
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
