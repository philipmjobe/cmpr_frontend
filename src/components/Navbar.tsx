import React, { useState, SyntheticEvent } from 'react';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Campr</h1>
      <nav>
        {/* <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul> */}
        <button onClick={openModal}>Sign In</button>
      </nav>

      {showModal && <LoginModal closeModal={closeModal} />}
    </div>
  );
};

export default Navbar;
