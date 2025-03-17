import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "../../components/LandingIntro/LandingIntro";
import axios from "axios";
import "./auth.css";

const Auth = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useNavigate();

  const handlePassword = (e) => {
    setErrorMessage("");
    setPassword(e.target.value.trimStart().replace("  ", " "));
  };
  const handleEmail = (e) => {
    setErrorMessage("");
    setEmail(e.target.value.trimStart().replace("  ", " "));
  };
  const handleUserName = (e) => {
    setErrorMessage("");
    setUserName(e.target.value.trimStart().replace("  ", " "));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!username) {
      setErrorMessage("Name is required! (use any value)");
      return;
    }
    if (!email) {
      setErrorMessage("Email Id is required! (use any value)");
      return;
    }
    if (!password) {
      setErrorMessage("Password is required! (use any value)");
      return;
    }
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://${import.meta.env.VITE_SERVER_ADDRESS}/signup`,
        {
          user_id: 0,
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history("/profile");
    } catch (error) {
      console.log(error.response.data.detail);
      setErrorMessage("Not Registered");
      return;
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <LandingIntro />
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Sign Up
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <input
                  type="name"
                  placeholder="Enter Name"
                  value={username}
                  className="input input-bordered input-primary w-full max-w-xs email-input"
                  onChange={(e) => handleUserName(e)}
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  className="input input-bordered input-primary w-full max-w-xs email-input"
                  onChange={(e) => handleEmail(e)}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  className="input input-bordered input-primary w-full max-w-xs email-input"
                  onChange={(e) => handlePassword(e)}
                />
              </div>
              <p className={`text-center text-error mt-8`}>{errorMessage}</p>
              <button type="submit" className={"btn mt-2 w-4/5 btn-primary"}>
                Register
              </button>
              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
