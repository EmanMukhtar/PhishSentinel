
import { useEffect } from "react";

const VoiceTrigger = ({ onActivate }) => {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      if (transcript.includes("hello sentinel")) {
        onActivate();
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [onActivate]);

  return (
    <div className="voice-notification">
      🎤 Say <strong>"Hello Sentinel"</strong> to activate chat
    </div>
  );
};

export default VoiceTrigger;
