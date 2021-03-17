const jsonData = require('../test-data.json');
const jsonHelpers = require('../json-manager');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.message = data.message;
        this.date = new Date(data.date);
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
            const downcasedKeyword = keyword.toLowerCase();
            const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            //Retrieve entries that contain search word in message
            const matchingEntries = jsonData.filter((entry) => {
                const messageWords = entry.message.split(" ");
                //Convert all letters in message to lower case and remove punctuation
                const downcasedMessageWords = messageWords.map(word => word.toLowerCase());
                const noPuncWords = downcasedMessageWords.map(word => {
                    let letters = word.split("");
                    let lettersOnly = [];
                    for(let i=0; i<letters.length; i++) {
                        if (alphabet.includes(letters[i])) {
                            lettersOnly.push(letters[i]);
                        }
                    };
                    return lettersOnly.join("");
                });
                const matchingResult = noPuncWords.some(word => word == downcasedKeyword);
                //Add entry to matching entries if any word in message matches the search word
                if(matchingResult) {
                    console.log(`Match found for: "${keyword}"`);
                    return entry;
                };
            });
            //Return all matching entries if at least one exists
            console.log(matchingEntries)
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