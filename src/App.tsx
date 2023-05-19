import React from 'react';
import * as maptilersdk from '@maptiler/sdk';

const apiKey = process.env.REACT_APP_MAPTILER_API_KEY;

const App: React.FC = () => {
  maptilersdk.config.apiKey = apiKey || '';

  React.useEffect(() => {
    const map = new maptilersdk.Map({
      container: 'map', // Change this to 'mapContainer' if you updated the ID in the HTML
      style: maptilersdk.MapStyle.STREETS,
      center: [-99.9980711 ,48.3544091],
      zoom: 3
    });
  }, []);

  return (
    <div id="mapContainer"> {/* Change the ID to 'mapContainer' or use a different ID */}
    </div>
  );
};

export default App;
