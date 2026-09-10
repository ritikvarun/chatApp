import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/userAuthstore";
import { X, ArrowLeft } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-3 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200/90 flex items-center justify-between bg-white/95 backdrop-blur-md z-10 shrink-0">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* MOBILE BACK BUTTON */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Back to chats"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="relative shrink-0">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="size-9 sm:size-10 rounded-full object-cover border border-slate-200 bg-slate-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/avatar.png";
            }}
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm truncate">
            {selectedUser.fullName}
          </h3>
          <p className={`text-xs ${isOnline ? "text-emerald-600 font-medium" : "text-slate-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        title="Close chat"
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
