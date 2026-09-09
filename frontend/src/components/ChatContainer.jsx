import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import { Loader2 } from "lucide-react";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {isMessagesLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
            <Loader2 className="size-6 animate-spin text-cyan-500" />
            <p className="text-xs">Loading messages...</p>
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => {
              const isSender = message.senderId === authUser?._id;
              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSender && (
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt={selectedUser.fullName}
                      className="size-8 rounded-full object-cover border border-slate-700 bg-slate-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatar.png";
                      }}
                    />
                  )}
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                      isSender
                        ? "bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-md shadow-cyan-500/10"
                        : "bg-slate-800 text-slate-100 border border-slate-700/60 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="rounded-lg mb-2 max-h-48 w-full object-cover"
                      />
                    )}
                    {message.text && <p className="break-words">{message.text}</p>}
                    <span
                      className={`text-[10px] block mt-1 ${
                        isSender ? "text-cyan-950/70 text-right" : "text-slate-400"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {isSender && (
                    <img
                      src={authUser?.profilePic || "/avatar.png"}
                      alt={authUser?.fullName}
                      className="size-8 rounded-full object-cover border border-slate-700 bg-slate-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatar.png";
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
