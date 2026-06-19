import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      console.log(data);

      login(
        data.token,
        data.user
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </>
  );
}

export default LoginPage;