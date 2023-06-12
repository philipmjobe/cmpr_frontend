import React, { useState } from 'react';
import axios from 'axios';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onModalToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout, onModalToggle }) => {
  const handleLogout = () => {
    // Perform the sign-out logic
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
    onLogout(); // Call the onLogout callback from the parent component
  };

  return (
    <nav className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-semibold text-lg">Campr</span>
          </div>
          <div className="flex">
            {isLoggedIn ? (
              <>
                <div className="text-white mr-4">Welcome To Campr!</div>
                <div>
                  <button type="button" className="px-4 rounded-lg button-signup button-signout" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div>
                <button
                  onClick={onModalToggle}
                  className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
