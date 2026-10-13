import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-edgebuffer'; 

import MapBlocks from './MapBlocks';
import SearchBar from './SearchBar';
import QuizSidebar from './QuizSidebar';
import Quiz from './Quiz';

// Import data
// TODO: FIX ZAHARNA FABRIKA THERE IS LIKE ! NAMED BLOCK IN THERE I DONT WANNA FIX RN
import zdravec_imena from './data/zdravec_imena.json';
import zdravec_nomera from './data/zdravec_nomera.json';
import zdravec_iztok from './data/zdravec_iztok.json';
import zdravec_sever_1 from './data/zdravec_sever_1.json';
import zdravec_sever_2 from './data/zdravec_sever_2.json';
import zaharna_fabrika from './data/zaharna_fabrika.json';

const blockData = {
  type: "FeatureCollection",
  features: [
    ...zdravec_imena.features,
    ...zdravec_iztok.features,
    ...zdravec_nomera.features,
    ...zdravec_sever_1.features,
    ...zdravec_sever_2.features,
    ...zaharna_fabrika.features
  ]
};

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
    // References to all layers (used by search bar to activate popups when searching for a block)
    const layersRef = useRef({});
    const [isQuizMenuOpen, setIsQuizMenuOpen] = useState(false);
    const [isQuizActive, setIsQuizActive] = useState(false);
    return ( 
        <>
            <MapContainer
                center={RUSE_CENTER}
                zoom={ZOOM_LEVEL}
                style={{ height: '100vh', width: '100vw', background: '#000000' }} 
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

                {!isQuizActive && <SearchBar blockData={blockData} layersRef={layersRef}/>}

                <MapBlocks blockData={blockData} layersRef={layersRef}/>
            </MapContainer>
            {!isQuizMenuOpen && (
                <button
                className='quiz-btn'
                    onClick={() => {
                        console.log('[UI] Floating "Quiz" button clicked');
                        setIsQuizMenuOpen(true);
                    }}
                >
                    Започни Quiz
                </button>
            )}

            {isQuizActive && (
                <button
                    className='quiz-btn'
                    onClick={() => {
                        console.log('[UI] Floating "Quiz" button clicked');
                        setIsQuizActive(false);
                    }}
                >
                    Затвори Quiz
                </button>
            )}

            {isQuizActive && <Quiz />}

            {/* 2. The Quiz Sidebar Menu */}
            <QuizSidebar
                isOpen={isQuizMenuOpen}
                setIsQuizActive={setIsQuizActive}
                onClose={() => setIsQuizMenuOpen(false)}
            />
        </>
    );
}