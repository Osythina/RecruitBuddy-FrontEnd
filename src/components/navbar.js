import React from 'react'
import {NavLink} from "react-router-dom";
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
        <div className="leftSide">
        <h1>Recruitment Buddy!</h1>
        </div>
        <div className="rightSide">
          <NavLink 
            reloadDocument to="/" 
            className={({ isActive }) => isActive ? "active-link" : "inactive-link"}
          > 
            Home 
          </NavLink>
          <NavLink 
            reloadDocument to="/programs"
            className={({ isActive }) => isActive ? "active-link" : "inactive-link"}
          > 
            Search Programs 
          </NavLink>
          <NavLink 
            reloadDocument to="/scholarship"
            className={({ isActive }) => isActive ? "active-link" : "inactive-link"}
          > 
            Scholarship Information 
          </NavLink>
          <NavLink 
            reloadDocument to="/visit"
            className={({ isActive }) => isActive ? "active-link" : "inactive-link"}
          > 
            Schedule a Visit 
          </NavLink>
        </div>
    </div>
  );
}