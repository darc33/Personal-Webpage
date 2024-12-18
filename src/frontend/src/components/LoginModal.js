import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isModalOpen, onClose, onForgotPassword }) => {
    const handleOverlayClick = (e) => {
        // Close modal if clicked outside the card
        if (e.target.id === "overlay") onClose();
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    // Form validation
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Make sure the password has at least 6 characters
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the fields
        let emailError = '';
        let passwordError = '';

        if (!validateEmail(email)) {
            emailError = 'Please enter a valid email.';
        }

        if (!validatePassword(password)) {
            passwordError = 'Password must be at least 6 characters long.';
        }

        // If there are errors, update the status and do not submit the form
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        // If the data is valid, clean up the errors
        setErrors({ email: '', password: '' });

        // The form is valid, can send it
        console.log('Formulario válido, enviar datos al backend');
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST', // The request method
                headers: {
                    'Content-Type': 'application/json', // send the body in JSON format
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso:', data);

                // Do something with the response, and save the JWT token
                // localStorage.setItem('token', data.token);
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData.message);
                setErrors({ email: '', password: errorData.message });
            }
        } catch (error) {
            console.error('Error sending login request:', error);
            setErrors({ email: '', password: 'An error occurred, please try again.' });
        }
    };

    return (
        <div id="overlay" className="modal-overlay" onClick={handleOverlayClick} >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    ✕
                </button>
                <div className="modal-content">
                    <div className="login-options">
                        <h3>Sign in with</h3>
                        <button className="social-button google">Google</button>
                        <button className="social-button facebook">Facebook</button>
                    </div>
                    <div className="login-form">
                        <h3>Sign in</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <div className="error">{errors.email}</div>}
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <div className="error">{errors.password}</div>}
                            <a href="#" className="forgot-password" onClick={(e) => {
                                e.preventDefault();
                                onForgotPassword(); // Opens the Forgot Password modal
                            }}>
                                Forgot your password?
                            </a>
                            <button type="submit" className="login-button">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
