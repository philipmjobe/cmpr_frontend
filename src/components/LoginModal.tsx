import React, { useState, useEffect } from 'react';
import '../index.css'

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const handleEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
  
    const handleMouseDown = (e: MouseEvent) => {
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer && !modalContainer.contains(e.target as Node)) {
        onClose();
      }
    };
  
    document.addEventListener('keydown', handleEscapeKeyPress);
    document.addEventListener('mousedown', handleMouseDown);
  
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);
  

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

  const handleModeToggle = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const firstNameInput = target.elements.namedItem('firstName') as HTMLInputElement;
    const lastNameInput = target.elements.namedItem('lastName') as HTMLInputElement;
    const emailInput = target.elements.namedItem('email') as HTMLInputElement;
    const passwordInput = target.elements.namedItem('password') as HTMLInputElement;
    const passwordConfirmationInput = target.elements.namedItem('passwordConfirmation') as HTMLInputElement;

    const firstName = firstNameInput?.value;
    const lastName = lastNameInput?.value;
    const email = emailInput?.value;
    const password = passwordInput?.value;
    const passwordConfirmation = passwordConfirmationInput?.value;

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
  
        // Handle the response
        if (response.ok) {
          // Login successful
          console.log('Login successful');
        } else {
          // Login failed
          console.error('Login failed');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    } else {
      // Make signup API call
      try {
        const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password, password_confirmation: passwordConfirmation }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

  
        // Handle the response
        if (response.ok) {
          // Signup successful
          console.log('Signup successful');
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg p-8 w-96 relative z-10"
            style={{ zIndex: '9999 !important' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <div className="flex flex-col">
                  <label htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {!isLoginMode && (
                <>
                  <div className='form-group'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                      type='text'
                      id='firstName'
                      value={firstName}
                      onChange={handleFirstNameChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                      type='text'
                      id='lastName'
                      value={lastName}
                      onChange={handleLastNameChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg mr-2 button-login"
                >
                  {isLoginMode ? 'Log In' : 'Sign Up'}
                </button>
                <button
                  type="button"
                  className="px-4 rounded-lg button-signup"
                  onClick={handleModeToggle}
                >
                  {isLoginMode ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    
  }

export default LoginModal;