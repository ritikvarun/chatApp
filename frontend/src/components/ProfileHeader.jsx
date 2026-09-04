import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Volume2, VolumeX, LogOut } from "lucide-react";

const ProfileHeader = () => {
  const { authUser, logout } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  return (
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt={authUser?.fullName || "User"}
            className="size-10 rounded-full object-cover border border-slate-700 bg-slate-800"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                (authUser?.fullName || "User");
            }}
          />
          <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-semibold text-slate-100 text-sm truncate">
            {authUser?.fullName}
          </h3>
          <p className="text-xs text-slate-400 truncate">{authUser?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            isSoundEnabled
              ? "text-cyan-400 hover:bg-cyan-500/10"
              : "text-slate-500 hover:bg-slate-700/50"
          }`}
          title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {isSoundEnabled ? (
            <Volume2 className="size-4" />
          ) : (
            <VolumeX className="size-4" />
          )}
        </button>
        <button
          onClick={logout}
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
