import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

export default function Messages() {
  const authContext = useContext(AuthContext);
  const userData = authContext.userInfos;
  const userFavorites = authContext.userFavorites;
  const userProperties = authContext.userProperties;
  const userMessages = authContext.userMessages;

  const conversations: Conversation[] = [
    { id: 1, name: "Alice Johnson", lastMessage: "Thanks! I'll check it out." },
    {
      id: 2,
      name: "Carlos Rivera",
      lastMessage: "Is the apartment still available?",
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "them",
      text: "Hi! Is this property still available?",
      time: "10:12",
    },
    { id: 2, sender: "me", text: "Yes, it is available!", time: "10:14" },
    {
      id: 3,
      sender: "them",
      text: "Great, can we schedule a visit?",
      time: "10:15",
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState<number>(1);

  return (
    <div className="flex flex-col md:flex-row h-[70vh] gap-6">
      {/* Conversations list */}
      <aside className="w-full md:w-1/3 bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">
          Messages
        </h2>

        <div className="divide-y">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full text-left p-4 hover:bg-teal-50 transition ${
                selectedConversation === conv.id ? "bg-teal-100" : ""
              }`}
            >
              <p className="font-medium text-gray-800">{conv.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat window */}
      <main className="flex-1 bg-white rounded-xl shadow-md flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {conversations.find((c) => c.id === selectedConversation)?.name}
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.sender === "me"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs opacity-70 mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
