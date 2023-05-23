import React from 'react';
import LeafletMap from './components/LeafletMap';
import Campgrounds from './components/Campgrounds';

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Campgrounds>
        {campgrounds => <LeafletMap campgrounds={campgrounds} />}
      </Campgrounds>
    </div>
  );
};

export default App;
