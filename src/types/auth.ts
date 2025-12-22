import type { User } from "./user";
import type { Property } from "./property";
import type { Message } from "./message";

export interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  userInfos: User | null;
  userFavorites: Property[];
  userMessages: Message[];
  userProperties: Property[];

  login: () => Promise<void>;
  logout: () => Promise<void>;

  sendMsgToOwner: (msg: Message) => void;
  updateUserInfos: (info: Partial<User>) => void;
}
