import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import Campgrounds from './components/Campgrounds';
import LeafletMap from './components/LeafletMap';
import { Campground } from './components/types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onModalToggle={handleModalToggle}
      />
      <Campgrounds>
        {(campgrounds: Campground[]) => <LeafletMap campgrounds={campgrounds} />}
      </Campgrounds>
      {isModalOpen && <LoginModal onLogin={handleLogin} onClose={handleModalToggle} setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  );
};

export default App;
