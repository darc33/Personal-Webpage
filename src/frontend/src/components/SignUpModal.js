import React, { useState } from 'react';
import "./SignUpModal.css"
//import { GoogleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';

const SignUpModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  // Form validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 6;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthValid && uppercaseValid && lowercaseValid && numberValid && symbolValid;
  };

  // Función para comprobar los requisitos de la contraseña
  const checkPasswordRequirements = (password) => {
    const lengthValid = password.length >= 6;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordRequirements({
      length: lengthValid,
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      number: numberValid,
      symbol: symbolValid,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the fields
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (!name) {
      nameError = 'Please enter your name.';
    }

    if (!validateEmail(email)) {
      emailError = 'Please enter a valid email.';
    }

    if (!validatePassword(password)) {
      passwordError = 'Please follow the password requirements';
    }

    // If there are errors, update the status and do not submit the form
    if (nameError || emailError || passwordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError });
      return;
    }

    // If the data is valid, clean up the errors
    setErrors({ name: '', email: '', password: '' });

    // The form is valid, can send it
    console.log('Registro válido, enviar datos al backend');
  };
/*
  // handling google answers
  const responseGoogle = (response) => {
    console.log(response);
    // handle google response
  };

  // Handling Facebook responses
  const responseFacebook = (response) => {
    console.log(response);
    // handle facebook response
  };*/

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sign-up-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          <div className="sign-up-options">
            <h3>Sign Up with</h3>
            <button className="social-button google">Google</button>
            <button className="social-button facebook">Facebook</button>
            {/*<GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"  
              buttonText="Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="social-button google"
            />
            <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID" 
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
              cssClass="social-button facebook"
            />*/}
          </div>
          <div className="sign-up-form">
            <h3>Create Account</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input-field"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="error">{errors.name}</div>}

              <input
                type="email"
                className="input-field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);
                    checkPasswordRequirements(e.target.value); // Comprobamos los requisitos mientras escriben
                  }}  
              />
              {errors.password && <div className="error">{errors.password}</div>}
              <div className="password-validation-info">
                <span className="info-text">?</span>
                <span className="info-text">Password validation requirements</span>
                <div className="password-tooltip">
                 <ul>
                   <li className={passwordRequirements.length ? "valid" : ""}>At least 6 characters</li>
                   <li className={passwordRequirements.uppercase ? "valid" : ""}>At least 1 uppercase letter</li>
                   <li className={passwordRequirements.lowercase ? "valid" : ""}>At least 1 lowercase letter</li>
                   <li className={passwordRequirements.number ? "valid" : ""}>At least 1 number</li>
                   <li className={passwordRequirements.symbol ? "valid" : ""}>At least 1 symbol</li>
                 </ul>
                </div>
              </div>
              <button type="submit" className="sign-up-button">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
