import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../apiConfig";

const VideoUpload = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!title || !videoFile) {
      setMessage("Title and video file are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${getBaseUrl()}/api/videos/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      setMessage(response.data.message || "Video uploaded successfully");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      fileInputRef.current.value = "";

      Swal.fire({
        title: "Video Uploaded",
        icon: "success",
        timer: 2000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      // Call the onUploadSuccess callback to update the video list
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      setMessage(
        typeof errorMessage === "string"
          ? errorMessage
          : "Error uploading video"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="30"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="500"
          ></textarea>
        </div>
        <div>
          <label>Video File:</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
