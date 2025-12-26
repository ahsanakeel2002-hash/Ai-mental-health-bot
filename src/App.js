import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Send message function
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      // ✅ Backend API call (இங்க தான் உன் code போடணும்)
      const response = await axios.post("http://localhost:5000/chat", {
        message: userMessage,
      });

      // 🟩 CHANGED: OpenRouter format uses 'reply' key
      let botReply;
      if (response.data.reply) {
        botReply = response.data.reply;
      } else {
        botReply = "No response from model.";
      }

      // ✅ Add bot message
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to backend server." },
      ]);
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>🧠 Mental Health Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
