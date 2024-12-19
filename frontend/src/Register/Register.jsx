import React, { useRef, useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  // Debounce values
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPassword = useDebounce(password, 500);
  const debouncedConfirmPassword = useDebounce(confirmpassword, 500);

  // Check for any errors
  useEffect(() => {
    setHasErrors(!!(emailError || passwordError || confirmPasswordError));
  }, [emailError, passwordError, confirmPasswordError]);

  // Email validation
  useEffect(() => {
    if (debouncedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(debouncedEmail)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  }, [debouncedEmail]);

  // Password validation
  useEffect(() => {
    if (debouncedPassword) {
      if (debouncedPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }
  }, [debouncedPassword]);

  // Confirm password validation
  useEffect(() => {
    if (debouncedConfirmPassword) {
      if (debouncedConfirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    } else {
      setConfirmPasswordError('');
    }
  }, [debouncedConfirmPassword, password]);

  const handleOnChange = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'confirmpassword':
        setconfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (hasErrors || !email || !password || !confirmpassword || !firstName) {
      return;
    }
    
    setStatus('loading');

    try {
      const response = await axios.post('http://localhost/register', {
        name: firstName,
        email: email,
        password: password,
        conf_pass: confirmpassword
      });

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('An error occurred while sending the request.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Please fill in your details</p>
        </div>
        
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group2">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => handleOnChange(e, 'email')}
              placeholder="Email"
              required
              className="form-input2"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group2">
            <input
              ref={fNameRef}
              type="text"
              value={firstName}
              onChange={(e) => handleOnChange(e, 'firstName')}
              placeholder="Name"
              required
              className="form-input2"
            />
          </div>

          <div className="form-group2">
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => handleOnChange(e, 'password')}
              placeholder="Password"
              required
              className="form-input2"
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <div className="form-group2">
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => handleOnChange(e, 'confirmpassword')}
              placeholder="Confirm Password"
              required
              className="form-input2"
            />
            {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={hasErrors || !email || !password || !confirmpassword || !firstName || status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="loading-spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="login-prompt2">
          <p>Already have an account? <Link to="/" className="login-link2">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
