import "./App.css";
import { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import { PrimaryBody } from "./components/body-primary/PrimaryBody";
import { SecondaryBody } from "./components/body-secondary/SecondaryBody";
import { Result } from "./components/result/Result";
import Cookies from 'js-cookie';
import DatabaseDisplay from "./components/reported-database/DatabaseDisplay";
import ChangePassword from "./components/change-password/ChangePassword";
import ReportURL from "./components/report-url/ReportURL";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import DeleteAccountMain from "./components/delete-account/DeleteAccountMain";
import SetPasswordPage from "./components/set-password/SetPassword";
import TypoSquatGenerator from "./components/typosquat-url/TypoSquatGenerator";
import IntroVideo from "./components/introVideo";


import FAQChatbot from "./components/chatbot/FAQChatbot";
import VoiceTrigger from "./components/chatbot/VoiceTrigger";
import ChatbotIcon from "./components/chatbot/ChatbotIcon";
 
function NotFound() {
  return <Navigate to="/" />;
}

function FrontPage() {
  const [showProgress, setProgressVisible] = useState(false);
  const [showBot, setShowBot] = useState(false); // Controls chatbot
  const savedEmail = Cookies.get("email");

  return (
    <div>
      <Header LoggedInUser={savedEmail} />
      {showProgress ? <div className="w-full h-1 bg-red-500 animate-pulse" /> : null}
      <PrimaryBody showProgress={setProgressVisible} />
      <SecondaryBody />
      <Footer />

      {/* ✅ Voice trigger & chat controls */}
      <VoiceTrigger onActivate={() => setShowBot(true)} />
      <ChatbotIcon onClick={() => setShowBot(true)} />
      <FAQChatbot visible={showBot} onClose={() => setShowBot(false)} />
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroVideo onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="fade-in">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/set_password" element={<SetPasswordPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<ReportURL />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/reported_urls" element={<DatabaseDisplay />} />
          <Route path="/typesquat_url_generator" element={<TypoSquatGenerator />} />
          <Route path="/delete_account" element={<DeleteAccountMain />} />
          <Route path="/result" element={<Result />} />
          <Route path="/" element={<FrontPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

