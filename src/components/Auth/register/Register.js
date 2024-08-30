import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../../apiConfig";
import "../auth.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseUrl()}/api/users/register`, {
        firstName,
        lastName,
        email,
        phone,
      });
      Swal.fire({
        title: "Account added",
        icon: "success",
        timer: 2000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
      alert("Email already exists ->" + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Register;
