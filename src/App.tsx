<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Campground } from './components/types';
import LeafletMap from './components/LeafletMap';

const App: React.FC = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
=======
import React, { useState, useEffect } from "react";
import LeafletMap from "./components/LeafletMap";
import axios from "axios";

const App = () => {
  // Define campground data
  const [campgrounds, setCampgrounds] = useState([]);
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)

  // Fetch campground data from backend on component mount
  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/campgrounds");
        setCampgrounds(response.data); // assuming response.data is an array of campground objects
      } catch (error) {
        console.error("Failed to fetch campgrounds:", error);
      }
    };
    fetchCampgrounds();
  }, []);

  return (
<<<<<<< HEAD
        <div style={{ height: '100vh', width: '100vw' }}>
      <LeafletMap campgrounds={campgrounds} />
=======
    <div id="map">
      {/* Render Map component */}
      <LeafletMap campgrounds={campgrounds}/>
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
    </div>
  );
};

export default App; 