import { createContext } from "react";
import type { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  userInfos: null,
  userFavorites: [],
  userMessages: [],
  login: () => {},
  logout: () => {},
  sendMsgToOwner: () => {},
  updateUserInfos: () => {},
});

export default AuthContext;
