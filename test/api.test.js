//Use jest's in-built supertest library for server testing
const request = require('supertest');
//Import server
const server = require('../app');
//Create variable for JSON filepath
const fs = require('fs');
const filepath = './test-data.json';
const data = fs.readFileSync(filepath, 'utf8');
const jsonData = JSON.parse(data);

//Set up test suite
describe('API server', () => {
    let api;
    let testEntry = {
        "date": "2021-03-18T15:23:34.956Z",
        "message": "my second jurnool entry",
        "gif": "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
        "reacts": [
            0,
            0,
            0
        ],
        "comments": []
    }
    let testEntryWithNewComment = {
        "id": 1,
        "date": "2021-03-18T15:41:19.104Z",
        "message": "my first jurnool entry",
        "gif": "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
        "reacts": [
            0,
            0,
            0
        ],
        "comments": [
            "first comment!",
            "second comment!"
        ]
    }
    
    //Ensure no clash between real server and test server
    beforeAll(() => {
        //Start the test server on port 5000
        api = server.listen(5000, () => {
            console.log('Test server is up and running on port 5000!')
        });
    })
    //Exit test server upon completion of tests
    afterAll((done) => {
        console.log('Gracefully exiting test server');
        api.close(done)
    })

    //Test entries controller
    describe('test entries.js', () => {
        test('responds to get / with status 200', (done) => {
            request(api).get('/').expect(200, done);
        });
    
        test('it responds to get /entries with status 200', (done) => {
            request(api)
                .get('/entries')
                .expect(200)
                .expect(jsonData, done);
        });
    
        test('it responds to post /entries with status 201', (done) => {
            const newId = jsonData.length + 1;
            request(api)
                .post('/entries')
                .send(testEntry)
                .expect(201)
                .expect({id: newId, ...testEntry}, done)
        });
    
        test('it responds to get /:id with an individual entry', (done) => {
            request(api)
                .get('/entries/1')
                .expect(jsonData[0], done);
        });
    
        test('it responds to patch /:id/comments with an updated comments section', (done) => {
            const newCommentIndex = jsonData[0].comments.length - 1
            console.log(newCommentIndex);
            request(api)
                .patch('/entries/1/comments')
                .send(testEntryWithNewComment.comments[newCommentIndex])
                .expect(testEntryWithNewComment.comments, done);
        });
    })

    //Test search controller
    describe('test searches.js', () => {
        test('responds to get /searches/:keyword with status 200', (done) => {
            request(api)
            .get('/searches/first')
            .expect(jsonData[0])
            .expect(200, done);
        });
    })

})