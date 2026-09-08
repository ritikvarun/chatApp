import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, X, Loader2, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const ProfileModal = ({ isOpen, onClose }) => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
      setSelectedImg(base64Image);
      const res = await updateProfile({ profilePic: base64Image });
      if (!res?.success) {
        setSelectedImg(null);
      }
    };
  };

  const formattedDate = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-slate-800/40">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <User className="size-5 text-cyan-400" />
              Profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Your profile information</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* AVATAR UPLOAD SECTION */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName || "Profile"}
                className={`size-28 rounded-full object-cover border-4 border-slate-700 bg-slate-800 shadow-xl transition-all ${
                  isUpdatingProfile ? "opacity-60" : "group-hover:border-cyan-500/60"
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar.png";
                }}
              />

              {/* UPLOAD BUTTON OVERLAY */}
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full cursor-pointer shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
                title="Change profile photo"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Camera className="size-4" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              {isUpdatingProfile ? (
                <span className="text-cyan-400 font-medium flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin" /> Uploading image...
                </span>
              ) : (
                "Click the camera icon to change photo"
              )}
            </p>
          </div>

          {/* USER INFO FIELDS */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                <User className="size-3.5 text-slate-400" />
                Full Name
              </label>
              <div className="px-3.5 py-2.5 bg-slate-800/70 border border-slate-700/60 rounded-xl text-sm font-medium text-slate-200">
                {authUser?.fullName || "N/A"}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Mail className="size-3.5 text-slate-400" />
                Email Address
              </label>
              <div className="px-3.5 py-2.5 bg-slate-800/70 border border-slate-700/60 rounded-xl text-sm font-medium text-slate-200">
                {authUser?.email || "N/A"}
              </div>
            </div>
          </div>

          {/* ACCOUNT INFO CARD */}
          <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Account Details
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/40 pb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-slate-500" />
                Member Since
              </span>
              <span className="text-slate-200 font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-slate-500" />
                Account Status
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="size-3" /> Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
