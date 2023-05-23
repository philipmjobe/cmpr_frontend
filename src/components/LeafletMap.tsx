import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
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
        (campground: Campground) => campground.state.trim().toUpperCase() === stateName.trim().toUpperCase()
        );

      stateCampgrounds.forEach(campground => {
        L.marker([campground.lat, campground.lng]).addTo(map);
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

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default LeafletMap;
