//Use native fs module
const fs = require('fs');

//Create variable for JSON filepath
const filepath = './test-data.json';

//Create function that synchronously reads a json file
function readJSON() {
        const data = fs.readFileSync(filepath, 'utf8');
        //Parse JSON string to JSON object
        const entries = JSON.parse(data);
        return entries;
}

//Create function that adds item to json file
function addToJSON(entry) {
    //Write file to disk
    fs.readFile(filepath, 'utf8', (err, data) => {
        if(err) {
            console.log(`Oops! Error reading file: ${err}`);
        } else {
            //parse JSON string into JSON object            
            const jsonData = JSON.parse(data);
            //Push new data into file
            jsonData.push(entry);
            //write new data back into file
            const jsonString = JSON.stringify(jsonData, null, 4)
            fs.writeFile(filepath, jsonString, (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
            console.log("Successfully added file to JSON!");                
        }
    })    
}

//Create function that edits comments in json file
function addCommentsJSON(entry) {
    //Write file to disk
    fs.readFile(filepath, 'utf8', (err, data) => {
        if(err) {
            console.log(`Oops! Error reading file: ${err}`);
        } else {
            //parse JSON string into JSON object            
            const jsonData = JSON.parse(data);
            //Identify entry that has a new comment
            const changedEntry = jsonData.filter((original) => original.id===entry.id)[0];
            //Push new comment to changed entry
            changedEntry.comments.push(entry.comments.pop());
            //write new data back into file
            const jsonString = JSON.stringify(jsonData, null, 4)
            fs.writeFile(filepath, jsonString, (err) => {
                if (err) {
                    console.log(`Error adding comment to file: ${err}`);
                }
            });
            console.log(`Successfully added comment to entry ${entry.id} in JSON!`);                
        }
    })    
}

//Create function that adds reacts to json file
function addReactsJSON(entry) {
    //Write file to disk
    fs.readFile(filepath, 'utf8', (err, data) => {
        if(err) {
            console.log(`Oops! Error reading file: ${err}`);
        } else {
            //parse JSON string into JSON object            
            const jsonData = JSON.parse(data);
            //Replace entry in JSON file with new entry withu updated reacts
            jsonData[entry.id-1] = entry;
            //write new data back into file
            const jsonString = JSON.stringify(jsonData, null, 4)
            fs.writeFile(filepath, jsonString, (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
            console.log(`Successfully updated number of reacts for entry number ${entry.id}.`);                
        }
    })    
}

module.exports = { readJSON, addCommentsJSON, addReactsJSON, addToJSON };