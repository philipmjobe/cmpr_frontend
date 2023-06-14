import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../index.css';

interface LoginModalProps {
  onLogin: () => void;
  onClose: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }

  useEffect(() => {
    // Check if user is already logged in
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      setIsLoggedIn(true);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleModeToggle = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleLogout = () => {
    // Perform the sign-out logic
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make the API call based on the login mode
    if (isLoginMode) {
      // Make login API call
      try {
        const response = await fetch('http://localhost:3000/sessions', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        onLogin();
        onClose();

        // Handle the response
        if (response.ok) {
          // Login successful
          console.log('Login successful');
          setIsLoggedIn(true); // Set the login state to true
        } else {
          // Login failed
          console.error('Login failed');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    } else {
      // Make signup API call
      if (password !== passwordConfirmation) {
        console.error('Password and password confirmation do not match');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        onLogin();
        onClose();

        // Handle the response
        if (response.ok) {
          // Signup successful
          console.log('Signup successful');
          setIsLoggedIn(true); // Set the login state to true
        } else {
          // Signup failed
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('An error occurred during signup:', error);
      }
    }
  };

  return (
    <div className="modal-container">
      <div className="inset-0 flex items-center justify-center">
        <div
          className="bg-white rounded-lg p-8 w-96 relative z-10"
          style={{ zIndex: '9999 !important' }}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <>
                <div className="form-group">
                  <div className="flex flex-col">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} required />
                  </div>
                </div>
              </>
            )}
            <div className="form-group">
              <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} required />
              </div>
            </div>
            <div className="form-group">
              <div className="flex flex-col">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
              </div>
            </div>
            {!isLoginMode && (
              <div className="form-group">
                <div className="flex flex-col">
                  <label htmlFor="passwordConfirmation">Password Confirmation:</label>
                  <input
                    type="password"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                    required
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center mb-4">
              <button type="submit" className="px-4 py-2 rounded-lg mr-2 button-login">
                {isLoginMode ? 'Log In' : 'Sign Up'}
              </button>
              <button type="button" className="px-4 rounded-lg button-signup" onClick={handleModeToggle}>
                {isLoginMode ? 'Sign Up' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;