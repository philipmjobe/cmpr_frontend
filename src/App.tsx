import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from "axios";

const App = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/campgrounds");
        setCampgrounds(response.data);
      } catch (error) {
        console.error("Failed to fetch campgrounds:", error);
      }
    };

    fetchCampgrounds();
  }, []);

  return (
    <div id="map" style={{ height: '100vh' }}>
      <MapContainer
        center={[48.3544091, -99.9980711]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='© OpenStreetMap contributors'
        />
        
        {campgrounds.map((campground: any) => (
          <Marker position={[campground.lat, campground.lng]} key={campground.id} />
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
