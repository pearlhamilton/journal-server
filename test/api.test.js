//Use jest's in-built supertest library for server testing
const request = require('supertest');
//Import server
const server = require('../app');

//Set up test suite
describe('API server', () => {
    let api;
    let testComment = {
        message: "my second jurnool entry",
        reacts: {
            react1: 0,
            react2: 0,
            react3: 0,
        },
        comments: [
            "mate, you tried again?"
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

    //Define tests!
    test('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    test('it responds to get /entries with status 200', (done) => {
        request(api).get('/entries').expect(200, done);
    });

    test('it responds to post /entries with status 201', (done) => {
        request(api)
            .post('/entries')
            .send(testComment)
            .expect(201)
            .expect({id: 2, ...testComment}, done)
    });

})