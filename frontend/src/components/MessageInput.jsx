import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { playRandomKeyStrokeSound } from "../hooks/useKeyboardSound";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Reset form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 sm:p-3.5 w-full border-t border-slate-200/90 bg-white backdrop-blur-md shrink-0 z-30">
      {imagePreview && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Attachment Preview"
              className="size-16 sm:size-20 object-cover rounded-xl border border-slate-200 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-white border border-slate-300 text-slate-600 hover:text-slate-900 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 sm:gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer shrink-0 ${
            imagePreview
              ? "text-cyan-600 border-cyan-400 bg-cyan-50"
              : "border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-400 hover:bg-slate-100 bg-slate-50"
          }`}
          title="Attach image"
        >
          <Image className="size-5" />
        </button>

        <input
          type="text"
          placeholder="Message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled && e.target.value.length > text.length) {
              playRandomKeyStrokeSound();
            }
          }}
          className="flex-1 bg-slate-100/90 border border-slate-200/90 rounded-full px-4 py-2 sm:py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-xs"
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 sm:p-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:hover:from-cyan-600 disabled:hover:to-blue-600 disabled:cursor-not-allowed rounded-full font-medium transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer shrink-0"
          title="Send message"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
