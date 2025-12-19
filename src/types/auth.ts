import type { User } from "./user";
import type { Property } from "./property";
import type { Message } from "./message";

export interface AuthContextType {
  isLoggedIn: boolean;
  userInfos: User | null;
  userFavorites: Property[];
  userMessages: Message[];
  login: () => void;
  logout: () => void;
  sendMsgToOwner: (msg: Message) => void;
  updateUserInfos: (newUserInfo: Partial<User>) => void;
}
