import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, LeafletMouseEvent, Layer, PathOptions } from 'leaflet';
import statesData from './assets/us-states';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Campground } from './types';
import { Feature, GeometryObject } from 'geojson';

interface CampgroundProps {
  campgrounds: Campground[];
}

interface FeatureLayer extends Layer {
  feature?: Feature<GeometryObject> | null;
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
  const geojsonRef = useRef<GeoJSON<GeometryObject, any> | null>(null);
  const [stateCampgrounds, setStateCampgrounds] = useState<Campground[]>([]);
  const [showMarkers, setShowMarkers] = useState<boolean>(false);

  useEffect(() => {
    function style(feature: Feature<GeometryObject>): PathOptions {
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
      const layer = e.target as FeatureLayer;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e: LeafletMouseEvent) {
      const geojson = geojsonRef.current;
      if (geojson) {
        geojson.resetStyle(e.target as FeatureLayer);
      }
    }

    function zoomToFeature(e: LeafletMouseEvent) {
      const map = e.target?.getMap();
      if (map) {
        map.fitBounds(e.target.getBounds());

        const stateName = (e.target as FeatureLayer).feature?.properties?.name;
        const stateCampgrounds = campgrounds.filter(campground => campground.state === stateName);
        setStateCampgrounds(stateCampgrounds);

        setShowMarkers(true);
      }
    }

    function onEachFeature(feature: Feature<GeometryObject>, layer: L.Layer) {
      const featureLayer = layer as FeatureLayer;

      featureLayer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    }

    const geojson = L.geoJSON(statesData as GeoJSON.GeoJsonObject, {
      style: style as L.PathOptions,
      onEachFeature: onEachFeature,
    });

    geojsonRef.current = geojson;

    return () => {
      geojsonRef.current?.clearLayers();
    };
  }, [campgrounds]);

  useEffect(() => {
    if (showMarkers) {
      const map = geojsonRef.current?.getMap();
      if (map) {
        stateCampgrounds.forEach(campground => {
          L.marker([campground.lat, campground.lng], { icon: myIcon }).addTo(map);
        });
      }
    }
  }, [stateCampgrounds, showMarkers]);

  return (
    <MapContainer
      style={{ height: '500px', cursor: 'grab' }}
      center={[48.3544091, -99.9980711]}
      zoom={4}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

      <GeoJSON ref={geojsonRef} />

      {stateCampgrounds.map(campground => (
        <Marker
          position={[campground.lat, campground.lng]}
          icon={myIcon}
          key={campground.id}
        />
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
