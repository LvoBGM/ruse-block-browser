import { MapContainer, TileLayer } from 'react-leaflet';


// Center point of Ruse, Bulgaria
const RUSE_CENTER = [43.8456, 25.9558];
const ZOOM_LEVEL = 14;
const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY;

export default function Component() {
  return (
    <>
        <MapContainer center={RUSE_CENTER} zoom={ZOOM_LEVEL} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`}
                attribution='© [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors © [CARTO](https://carto.com/attributions)'
            />
        </MapContainer>
    </>
  );
}