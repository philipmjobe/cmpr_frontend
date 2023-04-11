// import React from 'react';
// // import "./App.css"
// // import Campgrounds from "./components/campgrounds"
// import Map from "./components/Map"


// function App() {
//   return (
//     <div className="App">
//      {/* <Campgrounds /> */}
//      <Map />
//     </div>
//   );
// }

// export default App;

// App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';

interface Campground {
  id: number;
  lon: number;
  lat: number;
  gps_composite_field: string;
  campground_code: string;
  campground_name: string;
  campground_type: string;
  phone_number: string;
  dates_open: string;
  comments: string;
  number_of_campsites: number;
  elevation: string;
  amenities: string;
  state: string; // Add new property for state information
  nearest_town: string;
}

interface State {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

const defaultCampgrounds: Campground[] = [];
const defaultStates: State[] = [];

const App = () => {
  const [campgrounds, setCampgrounds] = useState(defaultCampgrounds);
  const [states, setStates] = useState(defaultStates);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  useEffect(() => {
    // Fetch campgrounds and states data
    const fetchData = async () => {
      try {
        const campgroundsResponse = await axios.get('https://api.nps.gov/api/v1/campgrounds');
        setCampgrounds(campgroundsResponse.data.data);

        const statesResponse = await axios.get('https://api.nps.gov/api/v1/states');
        setStates(statesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render Map component and pass in campgrounds, states, and setSelectedState */}
      <Map campgrounds={campgrounds} states={states} setSelectedState={setSelectedState} />
    </div>
  );
};

export default App;
