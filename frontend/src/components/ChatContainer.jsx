import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import { Loader2, Check, CheckCheck } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    isTyping,
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
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
    window.visualViewport?.addEventListener("resize", scrollToBottom);
    return () => {
      window.visualViewport?.removeEventListener("resize", scrollToBottom);
    };
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafbfc]">
      <ChatHeader />

      <div className="flex-1 px-3 py-4 sm:px-6 sm:py-6 overflow-y-auto overscroll-contain">
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
                    <div
                      className={`text-[10px] flex items-center gap-1 mt-1 ${
                        isSender ? "justify-end text-cyan-100" : "justify-start text-slate-400"
                      }`}
                    >
                      <span>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isSender && (
                        message.seen ? (
                          <CheckCheck className="size-3.5 text-cyan-200" title="Seen" />
                        ) : (
                          <Check className="size-3 text-cyan-200/70" title="Sent" />
                        )
                      )}
                    </div>
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

            {/* REAL-TIME TYPING BUBBLE */}
            {isTyping && (
              <div className="flex items-end gap-1.5 sm:gap-2 justify-start animate-fade-in">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-7 sm:size-8 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100 shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/avatar.png";
                  }}
                />
                <div className="bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="size-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1.5 bg-cyan-600 rounded-full animate-bounce" />
                </div>
              </div>
            )}
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
