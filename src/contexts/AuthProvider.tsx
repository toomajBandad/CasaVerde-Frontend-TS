import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import type { User } from "../types/user";
import type { Property } from "../types/property";
import type { Message } from "../types/message";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<User | null>(null);
  const [userFavorites, setUserFavorites] = useState<Property[]>([]);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [userProperties, setUserProperties] = useState<Property[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL as string;

  // Apply user data to state
  const applyUserData = useCallback((user: User) => {
    setUserInfos(user);
    setUserFavorites(user.favorites || []);
    setUserMessages(user.messages || []);
    setUserProperties(user.listings || []);
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
      setUserFavorites([]);
      setUserMessages([]);
      setUserProperties([]);
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
    setUserFavorites([]);
    setUserMessages([]);
    setUserProperties([]);
  };

  const updateUserInfos = (newUserInfo: Partial<User>) => {
    setUserInfos((prev) => (prev ? { ...prev, ...newUserInfo } : null));
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
        userFavorites,
        userMessages,
        userProperties,
        login,
        logout,
        sendMsgToOwner,
        updateUserInfos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
