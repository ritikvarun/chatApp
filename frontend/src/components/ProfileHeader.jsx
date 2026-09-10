import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Volume2, VolumeX, LogOut, Camera, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ProfileModal from "./ProfileModal";

const ProfileHeader = () => {
  const { authUser, logout, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <>
      <div className="sticky top-0 z-40 px-4 py-3.5 border-b border-slate-200/80 flex items-center justify-between bg-white/95 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          {/* AVATAR WITH QUICK UPLOAD */}
          <div className="relative group flex-shrink-0">
            <img
              src={authUser?.profilePic || "/avatar.png"}
              alt={authUser?.fullName || "User"}
              className={`size-10 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100 transition-all ${isUpdatingProfile ? "opacity-50" : "group-hover:border-cyan-500"
                }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/avatar.png";
              }}
            />

            {/* QUICK CAMERA ICON / LOADING OVERLAY */}
            <label
              htmlFor="quick-avatar-upload"
              className={`absolute inset-0 rounded-full bg-slate-900/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white ${isUpdatingProfile ? "opacity-100 pointer-events-none" : ""
                }`}
              title="Change profile photo"
            >
              {isUpdatingProfile ? (
                <Loader2 className="size-4 animate-spin text-white" />
              ) : (
                <Camera className="size-4" />
              )}
              <input
                type="file"
                id="quick-avatar-upload"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>

            <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white pointer-events-none" />
          </div>

          {/* USER INFO - CLICKABLE TO OPEN MODAL */}
          <div
            onClick={() => setIsProfileModalOpen(true)}
            className="overflow-hidden cursor-pointer hover:opacity-85 transition-opacity"
            title="View profile details"
          >
            <h3 className="font-semibold text-slate-800 text-sm truncate hover:text-cyan-600 transition-colors">
              {authUser?.fullName}
            </h3>
            <p className="text-xs text-slate-500 truncate">{authUser?.email}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            title="Profile details"
          >
            <User className="size-4" />
          </button>
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg transition-all cursor-pointer ${isSoundEnabled
                ? "text-cyan-600 bg-white shadow-xs"
                : "text-slate-400 hover:text-slate-600 hover:bg-white/70"
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
            className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>

      {/* PROFILE MODAL */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default ProfileHeader;
