import React, { useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import bgImg from "../../assets/images/landing-page-image.png";
import { FcCellPhone } from "react-icons/fc"
import "./home.css";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const handleMessage = () => {

  }
  return (
    <div>
      <NavBar />
      <div className="hero-section" id="hero">
        <div
          className="hero min-h-screen"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-xxl">
              <h1 className="mb-5 text-5xl font-bold">
                Stay Ahead of the Competition with Our Advanced Churn Prediction
                Technology
              </h1>
              <p className="mb-5 text-3xl">
                Unlock the Power of Customer Data with Our Machine Learning
                Algorithms
              </p>
              <Link to={"/auth"}>
                <button className="btn btn-primary text-xl">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="about">
        <div className="heading">
          <h1 className="text-3xl">
            About our customer churn prediction webapp
          </h1>
        </div>
        <div className="cards">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                Our customer churn prediction webapp is a machine learning model
                that is trained to predict the likelihood of a customer leaving
                a company
              </p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                Our webapp is built with the latest technologies, including
                React and Python, to provide a seamless and intuitive user
                experience
              </p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                Our team of experts is dedicated to constantly improving our
                model and providing the best possible service to our clients
              </p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                By inputting customer information, our model can provide
                valuable insights to help retain customers
              </p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg">
                This can ultimately lead to improved customer satisfaction and
                increased revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="services">
        <div className="service-heading text-2xl">Our Services</div>
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
          <div className="box w-full">Churn Prediction Model Development</div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">❮</a> 
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div> 
          <div id="slide2" className="carousel-item relative w-full">
          <div className="box w-full">Customer Segmentation Analysis</div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">❮</a> 
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div> 
          <div id="slide3" className="carousel-item relative w-full">
          <div className="box w-full">Customer Feedback Analysis</div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">❮</a> 
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div> 
          <div id="slide4" className="carousel-item relative w-full">
          <div className="box w-full">Dashboard and Reporting</div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a> 
              <a href="#slide5" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
          <div className="box w-full">Integration and Support</div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">❮</a> 
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>

      <div className="contacts" id="contact">
      <div className="card w-256 bg-base-100 shadow-xl contacts-card">
        <div className="card-body">
          <div className="contact-heading">
            <h2 className="card-title title-gap text-3xl contact-heading">Get In Touch</h2>
          </div>
          <div className="contact-inputs">
            <input type="text" placeholder="Enter your name" className="input input-bordered input-primary w-full max-w-3xl" />
            <input type="email" placeholder="Enter your email" className="input input-bordered input-primary w-full max-w-3xl gap-between" />
            <input type="text" placeholder="Your message" className="input input-bordered input-primary w-full max-w-3xl" />
          </div>

          <div className="card-actions justify-center button-gap">
            <button className="btn btn-primary" onClick={() => handleMessage()}>Submit Message</button>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
