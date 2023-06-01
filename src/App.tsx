// import React from 'react';
// import LeafletMap from './components/LeafletMap';
// import Campgrounds from './components/Campgrounds';
// import { Campground } from './components/types';

// const App = () => {
//   return (
//     <div style={{ height: '100vh', width: '100vw' }}>
//       <Campgrounds>
//         {(campgrounds: Campground[]) => <LeafletMap campgrounds={campgrounds} />}
//       </Campgrounds>
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import LeafletMap from './components/LeafletMap';
// import Campgrounds from './components/Campgrounds';
// import CampgroundDetails from './components/CampgroundDetails';
// import { Campground } from './components/types';

// const App = () => {
//   return (
//     <div style={{ height: '100vh', width: '100vw' }}>
//       <Router>
//         <Route path="/">
//           <Campgrounds>
//             {(campgrounds: Campground[]) => (
//               <LeafletMap campgrounds={campgrounds} />
//             )}
//           </Campgrounds>
//         </Route>
//         <Route
//           path="/campgrounds/:id"
//           element={<CampgroundDetails campground={CampgroundDetails} />}
//         />
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
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

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LeafletMap campgrounds={campgrounds} />}
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
      </Router>
    </div>
  );
};

export default App;
