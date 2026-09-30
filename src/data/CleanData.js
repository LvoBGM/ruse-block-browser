import fs from 'fs';
//const rawData = JSON.parse(fs.readFileSync('./backup_blocks.json', 'utf8'));
const rawData = JSON.parse(fs.readFileSync('./zdravec_iztok.json', 'utf8'));
const excludedBuildings = ['school', 'kindergarten', 'retail', 'industrial', 'civic', 'government', 'hospital', 'university', 'commercial', 'office'];

let id = 0;

// For each feature
rawData.features = rawData.features
    // Filter out unwanted buildings
    .filter(feature => {
        const buildingType = feature.properties?.building;
        return !excludedBuildings.includes(buildingType);
    })
    // Map and re-index the remaining buildings
    .map(feature => {
        id++;
        return {
            ...feature,
            properties: {
                id: id,
                blockname: feature.properties["addr:housename"] || feature.properties["blockname"] || "Unnamed Block",
            }
        };
    });
fs.writeFileSync('blocks.json', JSON.stringify(rawData, null, 2));
