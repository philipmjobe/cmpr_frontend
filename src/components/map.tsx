// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl, {Marker} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import campgrounds from "./campgrounds"

// mapboxgl.accessToken = 'pk.eyJ1IjoicGhpbGlwam9iZSIsImEiOiJjbGZ3dWhsdXcwYmJ0M2VxY2tyZjgzc3lkIn0.8BkhvRQElOx7NXiGvRBA-A';

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-99.9980711);
//   const [lat, setLat] = useState(48.3544091);
//   const [zoom, setZoom] = useState(4);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   const marker = new mapboxgl.Marker({
//     color: "#ff0000"
//   }).setLngLat([campgrounds.lon, campgrounds.lat])

//   marker.addTo(map);
  

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl, { Marker } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import campgrounds from "./campgrounds"

// mapboxgl.accessToken = 'pk.eyJ1IjoicGhpbGlwam9iZSIsImEiOiJjbGZ3dWhsdXcwYmJ0M2VxY2tyZjgzc3lkIn0.8BkhvRQElOx7NXiGvRBA-A';

// export default function App() {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-99.9980711);
//   const [lat, setLat] = useState(48.3544091);
//   const [zoom, setZoom] = useState(4);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     const marker = new mapboxgl.Marker({
//       color: "#ff0000"
//     }).setLngLat([campgrounds[0].lon, campgrounds[0].lat]).addTo(map.current);

//     return () => {
//       marker.remove();
//     }
//   }, [map, campgrounds]);

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoicGhpbGlwam9iZSIsImEiOiJjbGZ3dWhsdXcwYmJ0M2VxY2tyZjgzc3lkIn0.8BkhvRQElOx7NXiGvRBA-A';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-99.9980711);
  const [lat, setLat] = useState(48.3544091);
  const [zoom, setZoom] = useState(4);
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    axios.get("http://localhost:3000/campgrounds")
      .then(response => {
        setCampgrounds(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    campgrounds.map((campground) => {
      const marker = new mapboxgl.Marker({
        color: "#ff0000"
      }).setLngLat([campground.lon, campground.lat])
      marker.addTo(map.current);
    });
  }, [campgrounds]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
