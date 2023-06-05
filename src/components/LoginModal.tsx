import React, { useState } from 'react';

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal = ({ closeModal }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Handle login logic
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Handle signup logic
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      {/* Modal content */}
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleSignup}>
        {/* Signup form fields */}
        {/* Error message display */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Close modal button */}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default LoginModal;
