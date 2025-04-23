import React from 'react'
import "./App.css"
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Home from './views/home.js';
import Visit from './views/schedule-visit.js';
import Scholarship from './views/scholar-info.js';
import Programs from './views/search-programs.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
     <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/visit" element={<Visit/>}/>
        <Route exact path="/scholarship" element={<Scholarship/>}/>
        <Route exact path="/programs" element={<Programs/>}/>
        </Routes>
        <Footer />
      </Router>
      </div>
    );
}

export default App;
