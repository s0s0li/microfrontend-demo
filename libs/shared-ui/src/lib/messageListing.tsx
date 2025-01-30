import React from "react";

interface Message {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

interface MessageListingProps {
  messages: Message[];
}

 export const MessageListing: React.FC<MessageListingProps> = ({ messages }) => {
  return (
    <div className="w-80 bg-white border-r h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="p-2 border-b hover:bg-gray-100 cursor-pointer">
            <div className="font-semibold">{msg.name}</div>
            <div className="text-sm text-gray-600 truncate">{msg.lastMessage}</div>
            <div className="text-xs text-gray-400">{msg.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageListing;
