import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Campground } from './types'; // Import Campground type

// Define custom icon for marker
const customIcon = L.icon({
  iconUrl: require('./assets/marker.png'),
  iconSize: [25, 41],
  iconAnchor: [13, 41],
  popupAnchor: [0, -41]
});

interface MapProps {
  campgrounds: Campground[]; // Define prop type for campgrounds
}

const Map: React.FC<MapProps> = ({ campgrounds }) => {
  type MC = typeof MapContainer; const mapRef = useRef<MC | null>(null);

  useEffect(() => {
    // Fly to the bounds of the campground with animation
    const bounds = L.latLngBounds(
      campgrounds.map(campground => [
        campground.lat,
        campground.lon
      ])
    );
    (mapRef.current as any).leafletElement.fitBounds(bounds, { // Use leafletElement to access map instance
      animate: true,
      duration: 1
    });
  }, [campgrounds]);

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
      whenReady={() => {
        mapRef.current = mapRef.current;
      }} // Store map instance in useRef
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {campgrounds.map(campground => (
        <Marker
          key={campground.id}
          position={[campground.lat, campground.lon]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h3>{campground.campground_name}</h3>
              <p>{campground.phone_number}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

