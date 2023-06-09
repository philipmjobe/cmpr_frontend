import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap';
import Navbar from './components/Navbar';
import Campgrounds from './components/Campgrounds';
import { Campground } from './components/types';
import LoginModal from './components/LoginModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar onModalToggle={handleModalToggle} />
      <Campgrounds>
        {(campgrounds: Campground[]) => <LeafletMap campgrounds={campgrounds} />}
      </Campgrounds>
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
  
};

export default App;
