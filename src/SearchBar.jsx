import { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import './searchBar.css';

export default function SearchBar({ blockData }) {
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
        // Coordinates in features are stored reversed
        const center = feature.geometry.coordinates[0][0];
        map.panTo([center[1], center[0]], { animate: true, duration: 0.75 });
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