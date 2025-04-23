import React from "react";
import {Link} from "react-router-dom";
import '../styles/home.css';


function Home() {
    return (
      <div className="home">
      <div className="imageBackground"></div>
      <div className="diagonalOverlay">
        <div className="textBox">
          <h1>Welcome to Recruitment Buddy!</h1>
          <p>
            Explore university programs, schedule visits, check scholarships, and connect with faculty — all in one place.
          </p>
          <Link to="/programs">
            <button className="getStartedBtn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
    )
  }
  
  export default Home;