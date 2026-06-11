import { useState } from "react";
import { askRag } from "../services/rag_service";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";

const suggestedQuestions = [
  "What is a calorie?",
  "What is BMR?",
  "How many calories do I need per day?",
  "Best foods for weight loss",
  "Foods high in protein",
  "Is rice good for weight loss?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  // 🔥 shared function for BOTH typing + clicking
  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);

    const res = await askRag(text);

    const botMsg = { role: "bot", text: res.answer };

    setMessages(prev => [...prev, botMsg]);
  };

  // ✅ click suggestion = same flow as typing
  const handleSuggestionClick = (question) => {
    handleSend(question);
  };

  return (
    <div style={styles.container}>

      {/* 💡 RAG SUGGESTIONS */}
      <div style={styles.suggestions}>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(q)}
            style={styles.suggestionBtn}
          >
            {q}
          </button>
        ))}
      </div>

      {/* 💬 CHAT AREA */}
      <ChatBox messages={messages} />

      {/* ⌨ INPUT AREA */}
      <ChatInput onSend={handleSend} />

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },

  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fafafa"
  },

  suggestionBtn: {
    padding: "6px 10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    fontSize: "12px"
  }
};