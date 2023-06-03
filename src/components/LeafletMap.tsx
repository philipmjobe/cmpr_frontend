import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states';


interface LeafletMapProps {
  campgrounds: Campground[];
}

interface Campground {
  id: number;
  lng: number;
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

const LeafletMap = ({ campgrounds }: LeafletMapProps) => {
  const mapRef = useRef<null | L.Map>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const markersRef = useRef<L.LayerGroup<any> | null>(null);

  useEffect(() => {
    console.log('Inside useEffect');
    const map = L.map('map').setView([48.3544091, -99.9980711], 4);

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


    let geojson: GeoJSON;
    function zoomToFeature(e: LeafletMouseEvent) {
      map.fitBounds(e.target.getBounds());

      // Add campground markers
      const stateName = e.target.feature.properties.name;
      const stateCampgrounds: Campground[] = campgrounds.filter(
        (campground: Campground) => campground.state.trim().toUpperCase() === stateName.trim().toUpperCase(),
        );

        if (markersRef.current) {
          markersRef.current.clearLayers();
        }


      stateCampgrounds.forEach(campground => {
        const customIcon = L.icon({
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/800px-Google_Maps_pin.svg.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          // shadowUrl: 'https://media.istockphoto.com/id/1160934392/vector/thin-out-line-red-pin-location-gps-icon-geometric-marker-flat-shape-element-abstract-eps-10-shadow.jpg?s=612x612&w=0&k=20&c=z-mu6I7iC4aZwMQGOJvE7GHu1_4Zr_-RCdNej2CR6fY=',
          shadowSize: [41, 41],
          shadowAnchor: [13, 41]
        });
        
        const marker = L.marker([campground.lat, campground.lng], { icon: customIcon });
        if (markersRef.current) {
          markersRef.current.addLayer(marker);
        }
        const popupContent = `
          <div>
            <h3>${campground.campground_name}</h3>
            <p>Code: ${campground.campground_code}</p>
            <p>Type: ${campground.campground_type}</p>
            <p>Phone Number: ${campground.phone_number}</p>
            <p>Dates Open: ${campground.dates_open}</p>
            <p>Comments: ${campground.comments}</p>
            <p>Number of Campsites: ${campground.number_of_campsites}</p>
            <p>Elevation: ${campground.elevation}</p>
            <p>Amenities: ${campground.amenities}</p>
            <p>Nearest Town: ${campground.nearest_town}</p>
          </div>
        `;
        if (markersRef.current) {
          marker.addTo(markersRef.current);
        }
        marker.bindPopup(popupContent);
        marker.addTo(map);
      });
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

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [campgrounds]);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100vw' }} />
      {selectedState && (
        <div>
          <h3>Selected State: {selectedState}</h3>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;