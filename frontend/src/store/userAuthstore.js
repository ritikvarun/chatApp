import { create } from "zustand";
import { axiosInstance, getBackendURL } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = getBackendURL() || "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data && typeof res.data === "object" && res.data._id) {
        set({ authUser: res.data });
        get().connectSocket();
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
      return { success: true, user: res.data };
    } catch (error) {
      console.log("Error in signup:", error);
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true, user: res.data };
    } catch (error) {
      console.log("Error in login:", error);
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      return { success: true };
    } catch (error) {
      console.log("Error in logout:", error);
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
      return { success: false, message };
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      return { success: true, user: res.data };
    } catch (error) {
      console.log("Error in updateProfile:", error);
      const message = error.response?.data?.message || "Update profile failed";
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });

    socket.connect();

    set({ socket });

    socket.on("getUsers", (userIds) => {
      set({ onlineUsers: Array.isArray(userIds) ? userIds : [] });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

// Also export default and aliases for convenience
export const userAuthstore = useAuthStore;
export default useAuthStore;
