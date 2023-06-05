import React, { useState } from 'react';
import Modal from './LoginModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-semibold text-lg">Campr</span>
          </div>
          <div className="flex">
            <button onClick={handleModalOpen} className="text-white hover:text-gray-200">
              Login
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={handleModalClose} />}
    </nav>
  );
};

export default Navbar;
