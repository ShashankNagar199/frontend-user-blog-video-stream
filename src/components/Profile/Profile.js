import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadProfilePicture from "./UploadProfilePicture";
import BioModal from "./BioModal";
import defaultpic from "../../img/default_img.png";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../apiConfig";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const goToVideoPage = () => {
    navigate("/home");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/users/user`, {
          headers: { Authorization: token },
        });
        setUser(response.data);
        setProfilePicture(response.data.profilePicture);
        setBio(response.data.bio || "");
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token,profilePicture]);

  const handleBioUpdate = (updatedBio) => {
    setBio(updatedBio);
  };

  const handleUploadSuccess = (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <img
        src={
          profilePicture ? `${getBaseUrl()}/api/users/profilePicture/${profilePicture}` : defaultpic
        }
        alt="Profile"
      />
      <UploadProfilePicture onUploadSuccess={handleUploadSuccess} />
      <div className="profile-info">
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.phone}</p>
        <p>{bio}</p>
        <button onClick={() => setIsModalOpen(true)}>
          {bio ? "Update Bio" : "Add Bio"}
        </button>
      </div>
      <button onClick={goToVideoPage}>Go to Video page</button>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
      <BioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentBio={bio}
        onBioUpdate={handleBioUpdate}
      />
    </div>
  );
};

export default Profile;
