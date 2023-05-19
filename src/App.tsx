import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Campground } from './components/types';

const App: React.FC = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

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
    <div style={{ height: '100vh', width: '100vw' }}>
    </div>
  );
};

export default App;
