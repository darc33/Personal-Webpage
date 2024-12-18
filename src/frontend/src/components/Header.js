import React, { useState } from "react";
import "./Header.css";
import GlitchText from './GlitchText';
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function Header(){
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);  // For the sign-up
    return(
        <div className="header-container">
        <header className="home-header">
        <div className='header-logo'>
          <img src='/logo512.png' alt="Logo"></img>
        </div>
        <div className='header-title-container'>
          <h1 className="header-title"><GlitchText text={"DARC"} /></h1>
        </div>
        
        
        <div className="header-buttons">
          <button onClick={() => setModalOpen(true)} className="btn btn-login">Log In</button>
          {isModalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
          <button onClick={() => setIsSignUpModalOpen(true)} className="btn btn-register">Register</button>
          {isSignUpModalOpen && <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />}
        </div>        
      </header>

      <div className="subheader">
        <ul>
        <li><a href="/">Home</a></li>
                <li><a href="/engineer">Engineer</a></li>
                <li><a href="/digital-animator">Digital Animator</a></li>
                <li><a href="/gamer">Gamer</a></li>
                <li><a href="/writer-reader">Writer/Reader</a></li>
                <li><a href="/travel">Travel</a></li>
        </ul>

      </div>
      </div>
    )
}

export default Header