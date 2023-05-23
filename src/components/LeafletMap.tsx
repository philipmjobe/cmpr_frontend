import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
<<<<<<< HEAD
import L, { GeoJSON, LeafletMouseEvent, Layer, PathOptions } from 'leaflet';
import statesData from './assets/us-states';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Campground } from './types';
import { Feature, GeometryObject } from 'geojson';
=======
import L, { GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';
import statesData from './assets/us-states';
import { MapContainer } from 'react-leaflet';
import { Campground } from './types';
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)

interface CampgroundProps {
  campgrounds: Campground[];
}
<<<<<<< HEAD

interface FeatureLayer extends Layer {
  feature?: Feature<GeometryObject> | null;
}

=======
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
const myIcon = L.icon({
  iconUrl: 'components/assets/marker.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});
<<<<<<< HEAD

const LeafletMap: React.FC<CampgroundProps> = ({ campgrounds }: CampgroundProps) => {
  const geojsonRef = useRef<GeoJSON<GeometryObject, any> | null>(null);
  const [stateCampgrounds, setStateCampgrounds] = useState<Campground[]>([]);
  const [showMarkers, setShowMarkers] = useState<boolean>(false);
=======
const LeafletMap: React.FC<CampgroundProps> = ({campgrounds}: CampgroundProps) => {
  const mapRef = useRef(null);
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)

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
<<<<<<< HEAD
      const geojson = geojsonRef.current;
      if (geojson) {
        geojson.resetStyle(e.target as FeatureLayer);
      }
=======
      geojson.resetStyle(e.target);
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
    }

    let geojson: GeoJSON;

    function zoomToFeature(e: LeafletMouseEvent) {
<<<<<<< HEAD
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
=======
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
      layer.on({
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    
      const stateName = feature.properties?.name;
    
      // Filter campgrounds for the current state
      const stateCampgrounds = campgrounds.filter(campground => campground.state === stateName);
    
      stateCampgrounds.forEach(campground => {
        console.log('Creating marker for campground', campground)
        L.marker([campground.lat, campground.lng], { icon: myIcon }).addTo(map);
      });
    }
<<<<<<< HEAD

    const geojson = L.geoJSON(statesData as GeoJSON.GeoJsonObject, {
      style: style as L.PathOptions,
=======
    
    geojson = L.geoJson(statesData, {
      style: style as L.StyleFunction,
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
      onEachFeature: onEachFeature,
    });

<<<<<<< HEAD
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
=======
    // Wait until the map is fully initialized before adding the drag handler
    map.whenReady(() => {
      map.dragging.enable();
    });

    return () => {
      map.remove();
    };
  }, [campgrounds]);

  return <MapContainer id='map' ref={mapRef} style={{ height: '100%', width: '100%', cursor: 'grab' }} />;
};

export default LeafletMap
>>>>>>> parent of 2eabb63 (starts getting the markers actually working still debugging)
