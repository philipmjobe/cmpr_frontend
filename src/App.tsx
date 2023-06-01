import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import NavigationContext from './components/NavigationContext';
import LeafletMap from './components/LeafletMap';
import CampgroundDetails from './components/CampgroundDetails';
import Campgrounds from './components/Campgrounds';
import { Campground } from './components/interfaces';

interface CampgroundDetailsWrapperProps {
  campgrounds: Campground[];
}

const CampgroundDetailsWrapper: React.FC<CampgroundDetailsWrapperProps> = ({ campgrounds }) => {
  const { id } = useParams();

  const selectedCampground = campgrounds.find(campground => campground.id === Number(id));

  if (!selectedCampground) {
    return <div>Selected campground not found.</div>;
  }

  return <CampgroundDetails campground={selectedCampground} />;
};

const App: React.FC = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const basename = '/';

  
  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await fetch('http://localhost:3000/campgrounds');
        const data = await response.json();
        setCampgrounds(data);
      } catch (error) {
        console.error('Error fetching campgrounds:', error);
      }
    };

    fetchCampgrounds();
  }, []);

  const handleCampgroundClick = (id: number) => {
    // Handle the campground click event
    console.log('Campground clicked:', id);
  };

  return (
    <div className="App">
      <NavigationContext.Provider value={{ basename }}>
      <Routes>
        <Route
          path="/"
          element={<LeafletMap campgrounds={campgrounds} onCampgroundClick={handleCampgroundClick} />}
        />
        <Route
          path="/campgrounds/:id"
          element={
            <Campgrounds>
              {(campgrounds: Campground[]) => (
                <CampgroundDetailsWrapper campgrounds={campgrounds} />
              )}
            </Campgrounds>
          }
        />
      </Routes>
      </NavigationContext.Provider>
    </div>
  );
};

export default App;
