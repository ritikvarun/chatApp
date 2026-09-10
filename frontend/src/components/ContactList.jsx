import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/userAuthstore";
import { Users, Loader2 } from "lucide-react";

const ContactList = () => {
  const { allContacts, getAllContacts, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
        <Loader2 className="size-6 animate-spin text-cyan-600" />
        <p className="text-xs">Loading contacts...</p>
      </div>
    );
  }

  if (allContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-slate-500">
        <div className="size-10 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-500 mb-2">
          <Users className="size-5" />
        </div>
        <p className="text-sm font-medium text-slate-700">No contacts found</p>
        <p className="text-xs text-slate-500 mt-1">Other registered users will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {allContacts.map((contact) => {
        const isSelected = selectedUser?._id === contact._id;
        const isOnline = onlineUsers.includes(contact._id);
        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
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
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
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
                {contact.fullName}
              </h4>
              <p className="text-xs text-slate-500 truncate">{contact.email}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ContactList;
