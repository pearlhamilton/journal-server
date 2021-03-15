const entriesData = require('../data');
const jsonHelpers = require('../json-manager');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.reacts = data.reacts;
        this.comments = data.comments;
    }


    static get all(){
        const data = entriesData.map(entry => new Entry(entry));
        return data;
    }

    static create(data){
        const newID = entriesData.length + 1;
        const newEntry = new Entry({id: newID, ...data});
        entriesData.push(newEntry);
        return newEntry;
    }
    static get readJSON() {
        return jsonHelpers.readJSON();
    }

    static updateJSON(newID, newMessage, newReacts1, newReacts2, newReacts3, newComments) {
        jsonHelpers.updateJSON(newID, newMessage, newReacts1, newReacts2, newReacts3, newComments);
    }
}

module.exports = Entry;