
import React, { useState, useEffect, useRef } from "react";
import chatbotData from "./chatbotData";
import "./FAQChatbot.css";

const FAQChatbot = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      setUserInput(transcript);

      if (lastResult.isFinal) {
        handleSend(transcript);
        setUserInput("");
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleSend = (input = userInput) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const lowerInput = trimmed.toLowerCase();
    const botResponse =
      chatbotData[lowerInput] ||
      "I'm not sure how to respond to that. Try asking about phishing, typosquatting, or how to report a URL.";

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed },
      { sender: "bot", text: botResponse }
    ]);
    setUserInput("");
  };

  if (!visible) return null;

  return (
    <div className="chatbot-box">
      <div className="chatbot-header">
        <span>🤖 Sentinel Chat</span>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask me something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
  onClick={toggleListening}
  className={`mic-btn ${isListening ? "listening" : ""}`}
  title="Voice input"
>
  {isListening ? (
    <svg
      className="mic-wave-svg"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  ) : (
    "🎙️"
  )}
</button>


      </div>
    </div>
  );
};

export default FAQChatbot;
