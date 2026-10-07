import fs from 'fs';

// Get the filename from the command line arguments
const inputFilename = process.argv[2];

if (!inputFilename) {
  console.error("Error: Please provide an input file name. Example: node script.js your_file.json");
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(inputFilename, 'utf8'));
const excludedBuildings = ['school', 'service', 'detached', 'manufacture', 'kindergarten', 'church', 'retail', 'industrial', 'civic', 'government', 'hospital', 'university', 'commercial', 'office'];

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
