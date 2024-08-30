import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../apiConfig";

const UploadProfilePicture = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .post(`${getBaseUrl()}/api/users/uploadProfilePicture`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Image Uploaded",
          icon: "success",
          timer: 1000,
          showCloseButton: true,
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        onUploadSuccess(response.data.profilePictureUrl); // Ensure the URL is correct
      })
      .catch((error) => {
        console.error(
          "Error uploading profile picture:",
          error.response?.data?.message || error.message
        );
        Swal.fire({
          title: "Error ,File is too long try less than 1MB",
          icon: "error",
          timer: 1000,
          showCloseButton: true,
          allowOutsideClick: false,
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="upload-profile-picture-container">
      <label htmlFor="profile-picture-upload">Upload Profile Pic:</label>
      <input
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadProfilePicture;
