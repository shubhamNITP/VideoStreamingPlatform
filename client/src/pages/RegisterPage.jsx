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

      <main className="page auth-page">
        <section className="card auth-card">
          <div className="auth-copy">
            <p className="eyebrow">Create your account</p>
            <h1>Build your own channel in minutes.</h1>
            <p>Set up your profile, start uploading, and keep your videos in one place.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">Register</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default RegisterPage;