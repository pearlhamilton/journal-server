const entriesData = require('../data');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.gif = data.gif;
        this.reacts = data.reacts || [0,0,0];
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
            throw new Error(`${id} is not a valid entry ID.`);
        }
    }

    static create(data){
        const newID = entriesData.length + 1;
        const newEntry = new Entry({id: newID, ...data});
        entriesData.push(newEntry);
        return newEntry;
    }

    updateComments(data){
        const entry = entriesData.filter((entry) => entry.id === this.id)[0];
        // Add new comments
        if (data.comments.length > 0) {
            entry.comments.push(...data.comments)
        }
        return entry;
    }

    updateReacts(data){    
        const reactIdx = parseInt(data.reactBtn) - 1;
        this.reacts[reactIdx] += 1;
        return this.reacts;
    }

}

module.exports = Entry;