import React from 'react';

interface NavbarProps {
  onModalToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onModalToggle }) => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-semibold text-lg">Campr</span>
          </div>
          <div className="flex">
            <button
              onClick={onModalToggle}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Open Modal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
