import React, { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../apiConfig";
import Swal from "sweetalert2";

const Bio = ({ bio }) => {
  const [newBio, setNewBio] = useState(bio || "");

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
      // alert('Bio updated successfully');
      Swal.fire({
        title: "Bio updated successfully",
        icon: "success",
        timer: 2000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "Error updating bio:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newBio}
        onChange={handleBioChange}
        maxLength="500"
        placeholder="Update/Post your bio"
      />
      <button type="submit">{bio ? "Update Bio" : "Add Bio"}</button>
    </form>
  );
};

export default Bio;
