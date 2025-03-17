import React, { useState } from "react";
import LandingIntro from "../../components/LandingIntro/LandingIntro";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';

const Login = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

  const history = useNavigate();

  const handlePassword = (e) => {
    setErrorMessage("");
    setPassword(e.target.value.trimStart().replace("  ", " "));
  }

  const handleEmail = (e) => {
    setErrorMessage("");
    setEmail(e.target.value.trimStart().replace("  ", " "));
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if(!email) {
      setErrorMessage("Email Id is required! (use any value)");
      return;
    }
    if(!password) {
      setErrorMessage("Password is required! (use any value)");
      return;
    }
    try {
      const { data } = await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/login`, {
        "email": email,
        "password": password
      },  {
        headers: {
            "Content-type": "application/json"
        }
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    history('/profile');
    } catch (error) {
      console.log("In catch");
      console.log(error)
      setErrorMessage("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <LandingIntro />
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                
              <input type="email" placeholder="Enter Email" value={email} className="input input-bordered input-primary w-full max-w-xs email-input" onChange={(e) => handleEmail(e)}/>
              <input type="password" placeholder="Enter Password" value={password} className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => handlePassword(e)}/>
  
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <p className={`text-center text-error mt-8`}>{errorMessage}</p>
              <button
                type="submit"
                className={
                  "btn mt-2 w-4/5 btn-primary"
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/auth">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
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

export default Login;
