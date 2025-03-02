import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      //console.error("Login error:", error); // Log the error to check its structure
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2 style={{ color: "#FF0000" }}>LOGIN</h2>
        <p>
          Welcome to MediConnect! Please log in to access your personalized
          health dashboard.{" "}
        </p>{" "}
        <br></br>
        <p>
          Stay connected with your medical records, appointments, and health
          updates in one secure place. Your well-being is just a login
          away—enter your credentials to get started.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#FF0000" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
