import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Loader2 } from "lucide-react";

const ChatsList = () => {
  const { chats, getMyChatPartners, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
        <Loader2 className="size-6 animate-spin text-cyan-500" />
        <p className="text-xs">Loading chats...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-slate-400">
        <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-2">
          <MessageSquare className="size-5" />
        </div>
        <p className="text-sm font-medium text-slate-300">No chats yet</p>
        <p className="text-xs text-slate-500 mt-1">
          Switch to Contacts to start a conversation
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {chats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer text-left ${
              isSelected
                ? "bg-cyan-500/15 border border-cyan-500/30 text-slate-100 shadow-sm"
                : "hover:bg-slate-700/40 text-slate-300 border border-transparent"
            }`}
          >
            <div className="relative">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="size-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                    chat.fullName;
                }}
              />
              <span className="absolute bottom-0 right-0 size-2 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{chat.fullName}</h4>
              <p className="text-xs text-slate-500 truncate">
                {chat.email}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatsList;
