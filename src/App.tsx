import React, { useState, useEffect } from "react";
import LeafletMap from "./components/LeafletMap";
import axios from "axios";

const App = () => {
  // Define campground data
  const [campgrounds, setCampgrounds] = useState([]);

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
    <div id="map">
      {/* Render Map component */}
      <LeafletMap />
    </div>
  );
};

export default App;
