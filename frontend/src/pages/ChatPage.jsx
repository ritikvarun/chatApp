import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[100dvh] sm:h-[calc(100dvh-1.5rem)] md:h-[820px]">
      <BorderAnimatedContainer>
        <div className="flex h-full w-full">
          {/* LEFT SIDE - Sidebar (full width on mobile when no chat is selected) */}
          <div
            className={`w-full md:w-80 lg:w-88 bg-[#f6f9fc] flex flex-col border-r border-slate-200/90 shrink-0 ${
              selectedUser ? "hidden md:flex" : "flex"
            }`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE - Chat or Placeholder (full width on mobile when chat is selected) */}
          <div
            className={`flex-1 flex flex-col bg-white overflow-hidden ${
              !selectedUser ? "hidden md:flex" : "flex"
            }`}
          >
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
