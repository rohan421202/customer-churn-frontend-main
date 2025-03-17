import React from "react";
import { Link, NavLink } from "react-router-dom";
import {RxHamburgerMenu} from "react-icons/rx";
import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs";
import {AiOutlineBell} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import profilePhoto from "../../assets/images/user-photo.png";
import { AiFillHome, AiFillAccountBook } from "react-icons/ai";
import { TbFileAnalytics } from "react-icons/tb";
import { BiStats } from "react-icons/bi";
import image from "../../assets/images/business-background-image.jpg";
import './sidebar.css';
import DarkLightMode from "../../helper/DarkLightMode";

const SideBar = ({ children }) => {
  const history = useNavigate();
  const logoutUser = () => {
      localStorage.clear();
      history('/')
  }
  return (
    <div className="drawer drawer-mobile">
      
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col ">
        {/* <!-- Page content here --> */}
        <div className="navbar flex justify-between bg-base-100 z-10 shadow-md">
          <div className="">
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            <RxHamburgerMenu className="h-5 inline-block w-5"/>
            </label>
            <h1 className="text-2xl font-semibold ml-2">StayTrack</h1>
          </div>

          <div className="order-last">
            {/* <label className="swap ">
              <input type="checkbox"/>
              <BsFillSunFill data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "}/>
              <BsFillMoonFill data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "} />
            </label> */}

            <DarkLightMode />

            <button className="btn btn-ghost ml-4  btn-circle">
                <div className="indicator">
                    <AiOutlineBell className="h-6 w-6"/>
                    {/* {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null } */}
                </div>
            </button>


            {/* Profile icon, opening menu on click */}
            <div className="dropdown dropdown-end ml-4">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={profilePhoto} alt="profile" />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="justify-between">
                    <Link to={'/profile'}>
                        Profile Settings
                        <span className="badge">New</span>
                        </Link>
                    </li>
                    <li className=''><Link to={'/billing'}>Bill History</Link></li>
                    <div className="divider mt-0 mb-0"></div>
                    <li><p onClick={logoutUser}>Logout</p></li>
                </ul>
            </div>
          </div>

        </div>
        <main className="flex-1 overflow-y-auto pt-8 px-6 bg-base-200">
          <div className="hero bg-base-200">
            {children}
          </div>
        </main>
      </div> 

      <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}

            <li className="mb-2 font-semibold text-xl">
              <Link to={"/"}>
                <img
                  className="mask mask-squircle w-10"
                  src={image}
                  alt="DashWind Logo"
                />
                StayTrack
              </Link>
            </li>
            {[
              { name: "Profile", path: "/profile", icon: <AiFillHome /> },
              {
                name: "Data Insight",
                path: "/insights",
                icon: <AiFillAccountBook />,
              },
              {
                name: "Algorithms",
                path: "/algorithms",
                icon: <TbFileAnalytics />,
              },
              { name: "Predict", path: "/predict", icon: <BiStats /> },
            ].map((route, k) => {
              return (
                <li className="" key={k}>
                  {
                    <NavLink
                      to={route.path}
                      className={({ isActive }) =>
                        `${
                          isActive ? "font-semibold  bg-base-200 " : "font-normal"
                        }`
                      }
                    >
                      {route.icon} {route.name}
                    </NavLink>
                  }
                </li>
              );
            })}

          </ul>
        
      </div>
    </div>
  );
};

export default SideBar;
