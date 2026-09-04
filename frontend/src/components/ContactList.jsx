import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users, Loader2 } from "lucide-react";

const ContactList = () => {
  const { allContacts, getAllContacts, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
        <Loader2 className="size-6 animate-spin text-cyan-500" />
        <p className="text-xs">Loading contacts...</p>
      </div>
    );
  }

  if (allContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-slate-400">
        <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-2">
          <Users className="size-5" />
        </div>
        <p className="text-sm font-medium text-slate-300">No contacts found</p>
        <p className="text-xs text-slate-500 mt-1">Other registered users will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {allContacts.map((contact) => {
        const isSelected = selectedUser?._id === contact._id;
        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-pointer text-left ${
              isSelected
                ? "bg-cyan-500/15 border border-cyan-500/30 text-slate-100 shadow-sm"
                : "hover:bg-slate-700/40 text-slate-300 border border-transparent"
            }`}
          >
            <div className="relative">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="size-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                    contact.fullName;
                }}
              />
              <span className="absolute bottom-0 right-0 size-2 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{contact.fullName}</h4>
              <p className="text-xs text-slate-500 truncate">{contact.email}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ContactList;
