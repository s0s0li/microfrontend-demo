import React, { Component } from "react";
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
  ifEmail?: Boolean;
}

interface MessageListingState {
  messages: Message[];
  subject: string;
  lastMessage: string;
  cc: string;
  bcc: string;
}

class MessageListing extends Component<MessageListingProps, MessageListingState> {
  constructor(props: MessageListingProps) {
    super(props);

    // Initialize state from props
    this.state = {
      messages: props.messages,
      subject: "",
      lastMessage: "",
      cc: "",
      bcc: ""
    };
  }

  handleSend = () => {
    const { messages, lastMessage, subject, cc, bcc } = this.state;

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
    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage]
    }));

    // Add a default reply
    const defaultReply: Message = {
      id: String(messages.length + 2),
      name: "System",
      lastMessage: "Thank you for your message. We will get back to you shortly.",
      timestamp: new Date().toLocaleTimeString(),
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, defaultReply]
    }));

    // Clear the form
    this.setState({
      subject: "",
      lastMessage: "",
      cc: "",
      bcc: ""
    });
  };

  render() {
    const { messages, subject, lastMessage, cc, bcc } = this.state;
    const { ifEmail } = this.props;
    console.log(ifEmail, "ifEmail")
    return (
      <div className="message-listing-container">
        <h2 className="header">Messages</h2>

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
                {ifEmail && msg.bcc && <p className="message-bcc">BCC: {msg.bcc.join(", ")}</p>}
              </div>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Compose Message Form */}
        <div className="compose-form">
        {ifEmail &&
            <input
              type="text"
              placeholder="TO (comma-separated emails)"
              value={cc}
              onChange={(e) => this.setState({ cc: e.target.value })}
              className="compose-input"
            />}
          {ifEmail &&
            <input
              type="text"
              placeholder="CC (comma-separated emails)"
              value={bcc}
              onChange={(e) => this.setState({ bcc: e.target.value })}
              className="compose-input"
            />}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => this.setState({ subject: e.target.value })}
            className="compose-input"
          />
          <textarea
            placeholder="Type your message..."
            value={lastMessage}
            onChange={(e) => this.setState({ lastMessage: e.target.value })}
            className="compose-textarea"
          />
       
          <button onClick={this.handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default MessageListing;
