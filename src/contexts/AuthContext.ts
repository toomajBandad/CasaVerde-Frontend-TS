import { createContext } from "react";
import type { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  userInfos: null,
  userFavorites: [],
  userMessages: [],
  login: async () => {},
  logout: async () => {},
  sendMsgToOwner: () => {},
  updateUserInfos: () => {},
});

export default AuthContext;
