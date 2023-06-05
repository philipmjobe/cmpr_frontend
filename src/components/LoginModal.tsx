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
        {error && <p>{error}</p>}
        <button className="text-blue-500 hover:text-blue-700 underline" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
