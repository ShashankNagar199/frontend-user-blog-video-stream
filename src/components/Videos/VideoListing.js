import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import VideoUpload from "./VideoUpload";
import VideoUploadModal from "./VideoUploadModal";
import "./VideoListing.css";
import { getBaseUrl } from "../../apiConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultpic from "../../img/default_img.png";

const VideoListing = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while (i--) {
      localStorage.removeItem(keys[i]);
    }
    navigate("/login");
  };

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${getBaseUrl()}/api/videos/videos-by-users`,
        {
          headers: { Authorization: token },
        }
      );
      const userVideos = response.data;
      setVideos(userVideos);
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="video-listing-container">
       <div className="instruction-box">
        <p>
          Please ensure you have a stable internet connection, as videos may
          take some time to load or might not display properly otherwise.
        </p>
        <p>
          Uploading videos might take a bit of time, so please be patient while
          your upload is in progress.
        </p>
      </div>
      <div className="buttons-container">
        <button className="upload-button" onClick={() => setShowModal(true)}>
          Upload Video
        </button>
        <div className="right-buttons">
          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
          >
            Go Back to Profile
          </button>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <VideoUploadModal show={showModal} onClose={() => setShowModal(false)}>
        <VideoUpload onUploadSuccess={fetchVideos} />
      </VideoUploadModal>
      {videos.length === 0 && <h2>No users have uploaded videos yet.</h2>}
      {videos.map((user) => (
        <div key={user._id} className="user-section">
          <div className="user-info">
            <img
              src={
                user.profilePicture
                  ? `${getBaseUrl()}/api/users/profilePicture/${user.profilePicture}`
                  : defaultpic
              }
              alt="Profile"
              className="user-profile-picture"
            />
            <h3>{user.firstName+"-"+user.lastName}</h3>
          </div>
          {user.videos.length === 0 ? (
            <h2>No videos uploaded</h2>
          ) : (
            <div className="video-grid">
              {user.videos.slice(0, 5).map((video) => (
                <VideoCard key={video._id} user={user} video={video} />
              ))}
              {user.videos.length > 5 && (
                <Link className="view-more" to={`/user/${user._id}/videos`}>
                  View More
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoListing;
