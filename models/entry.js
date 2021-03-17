const jsonData = require('../test-data.json');
const jsonHelpers = require('../json-manager');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.gif = data.gif;
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
            console.log(`Hooray, entry ${id} exists!`);            
            return selectedEntry;
        } else {
            throw new Error(`${id} is not a valid entry ID.`)
        }
    }

    static findByKeyword(keyword) {
        try {
            const downcaseKeyword = keyword.toLowerCase();
            const matchingEntries = jsonData.filter((entry) => {
                const messageWords = entry.message.split(" ");
                const downcasedWords = messageWords.map(word => word.toLowerCase());
                const matchingResult = downcasedWords.some(word => word == downcaseKeyword);
                if(matchingResult) {return entry};
            });
            if(matchingEntries.length>0) {return matchingEntries};
        } catch (err) {
            throw new Error (`None of the posts contain "${keyword}"!  Try another search`);
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