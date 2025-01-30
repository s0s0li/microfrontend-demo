import React, { useState } from "react";
import "./style.css";

interface Message {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  subject?: string;
  cc?: string[];
  bcc?: string[];
}

interface MessageListingProps {
  messages: Message[];
}

const MessageListing: React.FC<MessageListingProps> = ({ messages: initialMessages }) => {

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  console.log(messages, "messages")
  const [subject, setSubject] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<string>("");
  const [cc, setCc] = useState<string>("");
  const [bcc, setBcc] = useState<string>("");

  const handleSend = () => {
    if (!lastMessage.trim()) return; // Don't send empty messages

    // Create a new message
    const newMessage: Message = {
      id: String(messages.length + 1),
      name: "You",
      lastMessage: lastMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
      subject: subject.trim(),
      cc: cc.trim() ? cc.split(",").map((email) => email.trim()) : undefined,
      bcc: bcc.trim() ? bcc.split(",").map((email) => email.trim()) : undefined,
    };

    // Add the new message to the list
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Add a default reply
    const defaultReply: Message = {
      id: String(messages.length + 2),
      name: "System",
      lastMessage: "Thank you for your message. We will get back to you shortly.",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, defaultReply]);

    // Clear the form
    setSubject("");
    setLastMessage("");
    setCc("");
    setBcc("");
  };

  return (
    <div className="message-listing-container">
      <h2 className="header">Messages</h2>

      {/* Compose Message Form */}
     
      {/* Message List */}
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-item">
            <img
              src={msg.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${msg.name}`}
              alt={msg.name}
              className="avatar"
            />
            <div className="message-info">
              <h3 className="message-name">{msg.name}</h3>
              {msg.subject && <p className="message-subject">Subject: {msg.subject}</p>}
              <p className="message-text">{msg.lastMessage}</p>
              {msg.cc && <p className="message-cc">CC: {msg.cc.join(", ")}</p>}
              {msg.bcc && <p className="message-bcc">BCC: {msg.bcc.join(", ")}</p>}
            </div>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="compose-form">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="compose-input"
        />
        <textarea
          placeholder="Type your message..."
          value={lastMessage}
          onChange={(e) => setLastMessage(e.target.value)}
          className="compose-textarea"
        />
        <input
          type="text"
          placeholder="CC (comma-separated emails)"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
          className="compose-input"
        />
        <input
          type="text"
          placeholder="BCC (comma-separated emails)"
          value={bcc}
          onChange={(e) => setBcc(e.target.value)}
          className="compose-input"
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>

    </div>
  );
};

export default MessageListing;