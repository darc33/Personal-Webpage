import React, { useState } from "react";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ isModalOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    // Email validation
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    // The form is valid, can send it
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/users/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'A recovery email has been sent!');
        console.log("Email enviado para recuperar la contraseña:", email);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      {isModalOpen && (
        <div className="forgot-overlay" onClick={onClose}>
          <div
            className="forgot-modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
          >
              <button className="forgot-close-btn" onClick={onClose}>X</button>
            
            <div className="forgot-modal-body">
              <h2>Forgot Your Password?</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your email</label>
                <input
                  type="email"
                  id="forgot-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <button type="submit" className="forgot-btn-submit">Get New Password</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
