import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import { Loader2 } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages, socket]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafbfc]">
      <ChatHeader />

      <div className="flex-1 px-3 py-4 sm:px-6 sm:py-6 overflow-y-auto">
        {isMessagesLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
            <Loader2 className="size-6 animate-spin text-cyan-600" />
            <p className="text-xs">Loading messages...</p>
          </div>
        ) : (Array.isArray(messages) && messages.length > 0) ? (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => {
              const isSender = message.senderId === authUser?._id;
              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-1.5 sm:gap-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSender && (
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt={selectedUser.fullName}
                      className="size-7 sm:size-8 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatar.png";
                      }}
                    />
                  )}
                  <div
                    className={`max-w-[84%] sm:max-w-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-sm ${
                      isSender
                        ? "bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-600 text-white font-medium rounded-br-xs shadow-sm shadow-blue-600/15"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="rounded-lg mb-2 max-h-48 w-full object-cover"
                        onLoad={() =>
                          messageEndRef.current?.scrollIntoView({
                            behavior: "smooth",
                          })
                        }
                      />
                    )}
                    {message.text && <p className="break-words leading-relaxed">{message.text}</p>}
                    <span
                      className={`text-[10px] block mt-1 ${
                        isSender ? "text-cyan-100 text-right" : "text-slate-400"
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
                      className="size-7 sm:size-8 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100 shrink-0"
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
