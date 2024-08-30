import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import "./VideoListing.css";
import { getBaseUrl } from "../../apiConfig";
import { useParams, useNavigate } from "react-router-dom";

const UserVideos = () => {
  const { userId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${getBaseUrl()}/api/videos/user/${userId}/videos`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setVideos(response.data);
      } catch (error) {
        console.error(
          "Error fetching user videos:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserVideos();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-videos-container">
       <div className="header-container">
        <h2>User Videos</h2>
        <button 
          className="profile-redirect-button"
          onClick={() => navigate(`/profile`)}
        >
          Go to Profile
        </button>
      </div>
      {videos.length > 0 ? (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p>No videos found for this user.</p>
      )}
    </div>
  );
};

export default UserVideos;
