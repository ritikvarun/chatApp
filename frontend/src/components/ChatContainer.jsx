import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* CHAT HEADER */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover border border-slate-700 bg-slate-800"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                  selectedUser.fullName;
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
        >
          <X className="size-5" />
        </button>
      </div>

      {/* MESSAGES BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center my-6">
          <span className="text-xs text-slate-500 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/40">
            This is the start of your conversation with {selectedUser.fullName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
