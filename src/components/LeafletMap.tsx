import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states';
import Legend from './Legend';
import custonPinIcon from './assets/pin-21489.png'

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
  const mapRef = useRef<L.Map | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const markersRef = useRef<L.Marker<any>[]>([]);

  useEffect(() => {
    const map = L.map('map').setView([48.3544091, -99.9980711], 4, {});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 7,
    }).addTo(map);

    map.on('dblclick', handleDoubleClick);

    function createPopupContent(campground: Campground) {
      const isCheckboxChecked = localStorage.getItem(campground.id.toString()) === 'true';

      return `
        <div>
          <h3>${campground.campground_name}</h3>
          ${campground.campground_code ? `<p>Code: ${campground.campground_code}</p>` : ''}
          ${campground.campground_type ? `<p>Type: ${campground.campground_type}</p>` : ''}
          ${campground.phone_number ? `<p>Phone Number: ${campground.phone_number}</p>` : ''}
          ${campground.dates_open ? `<p>Dates Open: ${campground.dates_open}</p>` : ''}
          ${campground.comments ? `<p>Comments: ${campground.comments}</p>` : ''}
          ${campground.number_of_campsites ? `<p>Number of Campsites: ${campground.number_of_campsites}</p>` : ''}
          ${campground.elevation ? `<p>Elevation: ${campground.elevation}</p>` : ''}
          ${campground.amenities ? `<p>Amenities: ${campground.amenities}</p>` : ''}
          ${campground.nearest_town ? `<p>Nearest Town: ${campground.nearest_town}</p>` : ''}
          <label>
            <input type="checkbox" id="checkbox-${campground.id}" ${isCheckboxChecked ? 'checked' : ''} />
            Remember this campground
          </label>
        </div>
      `;
    }

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

      // Remove markers of previously selected state
      markersRef.current.forEach((marker) => {
        map.removeLayer(marker);
      });

      const stateName = e.target.feature.properties.name;
      const stateCampgrounds: Campground[] = campgrounds.filter(
        (campground: Campground) =>
          campground.state.trim().toUpperCase() === stateName.trim().toUpperCase()
      );

      stateCampgrounds.forEach((campground) => {
        const customIcon = L.icon({
          iconUrl: custonPinIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowAnchor: [13, 41]
        });

        const marker = L.marker([campground.lat, campground.lng], { icon: customIcon });
        markersRef.current.push(marker);
        marker.addTo(map);

        const popupContent = createPopupContent(campground);
        const checkboxId = `checkbox-${campground.id}`;

        marker.bindPopup(popupContent, {
          minWidth: 300,
          maxWidth: 400,
          closeButton: false,
        });

        marker.on('popupopen', () => {
          const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
          checkbox.addEventListener('change', () => {
            localStorage.setItem(campground.id.toString(), checkbox.checked.toString());
          });
        });
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
      map.off('dblclick', handleDoubleClick);
    };
  }, [campgrounds]);

  const handleDoubleClick = () => {
    const map = mapRef.current;
    const markers = markersRef.current;

    if (map && markers) {
      // Check if the current zoom level is greater than the initial zoom level
      // If it is, zoom out to the initial zoom level
      if (map.getZoom() > 4) {
        map.setView([48.3544091, -99.9980711], 4);
      } else {
        // If the zoom level is already at the initial zoom level, remove the markers
        markersRef.current.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100vw' }} />
      {selectedState && (
        <div>
          <h3>Selected State: {selectedState}</h3>
        </div>
      )}
      <Legend />
    </div>
  );
};

export default LeafletMap;
