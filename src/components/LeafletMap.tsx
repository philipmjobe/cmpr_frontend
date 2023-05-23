import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states'
import { MapContainer } from 'react-leaflet';

  const LeafletMap = () => {
    const mapRef = useRef(null);

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
      }

      function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
        layer.on({
          // click: (e: L.LeafletEvent) => ({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          // })
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

    return <MapContainer ref={mapRef} style={{ height: '100%', width: '100%' }} />;
  };
export default LeafletMap;

// function getColor(arg0: number | { [name: string]: any; }): string | undefined {
//   throw new Error('Function not implemented.');
// }
