import { GeoJSON, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import blockData from './data/zdravec_nomera.json';
//import blockData from './data/blocks.json';



export default function MapBlocks({ blockData, layersRef}){
    const [zoomLevel, setZoomLevel] = useState(0);
    const [blockStyle, setBlockStyle] = useState({
        color: "#ff7800",
        weight: 1,
        opacity: 0.65,
        fillColor: "#ff7800",
        fillOpacity: 0.35
    })
    
    // Zoom listener
    const map = useMapEvents({
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
        // Bind poput to block
        layer.bindPopup(`<strong>${feature.properties["blockname"]}</strong>`);

        layer.on({
            click: (event) => {
                console.log(feature.properties);
            }
        });

        const blockId = feature["id"];
        if (blockId) {
            layersRef.current[blockId] = layer;
        }
    };

    return(<>
        {blockData && <GeoJSON 
        data={blockData} 
        style={blockStyle}
        onEachFeature={handleEachFeature}
        />}
    </>);
}