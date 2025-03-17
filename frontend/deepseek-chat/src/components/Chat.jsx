import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, user: "You" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });

      console.log("🔹 FULL RESPONSE:", response.data);

      let aiReply = response.data.reply?.trim() || "⚠️ AI response was cut off. Try again!";
      setMessages([...newMessages, { text: aiReply, user: "AI" }]);
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);
      setMessages([...newMessages, { text: "❌ Error: Unable to fetch response", user: "AI" }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white text-xl font-semibold p-4 shadow-md text-center">
        AI Chatbot
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.user === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
            }`}
            style={{ alignSelf: msg.user === "You" ? "flex-end" : "flex-start" }}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white shadow-md flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
