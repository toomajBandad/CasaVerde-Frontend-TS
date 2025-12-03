import React, { useState } from "react";
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
  const [token, setToken] = useState<string | null>(null);
  const [userInfos, setUserInfos] = useState<User | null>(null);
  const [userFavorites, setUserFavorites] = useState<Property[]>([]);
  const [userMessages, setUserMessages] = useState<Message[]>([]);

  const login = (user: User, token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(user);
    setUserFavorites(user.favorites || []);
    setUserMessages(user.messages || []);
    localStorage.setItem("user", JSON.stringify({ token, user }));
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserInfos(null);
    setUserFavorites([]);
    setUserMessages([]);
    localStorage.removeItem("user");
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
        token,
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
