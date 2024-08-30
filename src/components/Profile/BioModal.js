// BioModal.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../apiConfig";
import "./Profile.css";

const BioModal = ({ isOpen, onClose, currentBio, onBioUpdate }) => {
  const [newBio, setNewBio] = useState(currentBio || "");

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${getBaseUrl()}/api/users/user/bio`,
        { bio: newBio },
        {
          headers: { Authorization: token },
        }
      );
      Swal.fire({
        title: "Bio updated successfully",
        icon: "success",
        timer: 2000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      onBioUpdate(newBio);
      onClose();
    } catch (error) {
      console.error(
        "Error updating bio:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bio-modal-overlay">
      <div className="bio-modal-content">
        <h2>{currentBio ? "Update Bio" : "Add Bio"}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newBio}
            onChange={handleBioChange}
            maxLength="500"
            placeholder="Update/Post your bio"
          />
          <button type="submit">{currentBio ? "Update Bio" : "Add Bio"}</button>
          <button type="button" onClick={onClose} className="bio-close-button">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default BioModal;
