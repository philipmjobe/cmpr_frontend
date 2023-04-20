// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
// import statesData from './assets/us-states';
// import { MapContainer } from 'react-leaflet';
// import { Campground } from './types';

// interface CampgroundProps {
//   campgrounds: Campground[];
// }
// export const LeafletMap: React.FC<CampgroundProps> = ({campgrounds}: CampgroundProps) => {
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

//     function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
//       layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature,
//       });
//       {campgrounds.map(campground => {
//         return <marker campgroundLat={campground.lat}
//       })}
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

// // export default LeafletMap;

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent, LatLngExpression, Marker, Popup } from 'leaflet';
import statesData from './assets/us-states';
import campgroundsData from './assets/campgrounds.json';
import { MapContainer } from 'react-leaflet';

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
  state: string;
  nearest_town: string;
}

const LeafletMap = () => {
  const mapRef = useRef(null);
  const [activeState, setActiveState] = React.useState<string | null>(null);
  const [campgrounds, setCampgrounds] = React.useState<Campground[]>([]);
  const [markers, setMarkers] = React.useState<JSX.Element[]>([]);
  useEffect(() => {
    const map = L.map('map', {
      dragging: true,
      scrollWheelZoom: true
    }).setView([48.3544091, -99.9980711], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    function style(feature: GeoJSON.Feature): L.PathOptions {
      return {
        fillColor: 'black',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }
    let geojson: GeoJSON;

    function highlightFeature(e: LeafletMouseEvent) {
      const layer = e.target as L.Path;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      layer.bringToFront();
    }

    function resetHighlight(e: LeafletMouseEvent) {
      geojson.resetStyle(e.target);
    }

    function zoomToFeature(e: LeafletMouseEvent) {
      map.fitBounds(e.target.getBounds());
      setActiveState(e.target.feature.properties.name);
    }

    function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    geojson = L.geoJson(statesData, {
      style: style as L.StyleFunction,
      onEachFeature: onEachFeature
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (activeState) {
      const filteredCampgrounds = campgroundsData.filter((campground) => campground.state === activeState);
      const newMarkers = filteredCampgrounds.map((campground) => {
        const position: LatLngExpression = [campground.lat, campground.lon];
        return (
          <Marker key={campground.id} position={position}>
            <Popup>{campground.campground_name}</Popup>
          </Marker>
        );
      });
      setMarkers(newMarkers);
    }
  }, [activeState]);

  React.useEffect(() => {
    markers.forEach((marker) => {
      marker.addTo(map);
    });
    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [campgrounds, map, markers]);

  const handleMapLoad = (map: L.Map) => {
    setMap(map);
  };

  return (
    <div className='App'>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        style={{ height: '500px', width: '100%' }}
        whenCreated={handleMapLoad}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {markers}
      </MapContainer>
      {error && <p className='error'>{error}</p>}
    </div>
  );
}






