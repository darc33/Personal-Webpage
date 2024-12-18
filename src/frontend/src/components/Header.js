import React, { useState } from "react";
import "./Header.css";
import GlitchText from './GlitchText';
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);  // For the sign-up
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
    setIsLoginModalOpen(false); // Cierra el modal de Login cuando abres el de Forgot Password
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  return (
    <div className="header-container">
      <header className="home-header">
        <div className='header-logo'>
          <img src='/logo512.png' alt="Logo"></img>
        </div>
        <div className='header-title-container'>
          <h1 className="header-title"><GlitchText text={"DARC"} /></h1>
        </div>


        <div className="header-buttons">
          <button onClick={openLoginModal} className="btn btn-login">Log In</button>
          {isLoginModalOpen && <LoginModal
            isModalOpen={isLoginModalOpen}
            onClose={closeLoginModal}
            onForgotPassword={openForgotPasswordModal}
          />}
          {isForgotPasswordModalOpen && (
            <ForgotPasswordModal
              isModalOpen={isForgotPasswordModalOpen}
              onClose={closeForgotPasswordModal}
            />
          )}
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