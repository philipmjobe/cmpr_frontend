import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; 
import Marker from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGhpbGlwam9iZSIsImEiOiJjbGZ3dWhsdXcwYmJ0M2VxY2tyZjgzc3lkIn0.8BkhvRQElOx7NXiGvRBA-A';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-99.9980711);
  const [lat, setLat] = useState(48.3544091);
  const [zoom, setZoom] = useState(4);

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

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" 
      />
      <Marker longitude={-100} latitude={40} anchor="bottom" >
      {/* <img src="./pin.png" /> */}
    </Marker>
    </div>
  );
}
