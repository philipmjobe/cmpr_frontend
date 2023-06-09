import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    const handleEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [onClose]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleModeToggle = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform login/signup logic here
    if (isLoginMode) {
      // Handle login
    } else {
      // Handle signup
    }

    // Reset form fields and close modal
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg p-8 w-96 relative z-10"
        style={{ zIndex: '9999 !important' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form content goes here */}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
