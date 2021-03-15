const entriesData = require('../data');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.reacts = data.reacts || {"react1": 0, "react1": 1, "react1": 2};
        this.comments = data.comments || [];
    }


    static get all(){
        const data = entriesData.map(entry => new Entry(entry));
        return data;
    }

    static findById(id) {
        try {
            const entryData = entriesData.filter((entry) => entry.id === id)[0];
            const entry = new Entry(entryData);
            return entry;
        } catch (err) {
            throw new Error('Not a valid entry ID.');
        }
    }

    static create(data){
        const newID = entriesData.length + 1;
        const newEntry = new Entry({id: newID, ...data});
        entriesData.push(newEntry);
        return newEntry;
    }

    update(data){
        const entry = entriesData.filter((entry) => entry.id === this.id)[0];
        // Add new comments
        entry.comments.push(...data.comments);
        // Add new reacts
        for (const [react,num] of Object.entries(entry.reacts)){
            entry.reacts[react] += data.reacts[react] || 0;
        }

        return entry;
    }

    updateReacts(data){
        
        this.reacts.map(react => react++);
    }
}

module.exports = Entry;