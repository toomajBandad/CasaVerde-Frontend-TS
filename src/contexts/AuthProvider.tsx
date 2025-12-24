import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import type { User } from "../types/user";
import type { Message } from "../types/message";
import { addFavorite, removeFavorite } from "../services/favoritesService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<User | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL as string;

  // Apply user data to state
  const applyUserData = useCallback((user: User) => {
    setUserInfos(user);
    setIsLoggedIn(true);
  }, []);

  // Fetch /me with automatic refresh
  const fetchUser = useCallback(async () => {
    try {
      let res = await fetch(`${apiUrl}/users/me`, { credentials: "include" });

      if (res.status === 401) {
        const refreshRes = await fetch(`${apiUrl}/users/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          throw new Error("Refresh failed");
        }

        res = await fetch(`${apiUrl}/users/me`, { credentials: "include" });
      }

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      applyUserData(data.user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsLoggedIn(false);
      setUserInfos(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, applyUserData]);

  // Restore session on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login simply reuses fetchUser
  const login = async () => {
    setLoading(true);
    await fetchUser();
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/users/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to clear cookie:", err);
    }
    setIsLoggedIn(false);
    setUserInfos(null);
    setLoading(false);
  };

  const updateUserInfos = async () => {
    await fetchUser();
  };

  const toggleFavorite = async (propertyId: string | number) => {
    if (!userInfos?.id) {
      toast.error("Please log in to save favorites");
      return;
    }

    const userId = userInfos.id;
    const isFavorited = userInfos.favorites?.some((f) => f._id === propertyId);

    if (isFavorited) {
      const result = await Swal.fire({
        title: "Remove from favorites?",
        text: "This property is already in your favorites. Do you want to remove it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
      });

      if (!result.isConfirmed) return;

      try {
        await removeFavorite(userId, propertyId);
        toast.success("Property removed from favorites!");
        await updateUserInfos();
      } catch {
        toast.error("Failed to remove property from favorites.");
      }

      return;
    }

    try {
      await addFavorite(userId, propertyId);
      toast.success("Property added to favorites!");
      await updateUserInfos();
    } catch {
      toast.error("Failed to add property to favorites.");
    }
  };

  const sendMsgToOwner = (msg: Message) => {
    console.log("Sending message:", msg);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        userInfos,
        userFavorites: userInfos?.favorites ?? [],
        userMessages: userInfos?.messages ?? [],
        userProperties: userInfos?.listings ?? [],
        login,
        logout,
        updateUserInfos,
        toggleFavorite,
        sendMsgToOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
