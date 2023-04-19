import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, Layer, LeafletMouseEvent, Marker } from 'leaflet';
import statesData from './assets/us-states'
import { MapContainer } from 'react-leaflet';
import  campground  from './Campgrounds'


const LeafletMap = () => {
  // const mapRef = useRef(null);
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);


  useEffect(() => {
    const map = L.map('map').setView([48.3544091, -99.9980711], 4);

    axios.get<Campground[]>("http://localhost:3000/campgrounds", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setCampgrounds(response.data);
    })
    .catch(ex => {
      console.log(ex);
    });
  }, []);


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
      const campground = feature.properties;
      const marker = L.marker([campground.lat, campground.lon]).addTo(map);
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

  return <MapContainer ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};
export default LeafletMap;

