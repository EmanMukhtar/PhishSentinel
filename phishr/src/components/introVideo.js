import React, { useEffect, useRef, useState } from 'react';
import introVideo from '../assets/intro.mp4';
import './IntroVideo.css';

const IntroVideo = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fadeDuration = 1000; // 1 second fade
    const playTime = 4000;     // start fading after 4 seconds

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);

      // Optional: slow down volume (if video is not muted)
      if (videoRef.current && !videoRef.current.muted) {
        let vol = 1.0;
        const volumeFade = setInterval(() => {
          if (vol <= 0.05) {
            clearInterval(volumeFade);
            videoRef.current.volume = 0;
          } else {
            vol -= 0.05;
            videoRef.current.volume = vol;
          }
        }, fadeDuration / 20);
      }

      setTimeout(() => {
        onFinish();
      }, fadeDuration);
    }, playTime);

    return () => clearTimeout(fadeTimer);
  }, [onFinish]);

  return (
    <div className={`intro-video-container ${fadeOut ? 'fade-out' : ''}`}>
      <video ref={videoRef} autoPlay muted className="intro-video">
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;
