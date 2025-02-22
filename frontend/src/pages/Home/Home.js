import React from "react";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/Inventory.jpg";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <TbCircleLetterGFilled size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Arjuna Inventory App</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
            by the way do you wanna know arjun? if yes then click the button below :)
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="https://6579690a14fe616be8e830e6--tiny-cassata-9c6953.netlify.app/">Arjun</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="23K" text="Active Users" />
            {/* <NumberText num="500+" text="Partners" /> */}
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
