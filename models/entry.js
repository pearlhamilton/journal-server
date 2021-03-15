const entriesData = require('../data');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.reacts = data.reacts;
        this.comments = [];
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
}

module.exports = Entry;