import "./SecondaryBody.css";
import BackgroundShape from "../../assets/BackgroundShape.svg";

export function SecondaryBody() {
  return (
    <div className="relative w-full h-[550px] sm:h-[600px] lg:h-[650px]">
      {/* SVG as background */}
      <img
        src={BackgroundShape}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Text overlay - fits inside SVG */}
      <div className="absolute w-full z-10 px-4 text-center top-[50%] sm:top-[52%] lg:top-[54%]">
        <p className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4">
          How does it Work?
        </p>
        <p className="text-white font-light text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
          Phishing is a prevalent online scam where criminals impersonate legitimate sites.
          To combat this threat, we have implemented an advanced system that combines multiple
          techniques for efficient detection of malicious URLs. Our system employs an Artificial
          Neural Network trained on a dataset of 600,000 URLs and enhances its capabilities by
          extensively analyzing the top 1 million URLs on the World Wide Web. Furthermore, we
          cross-reference these URLs with blacklists from trusted sources like Google, Norton,
          URLVoid, and others. These comprehensive upgrades empower our system to identify and
          protect users from malicious websites, providing a robust defense against phishing scams.
          <br /><br />
          <span className="font-bold underline text-white-400 hover:text-gray">
            <a href="#" target="_blank" rel="noreferrer">LEARN MORE</a>
          </span>
        </p>
      </div>
    </div>
  );
}

