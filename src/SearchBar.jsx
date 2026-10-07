import { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import './searchBar.css';

export default function SearchBar({ blockData, layersRef}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const map = useMap();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length === 0) {
            setResults([]);
            return;
        }

        // Filter features based on name
        const filtered = blockData.features.filter((feature) => {
            const name = feature.properties?.blockname || '';
            return name.toLowerCase().includes(value.toLowerCase());
        });

        setResults(filtered.slice(0, 5)); // Limit to top 5 results
    };

    function onResultClick(feature) {

        // Once panning animation has finished, put a popup on the block
        map.once('moveend', () => {
            const targetLayer = layersRef.current[feature["id"]];
            if (targetLayer) {
                targetLayer.openPopup();
            }
        });

        // Coordinates in features are stored reversed
        const target = feature.geometry.coordinates[0][0];
        const targetCoords = [target[1], target[0]];
        const searchZoomLevel = 17;

        // Calculate speed of animation
        const distanceInKm = map.getCenter().distanceTo(targetCoords) / 1000;
        let duration = 0.3 + (distanceInKm * 0.1); 
        map.setView(targetCoords, searchZoomLevel, {
            animate: true,
            duration: duration
        });

    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search blocks..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />

            {query && (
            <button
                type="button"
                onClick={() => {
                    handleInputChange({ target: { value: '' } });
                }}
                className="search-clear-x"
            >
                &#x2715; {/* Unicode character for a clean mathematical multiplier/X */}
            </button>
            )}

            {results.length > 0 && (
                <ul className="search-dropdown">
                    {results.map((feature, index) => (
                        <li
                            key={feature.id || index}
                            onClick={() => onResultClick(feature)}
                            className="search-item"
                        >
                            {feature.properties?.blockname || 'Unnamed Block'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}