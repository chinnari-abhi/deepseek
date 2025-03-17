import React, { useState } from "react";
import axios from "axios";
import "./chat.css";


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, user: "You" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });
      setMessages([...newMessages, { text: response.data.reply, user: "AI" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error: Unable to fetch response", user: "AI" }]);
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <p key={index} className={msg.user === "You" ? "user-msg" : "ai-msg"}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
