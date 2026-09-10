import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/userAuthstore";
import { MessageSquare, Loader2 } from "lucide-react";

const ChatsList = () => {
  const { chats, getMyChatPartners, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
        <Loader2 className="size-6 animate-spin text-cyan-600" />
        <p className="text-xs">Loading chats...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-slate-500">
        <div className="size-10 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-500 mb-2">
          <MessageSquare className="size-5" />
        </div>
        <p className="text-sm font-medium text-slate-700">No chats yet</p>
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
        const isOnline = onlineUsers.includes(chat._id);
        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer text-left relative overflow-hidden ${
              isSelected
                ? "bg-gradient-to-r from-cyan-50 via-sky-50/80 to-blue-50/50 border border-cyan-300/80 text-slate-900 shadow-xs"
                : "hover:bg-slate-200/50 text-slate-700 border border-transparent"
            }`}
          >
            {isSelected && (
              <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-r-full" />
            )}

            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
              <div className="size-11 sm:size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="size-full rounded-full object-cover border-2 border-white shadow-xs bg-slate-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/avatar.png";
                  }}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold truncate ${isSelected ? "text-cyan-950" : "text-slate-800"}`}>
                {chat.fullName}
              </h4>
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
