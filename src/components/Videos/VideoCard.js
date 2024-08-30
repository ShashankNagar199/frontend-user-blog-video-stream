import React, { useEffect, useState } from "react";
import "./VideoListing.css";
import { getBaseUrl } from "../../apiConfig";

const VideoCard = ({ video }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${getBaseUrl()}/api/videos/video/${video.filename}`, {
          headers: { Authorization: `${token}` },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [video.filename]);

  return (
    <div className="video-card">
      <h4>{video.title}</h4>
      <p>{video.description}</p>
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoCard;
