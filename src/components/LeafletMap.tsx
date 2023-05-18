import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Campground } from './types';
import { Feature, GeoJSON } from 'geojson';

interface CampgroundProps {
  campgrounds: Campground[];
}

interface FeatureLayer extends Layer {
  feature?: Feature;
}

const myIcon = L.icon({
  iconUrl: 'components/assets/marker.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const LeafletMap: React.FC<CampgroundProps> = ({ campgrounds }: CampgroundProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const geojsonRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const map = L.map('map', {
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true,
    }).setView([48.3544091, -99.9980711], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

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
      const geojson = geojsonRef.current;
      if (geojson) {
        geojson.resetStyle(e.target as L.Path);
      }
    }

    function zoomToFeature(e: LeafletMouseEvent) {
      const map = mapRef.current;
      if (map) {
        map.fitBounds(e.target.getBounds());

        const stateName = (e.target as FeatureLayer).feature?.properties?.name;
        const stateCampgrounds = campgrounds.filter(campground => campground.state === stateName);

        stateCampgrounds.forEach(campground => {
          L.marker([campground.lat, campground.lng], { icon: myIcon }).addTo(map);
        });
      }
    }

    function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
      const featureLayer = layer as FeatureLayer;

      featureLayer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    }

    const geojson = L.geoJson(statesData, {
      style: style as L.StyleFunction,
      onEachFeature: onEachFeature,
    }).addTo(map);

    geojsonRef.current = geojson;

    // Wait until the map is fully initialized before adding the drag handler
    map.whenReady(() => {
      map.dragging.enable();
    });

    mapRef.current = map;
  }, [campgrounds]);

  return (
    <MapContainer
      id='map'
      ref={mapRef}
      style={{ height: '100%', width: '100%', cursor: 'grab' }}
      center={[48.3544091, -99.9980711]}
      zoom={4}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='© OpenStreetMap contributors' />

      {/* Add any additional components or layers here */}
    </MapContainer>
  );
};

export default LeafletMap;

