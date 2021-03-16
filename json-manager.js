//Use native fs module
const fs = require('fs');

//Create variable for JSON filepath
const filepath = './test-data.json';

//Create function that synchronously reads a json file
function readJSON() {
    // try {
        const data = fs.readFileSync(filepath, 'utf8');
        //Parse JSON string to JSON object
        const entries = JSON.parse(data);
        return entries;
}

// //Create function that adds item to json file
function addToJSON(entry) {
    //Write file to disk
    fs.readFile(filepath, 'utf8', (err, data) => {
        if(err) {
            console.log(`Oops! Error reading file: ${err}`);
        } else {
            //parse JSON string into JSON object            
            const entriesData = JSON.parse(data);
            console.log(entriesData);
            //Push new data into file
            console.log('entry');
            entriesData.push(entry);
            //write new data back into file
            const jsonString = JSON.stringify(entriesData, null, 4)
            fs.writeFile(filepath, jsonString, (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
            console.log("Successfully added file to JSON!");                
        }
    })
}



module.exports = { readJSON, addToJSON };