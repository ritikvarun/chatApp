import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, isTyping: false });
    if (selectedUser) {
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("markMessagesAsSeen", { senderId: selectedUser._id });
      }
    }
  },

  sendTyping: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    if (selectedUser && socket) {
      socket.emit("typing", { receiverId: selectedUser._id });
    }
  },

  sendStopTyping: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    if (selectedUser && socket) {
      socket.emit("stopTyping", { receiverId: selectedUser._id });
    }
  },

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      set({ allContacts: [] });
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      set({ chats: [] });
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      set({ messages: [] });
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      });
    } catch (error) {
      set({
        messages: get().messages.filter((msg) => msg._id !== tempId),
      });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStoppedTyping");

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      // Mark message as seen immediately since recipient has this chat open
      socket.emit("markMessagesAsSeen", { senderId: selectedUser._id });

      const currentMessages = get().messages;
      if (currentMessages.some((msg) => msg._id === newMessage._id)) return;

      set({
        messages: [...currentMessages, { ...newMessage, seen: true }],
      });

      if (get().isSoundEnabled) {
        const sound = new Audio("/sounds/keystroke1.mp3");
        sound.play().catch(() => {});
      }
    });

    socket.on("messagesSeen", ({ byUserId }) => {
      if (byUserId === selectedUser._id) {
        set({
          messages: get().messages.map((msg) =>
            msg.receiverId === byUserId ? { ...msg, seen: true } : msg
          ),
        });
      }
    });

    socket.on("userTyping", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        set({ isTyping: true });
      }
    });

    socket.on("userStoppedTyping", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        set({ isTyping: false });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStoppedTyping");
    set({ isTyping: false });
  },
}));

export default useChatStore;
