// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
// import statesData from './assets/us-states';
// import { MapContainer } from 'react-leaflet';
// import { Campground } from './types';

// interface CampgroundProps {
//   campgrounds: Campground[];
// }
// const LeafletMap: React.FC<CampgroundProps> = ({campgrounds}: CampgroundProps) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = L.map('map', {
//       dragging: true,
//       scrollWheelZoom: true,
//       touchZoom: true,
//     }).setView([48.3544091, -99.9980711], 4);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors',
//     }).addTo(map);

//     function style(feature: GeoJSON.Feature): L.PathOptions {
//       return {
//         fillColor: 'grey',
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7,
//       };
//     }

//     function highlightFeature(e: LeafletMouseEvent) {
//       const layer = e.target as L.Path;

//       layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7,
//       });

//       layer.bringToFront();
//     }

//     function resetHighlight(e: LeafletMouseEvent) {
//       geojson.resetStyle(e.target);
//     }

//     let geojson: GeoJSON;

//     function zoomToFeature(e: LeafletMouseEvent) {
//       map.fitBounds(e.target.getBounds());
//     }

//     const myIcon = L.icon({
//       iconUrl: './components/assets/marker.png',
//       iconSize: [38, 95],
//       iconAnchor: [22, 94],
//       popupAnchor: [-3, -76],
//       shadowUrl: 'my-icon-shadow.png',
//       shadowSize: [68, 95],
//       shadowAnchor: [22, 94]
//   });

//     // function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
//     //   layer.on({
//     //     mouseover: highlightFeature,
//     //     mouseout: resetHighlight,
//     //     click: zoomToFeature,
//     //   });
//     //   {campgrounds.map(campground => {
//     //     return <marker campgroundLat={campground.lat}
//     //   })}
//     // }
//     function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
//       layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature,
//       });
    
//       const stateName = feature.properties?.name;
    
//       // Filter campgrounds for the current state
//       const stateCampgrounds = campgrounds.filter(campground => campground.state === stateName);
    
//       stateCampgrounds.forEach(campground => {
//         L.marker([campground.lat, campground.lon], { icon: myIcon }).addTo(map);
//       });
//     }
    

//     geojson = L.geoJson(statesData, {
//       style: style as L.StyleFunction,
//       onEachFeature: onEachFeature,
//     }).addTo(map);

//     // Wait until the map is fully initialized before adding the drag handler
//     map.whenReady(() => {
//       map.dragging.enable();
//     });

//     return () => {
//       map.remove();
//     };
//   }, []);

//   return <MapContainer id='map' ref={mapRef} style={{ height: '100%', width: '100%', cursor: 'grab' }} />;
// };

// export default LeafletMap

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Campground } from './types';
import axios from 'axios';

interface CampgroundProps {
  campgrounds: Campground[];
}
function style(feature: GeoJSON.Feature): L.PathOptions {
  return {
    fillColor: 'grey',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function highlightFeature(e: LeafletMouseEvent) {
  const layer = e.target as L.Path;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  });
  layer.bringToFront();
}

function resetHighlight(e: LeafletMouseEvent) {
  geojson.resetStyle(e.target);
}

let geojson: GeoJSON;

function zoomToFeature(e: LeafletMouseEvent) {
  map.fitBounds(e.target.getBounds().toBBoxString());
}

const myIcon = L.icon({
  iconUrl: './components/assets/marker.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });

  const stateName = feature.properties.name;

  // Filter campgrounds for the current state
  const stateCampgrounds = (campgroundsData as Campground[]).filter(
    (campground: Campground) => campground.state === stateName
  );

  stateCampgrounds.forEach((campground: Campground) => {
    const { lat, lng, campground_name } = campground;
    L.marker([lat, lng], { icon: myIcon })
      .bindPopup(campground_name)
      .addTo(map);
  });
}

export const LeafletMap: React.FC<CampgroundProps> = ({campgrounds}: CampgroundProps) => {
  const mapRef = useRef<any>(null);
  const [campgroundsData, setCampgroundsData] = useState<Campground[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/campgrounds');
        setCampgroundsData(response.data);
      } catch (error) {
        console.log('Error fetching campgrounds:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;


      geojson = L.geoJson(statesData, {
        style: style as L.StyleFunction,
        onEachFeature: onEachFeature,
      }).addTo(map);

      // Wait until the map is fully initialized before adding the drag handler
      map.whenReady(() => {
        map.dragging.enable();
      });

      return () => {
        map.remove();
      };
    }
  }, [campgroundsData]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[37.8, -96]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenReady={(mapInstance: L.Map) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
      }