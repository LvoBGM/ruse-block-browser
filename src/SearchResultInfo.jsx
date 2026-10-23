import React from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import './styles/SearchResultInfo.css';

export default function SearchResultInfo({ feature, position, handleClosePopup }) {
    if (!feature || !position) return null;

    const blockName = feature.properties?.blockname || 'Unnamed Block';

    // Close popup when map is moved or zoomed
    useMapEvents({
        movestart: () => {
            handleClosePopup()
        },
        zoomstart: () => {
            handleClosePopup()
        }
    });

    return (
        <div
            className="search-result-popup"
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -100%)',
                zIndex: 1000
            }}
        >
            <div className="popup-content">
                <span className="popup-text">{blockName}</span>
                <button
                    className="popup-close-btn"
                    onClick={handleClosePopup}
                >
                    ✕
                </button>
            </div>
            <div className="popup-arrow"></div>
        </div>
    );
}
