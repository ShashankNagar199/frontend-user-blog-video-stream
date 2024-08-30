import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../../apiConfig";
import "../auth.css";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/users/login`,
        { firstName, password },
        {
          headers: {
            "access-Control-Allow-Origin": "*",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        title: "Login successfully",
        icon: "success",
        timer: 2000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      navigate("/profile");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default Login;
