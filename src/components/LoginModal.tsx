import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/sessions', { email, password });
      const { jwt, user_id } = response.data;

      // Store JWT token and user ID in local storage or state management

      closeModal();
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', {
        first_name: '', // Add the necessary first name input value here
        last_name: '', // Add the necessary last name input value here
        email,
        password,
        password_confirmation: '', // Add the necessary password confirmation input value here
      });
  
      // Handle the successful sign-up response
      // You can customize this part based on your requirements
      console.log(response.data); // You can access the response data here
  
      closeModal(); // Close the modal or perform any other necessary action
    } catch (error: any) {
      if (error.response) {
        // Request made and server responded with an error status
        console.log(error.response.data); // You can access the error response data here
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  
      setError('Error occurred during sign-up'); // Set an appropriate error message for the user
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      <button className="text-blue-500 hover:text-blue-700 underline" onClick={closeModal}>
        Close
      </button>
    </div>
  );
};

export default Modal;
