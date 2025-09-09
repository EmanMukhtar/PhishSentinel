
import React from "react";
import "./FAQChatbot.css";

const ChatbotIcon = ({ onClick }) => {
  return (
    <div className="chatbot-icon" onClick={onClick} title="Need help?">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 3C6.48 3 2 6.8 2 11c0 1.92.82 3.68 2.2 5.07-.27 1.02-1 2.27-1.8 3.12-.24.25-.3.61-.15.91.16.3.48.49.83.49.38 0 3.14-.43 4.98-1.61C9.19 19.79 10.56 20 12 20c5.52 0 10-3.8 10-9s-4.48-8-10-8zm-2 10H8v-2h2v2zm4 0h-2v-2h2v2z" />
      </svg>
    </div>
  );
};

export default ChatbotIcon;
