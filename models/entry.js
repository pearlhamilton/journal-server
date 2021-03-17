const jsonData = require('../test-data.json');
const jsonHelpers = require('../json-manager');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        // this.gif = data.gif;
        this.reacts = data.reacts || [0,0,0];
        this.comments = data.comments || [];
    }

    static get all(){
        const data = jsonHelpers.readJSON();
        return data;
    }

    static findById(id) {
        const filteredEntry = jsonData.filter((entry) => entry.id===id)[0];
        const selectedEntry = new Entry(filteredEntry);
        if(filteredEntry) {
            console.log(`Hooray, entry ${id} already exists!`);            
            return selectedEntry;
        } else {
            throw new Error(`${id} is not a valid entry ID.`)
        }
    }

    static create(data){
        const newID = jsonData.length + 1;
        const newEntry = new Entry({id: newID, ...data});
        jsonHelpers.addToJSON(newEntry);
        return newEntry;
    }

    updateComments(data){
        // Add new comments
        if (data.comments.length > 0) {
            this.comments.push(...data.comments)
        }
        jsonHelpers.addCommentsJSON(this);
        return this.comments;
    }

    updateReacts(data){    
        const reactIdx = parseInt(data.reactBtn) - 1;
        this.reacts[reactIdx] += 1;
        jsonHelpers.addReactsJSON(this);
        return this.reacts;
    }

}

module.exports = Entry;