//Import data
const entriesData = require('../data');
//Import model
const Entry = require('../models/entry');

//Set up test suite
describe('Entry model', () => {
    const testEntry = {
        message: "my second jurnool entry",
        reacts: {
            react1: 1,
            react2: 5,
            react3: 10,
        },
        comments: [
            "mate, you tried again?"
        ]
    }

    test('it should create a new instance of Entry', () => {
        const entry = new Entry({id:2, ...testEntry});
        expect(entry.id).toBe(2);
        expect(entry.message).toBe("my second jurnool entry");
        expect(entry.reacts.react1).toBe(1);
        expect(entry.reacts.react2).toBe(5);
        expect(entry.reacts.react3).toBe(10);
        expect(entry.comments).toStrictEqual([
            "mate, you tried again?"
        ])
    })

    test('it should return all entries', () => {
        const entries = Entry.all;
        expect(entries).toEqual(entriesData);
    })

    test('it should create a new entry', () => {
        const newEntryId = entriesData.length + 1;
        const newEntry = Entry.create(testEntry);
        expect(newEntry).toEqual({id: newEntryId, ...testEntry});
    })

    test('it should find an entry by ID', () => {
        const firstEntry = Entry.findById(1);
        expect(firstEntry).toEqual(entriesData[0]);
    })

    test('comments section should update when a comment is made', () => {
        //Stub!
    })

    test('it should update the number of reacts', () => {
        const firstEntry = Entry.findById(1);
        Entry.updateReacts(firstEntry);
        expect(firstEntry.reacts.react1).toEqual(1);
        expect(firstEntry.reacts.react2).toEqual(1);
        expect(firstEntry.reacts.react3).toEqual(1);
    })

});