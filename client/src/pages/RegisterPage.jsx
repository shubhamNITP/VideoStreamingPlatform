import { useState } from "react";
import Navbar from "../components/Navbar";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";



function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const data =
        await registerUser(
          formData
        );

      console.log(data);
     
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
            error.response?.data?.message ||
            "Registration Failed"
        );
    }
  };

  return (
    <>
      <Navbar />

      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={
            formData.username
          }
          onChange={handleChange}
        />

        <br />
        <br />

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
          Register
        </button>
      </form>
    </>
  );
}

export default RegisterPage;