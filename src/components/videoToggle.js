import React, { useState } from "react";

const VideoToggle = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    videoRef.current.currentTime = 0;
  };

  const handleJump = (time) => {
    videoRef.current.currentTime = time;
  };

  return (
    <div className="video-toggle">
      <button onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={handleRewind}>Rewind</button>
      <button onClick={() => handleJump(30)}>Jump 30 secs</button>
    </div>
  );
};

export default VideoToggle;