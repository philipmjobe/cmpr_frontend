import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { State, Campground } from './interfaces';

interface Props {
  states: State[];
  campgrounds: Campground[];
  setSelectedState: (state: State | null) => void;
}

const Map: React.FC<Props> = ({ states, campgrounds, setSelectedState }) => {
  const mapRef = useRef<MapContainer>(null);

  return (
    <div>
      <MapContainer
        center={[37.09, -95.71]} // Update with actual center coordinates
        zoom={5} // Update with actual initial zoom level
        style={{ height: '100vh', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Render Markers and Popups based on campgrounds data */}
        {campgrounds.map((campground) => (
          <Marker key={campground.id} position={[campground.lat, campground.lon]}>
            <Popup>
              <div>
                <h3>{campground.name}</h3>
                <p>Location: {campground.location}</p>
                {/* Render additional data from campground interface */}
                {/* You can access campground properties like campground.propertyName */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;


// // Map.tsx

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import  Campground  from './Campgrounds'
// import 'leaflet/dist/leaflet.css';

// interface State {
//   id: number;
//   name: string;
//   lat: number;
//   lon: number;
// }

// interface Props {
//   states: State[];
//   campgrounds: Campground[];
//   setSelectedState: (state: State | null) => void; // Update selected state in parent component
// }

// const Map: React.FC<Props> = ({ states, campgrounds, setSelectedState }) => {
//   const handleStateClick = (state: State) => {
//     setSelectedState(state); // Update selected state in parent component
//   };

//   return (
//     <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100vh', width: '100%' }}>
//       {/* Render state markers */}
//       {states.map((state) => (
//         <Marker key={state.id} position={[state.lat, state.lon]} onClick={() => handleStateClick(state)}>
//           <Popup>{state.name}</Popup>
//         </Marker>
//       ))}
//       {/* Render campground markers */}
//       {campgrounds.map((campground) => (
//         <Marker key={campground.id} position={[campground.lat, campground.lon]}>
//           <Popup>
//             <div>
//               <h3>{campground.campground_name}</h3>
//               {/* Render other campground data */}
//               <p>Phone Number: {campground.phone_number}</p>
//               <p>Number of Campsites: {campground.number_of_campsites}</p>
//               {/* Render other campground data */}
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//       <TileLayer
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         attribution='&copy; OpenStreetMap contributors'
//       />
//     </MapContainer>
//   );
// };

// export default Map;
