import { GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import { useState, useRef } from 'react';
import L from 'leaflet';



export default function MapBlocks({ blockData, layersRef, onBlockClick}){

    const [zoomLevel, setZoomLevel] = useState(0);
    const [blockStyle, setBlockStyle] = useState({
        color: "#ff7800",
        weight: 1,
        opacity: 0.65,
        fillColor: "#ff7800",
        fillOpacity: 0.35
    });
    const map = useMap();
    const tooltipsRef = useRef({});

    useMapEvents({
        zoomend: () => {
            const newZoomLevel = map.getZoom();
            setZoomLevel(newZoomLevel);
            setBlockStyle(prevBlockStyle => ({
                ...prevBlockStyle,
                weight: 15*(1/newZoomLevel),
            }));
        },
    });
    
    const handleEachFeature = (feature, layer) => {
        layer.on({
            click: (event) => {
                if (onBlockClick) {
                    onBlockClick(feature.properties);
                }

                const blockId = feature["id"];

                // Remove existing tooltip if clicking the same block
                if (tooltipsRef.current[blockId]) {
                    const existing = tooltipsRef.current[blockId];
                    clearTimeout(existing.timeoutId);
                    map.removeLayer(existing.tooltip);
                    delete tooltipsRef.current[blockId];
                }

                // Make new tooltip
                const tooltip = L.tooltip({
                    permanent: true,
                    direction: 'top',
                    className: 'block-tooltip',
                    interactive: false
                })
                .setContent(feature.properties["blockname"])
                .setLatLng(event.latlng)
                .addTo(map);

                // Add timer to tooltip
                const timeoutId = setTimeout(() => {
                    map.removeLayer(tooltip);
                    delete tooltipsRef.current[blockId];
                }, 1000);

                tooltipsRef.current[blockId] = { tooltip, timeoutId };
            },
        });

        const blockId = feature["id"];
        if (blockId) {
            layersRef.current[blockId] = layer;
        }
    };

    return(<>
        {blockData && <GeoJSON
        key={blockData.features.length}
        data={blockData}
        style={blockStyle}
        onEachFeature={handleEachFeature}
        />}
    </>);
}