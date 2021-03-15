//Use native fs module
const fs = require('fs');

//Create variable for JSON filepath
const filepath = './test-data.json';

//Create function that synchronously reads a json file
function readJSON() {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        //Parse JSON string to JSON object
        const databases = JSON.parse(data);
        //Print all databases
        databases.forEach(db => {
            const id = db.id;
            const message = db.message;
            let reacts1 = db.reacts.reacts1;
            let reacts2 = db.reacts.reacts2;
            let reacts3 = db.reacts.reacts3;
            const comments = db.comments;
            console.log(`id: ${id}\n
                         message: ${message}\n
                         react1: ${reacts1}\n
                         react2: ${react2}\n
                         react3: ${react3}\n
                         comments: ${comments}`);
        });
    } catch (err) {
        console.log(`Error reading file from disk!`);
    }
}

//Create function that updates JSON file
function updateJSON(newID, newMessage, newReacts1, newReacts2, newReacts3, newComments) {
    fs.readFile(filepath, 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {    
            // parse JSON string to JSON object
            const databases = JSON.parse(data);
    
            // add a new record
            databases.push({  
                "id": newId, 
                "message": newMessage,
                "reacts": {
                    "react1": newReacts1,
                    "react2": newReacts2,
                    "react3": newReacts3
                },
                "comments": newComments
            });
    
            // write new data back to the file
            fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        }
    
    });

}

module.exports = { readJSON, updateJSON };