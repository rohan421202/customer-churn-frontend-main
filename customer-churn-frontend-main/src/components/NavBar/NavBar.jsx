import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import DarkLightMode from "../../helper/DarkLightMode";

const NavBar = ({}) => {
  return (
    <div className="navbar bg-neutral text-neutral-content text-xl pos">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-neutral text-neutral-content"
          >
            <li>
              <Link to="about" spy={true} smooth={true} offset={50} duration={500}>About Us</Link>
            </li>
            <li>
            <Link to="services" spy={true} smooth={true} offset={50} duration={500}>Services</Link>
            </li>
            <li>
            <Link to="contacts" spy={true} smooth={true} offset={50} duration={500}>Contact Us</Link>
            </li>
            <li>
            <NavLink to="/auth" spy={true} smooth={true} offset={50} duration={500}>Sign Up</NavLink>
            </li>
            <li>
            <NavLink to="/login" spy={true} smooth={true} offset={50} duration={500}>Login</NavLink>
            </li>
          </ul>
        </div>
        <Link to="hero" spy={true} smooth={true} offset={50} duration={500} className="btn btn-ghost normal-case text-3xl">StayTrack</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="about" spy={true} smooth={true} offset={50} duration={500}>About Us</Link>
          </li>
          <li>
          <Link to="services" spy={true} smooth={true} offset={50} duration={500}>Services</Link>
          </li>
          <li>
          <Link to="contact" spy={true} smooth={true} offset={50} duration={500}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <NavLink to={"/auth"} className="btn bg-primary">
          Sign Up
        </NavLink>
        <NavLink to={"/login"} className="btn space bg-primary">
          Login
        </NavLink>
        <DarkLightMode />
      </div>
    </div>
  );
};

export default NavBar;
