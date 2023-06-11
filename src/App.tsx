import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap';
import Navbar from './components/Navbar';
import Campgrounds from './components/Campgrounds';
import { Campground } from './components/types';
import LoginModal from './components/LoginModal';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUserName(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        onModalToggle={handleModalToggle}
      />
      <Campgrounds>
        {(campgrounds: Campground[]) => <LeafletMap campgrounds={campgrounds} />}
      </Campgrounds>
      {isModalOpen && <LoginModal onClose={handleModalToggle} />}
    </div>
  );
};

export default App;
