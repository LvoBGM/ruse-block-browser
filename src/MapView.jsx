import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import blockData from './data/zdravec_iztok.json';
import L from 'leaflet';
import 'leaflet-edgebuffer'; 

import MapBlocks from './MapBlocks';
import SearchBar from './SearchBar';

const RUSE_CENTER = [43.8456, 25.9558]; // Coordinates of Ruse Centre
const ZOOM_LEVEL = 14;
const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY;
const RUSE_BOUNDS = L.latLngBounds(
  [43.8100, 25.8500],
  [43.9000, 26.0800]
);

// This just tells the map container to render poligons when you arent looking at them so that they dont disappear
const paddedRenderer = L.canvas({ padding: 1.0 });

export default function MapView() {
    return (
        <>
            <MapContainer
                center={RUSE_CENTER}
                zoom={ZOOM_LEVEL}
                style={{ height: '100vh', width: '100vw' }}
                minZoom={14}
                maxBounds={RUSE_BOUNDS}
                maxBoundsViscosity={1.0}
                renderer={paddedRenderer}
            >
                <TileLayer
                    url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com">CARTO</a>'
                    keepBuffer={15}
                    edgeBufferTiles={3}
                />

                <SearchBar blockData={blockData}/>

                <MapBlocks blockData={blockData}/>
            </MapContainer>
        </>
    );
}