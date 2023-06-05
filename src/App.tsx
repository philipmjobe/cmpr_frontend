import React from 'react';
import LeafletMap from './components/LeafletMap';
import Campgrounds from './components/Campgrounds';
import { Campground } from './components/types';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      <Campgrounds>
        {(campgrounds: Campground[]) => <LeafletMap campgrounds={campgrounds} />}
      </Campgrounds>
    </div>
  );
};
export default App;