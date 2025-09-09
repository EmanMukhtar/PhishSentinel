import "./Result.css";
import { Header } from "../header/Header";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import WarningGif from "../../assets/Warning.gif";
import SafeGif from "../../assets/Safe.gif";
import CardFrame from "../../assets/card.svg";

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  useEffect(() => {
    if (locationState == null) navigate("/");
  }, [locationState, navigate]);

  if (!locationState) return null;

  const input_url = locationState["inputUrl"];
  const output = locationState["output"];
  const url_score = output["SCORE"];

  let THREAT_LEVEL = null;
  if (url_score >= 120) THREAT_LEVEL = "SAFE";
  else if (url_score > 60) THREAT_LEVEL = "POTENTIAL";
  else THREAT_LEVEL = "RISKY";

  const credentials = [
    {
      label: "In Top Most Visited Sites",
      value: output.InTop1Million,
      description: "This indicates if the domain is among Alexa's top 1 million visited sites.",
      impact: 8,
    },
    {
      label: "SSL Certificate Detected",
      value: output.hasSSLCertificate,
      description: "SSL ensures encrypted communication between the browser and server.",
      impact: 15,
    },
    {
      label: "Domain Older Than 3 Months",
      value: output.isOlderThan3Months,
      description: "Older domains are more trustworthy compared to newly registered ones.",
      impact: 12,
    },
    {
      label: "Temporary Domain (e.g., Vercel/Heroku)",
      value: !output.isTemporaryDomain,
      description: "Temporary domains are often used for phishing or test deployments.",
      impact: 10,
    },
    {
      label: "Passed Google WebSafe Evaluation",
      value: output.GoogleSafePassed,
      description: "Google WebSafe ensures the site doesn't host malware or deceptive content.",
      impact: 18,
    },
    {
      label: "Passed Norton WebSafe Evaluation",
      value: output.NortanWebSafePassed,
      description: "Norton checks the website’s trust score and malware status.",
      impact: 12,
    },
    {
      label: "Not in URLVoid Blacklist",
      value: !output.InURLVoidBlackList,
      description: "URLVoid aggregates blacklists to detect suspicious domains.",
      impact: 15,
    },
    {
      label: "Not in McAfee Blacklist",
      value: !output.InMcaffeBlackList,
      description: "McAfee flags websites that are involved in malicious activity.",
      impact: 10,
    },
    {
      label: "Not in Sucuri Blacklist",
      value: !output.InSucuriBlacklist,
      description: "Sucuri monitors domains for malware and malicious redirects.",
      impact: 12,
    },
    {
      label: "Not in IPSet Blacklist",
      value: !output.isBlackListedinIpSets,
      description: "IPSet includes IPs used by known malicious services.",
      impact: 8,
    },
  ];

  return (
    <>
      <Header />
      <div className="gif-container">
        <img
          src={THREAT_LEVEL === "SAFE" ? SafeGif : WarningGif}
          alt="Threat Indicator"
          className="threat-gif"
        />
        <h1 className="url-heading">"{input_url}"</h1>
        <h2 className="threat-message">
          {{
            SAFE: "The URL is SAFE 🛡️ ",
            POTENTIAL: "Potentially Risky ⚠️ Use with caution.",
            RISKY: "Highly Malicious ❌ Avoid this site!",
          }[THREAT_LEVEL]}
        </h2>
      </div>

      <div className="card-grid">
        {credentials.map((cred, idx) => (
          <div className="flip-card" key={idx}>
            <div className="flip-inner">
              <div className="flip-front card-svg">
                <div className={`status-icon ${cred.value ? "safe" : "risk"}`}>
                  {cred.value ? (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                      <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <circle cx="12" cy="12" r="10" fill="#ef4444" />
                      <path d="M8 8l8 8M8 16l8-8" stroke="#fff" strokeWidth="2" />
                    </svg>
                  )}
                </div>
                <h3 className="card-title">{cred.label}</h3>
              </div>
              <div className="flip-back card-svg">
                <p className="description">{cred.description}</p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      "--fill-width": `${cred.impact}%`,
                      animation: "fillBar 1.5s ease-out forwards",
                    }}
                  ></div>
                </div>
                <span className="percent">{cred.impact}% Impact</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {output.target_urls.length > 0 && (
  <div className="target-url-wrapper">
    <div className="target-url-card">
      <h2 className="target-url-heading"style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f2937" }}> Targeted Brands or URLs</h2>
      <ul className="target-url-list">
        {output.target_urls.slice(0, 5).map((url, index) => (
          <li key={index} className="target-url-item">
            <a
              href={`https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="target-url-link"
            >
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


      <button className="try-again-btn" onClick={() => navigate("/")}>
        🔄 Try Again
      </button>
    </>
  );
}
