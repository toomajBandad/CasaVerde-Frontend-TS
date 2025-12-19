import React, { useState, useEffect } from "react";
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
  const [userInfos, setUserInfos] = useState<User | null>(null);
  const [userFavorites, setUserFavorites] = useState<Property[]>([]);
  const [userMessages, setUserMessages] = useState<Message[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/me`, {
          credentials: "include", // ✅ send cookie
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserInfos(data.user);
            setIsLoggedIn(true);
            setUserFavorites(data.user.favorites || []);
            setUserMessages(data.user.messages || []);
          }
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
      }
    };

    fetchUser();
  }, [apiUrl]);

  const login = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUserInfos(data.user);
        setIsLoggedIn(true);
        setUserFavorites(data.user.favorites || []);
        setUserMessages(data.user.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch user after login:", err);
    }
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
  };

  const updateUserInfos = (newUserInfo: Partial<User>) => {
    setUserInfos((prev) => (prev ? { ...prev, ...newUserInfo } : null));
  };

  const sendMsgToOwner = (msg: Message) => {
    // implement API call or socket emit here
    console.log("Sending message:", msg);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userInfos,
        userFavorites,
        userMessages,
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
