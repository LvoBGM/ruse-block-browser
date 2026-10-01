import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import blockData from './data/zdravec_iztok.json';

import MapBlocks from './MapBlocks';

const RUSE_CENTER = [43.8456, 25.9558]; // Coordinates of Ruse Centre
const ZOOM_LEVEL = 14;
const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY;

export default function MapView() {
    return (
      <>
          <MapContainer center={RUSE_CENTER} zoom={ZOOM_LEVEL} style={{ height: '100vh', width: '100vw' }}>
              <TileLayer
                  url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com">CARTO</a>'
              />

              <MapBlocks blockData={blockData}/>
          </MapContainer>
      </>
    );
}