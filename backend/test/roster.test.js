const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
    await sleep(1000)
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Tests the endpoints dealing with roster", () => {
    test("POST and DELETE new roster successful", async done => {
        const postReq = {
            title: "test-roster-title"
        }
        const postRes = await request(app).post("/roster").set('Cookie', ['sessionID=1']).send(postReq).set('Accept', 'application/json')

        expect(postRes.statusCode).toBe(200);

        const delReq = {
            rosterID: postRes.body[postRes.body.length-1]._id
        }
        const delRes = await request(app).delete("/roster").set('Cookie', ['sessionID=1']).send(delReq).set('Accept', 'application/json')

        expect(delRes.statusCode).toBe(200);
        done();
    });

    test("PATCH rotate a roster", async done => {
        const req = {
            rosterID: "608e26d28b440022408c0b84"
        }
        let res = await request(app).patch("/roster/rotate").set('Cookie', ['sessionID=1']).send(req).set('Accept', 'application/json')
        expect(res.statusCode).toBe(200);
        res = await request(app).patch("/roster/rotate").set('Cookie', ['sessionID=1']).send(req).set('Accept', 'application/json')
        expect(res.statusCode).toBe(200);
        done();
    });

    test("POST and DELETE new task successful", async done => {
        const postReq = {
            rosterID: "608e26d28b440022408c0b84",
            title: "test-task",
            description: "test-description",
            assignedUserID: "608f45c33a46e90179388df2"      
        }
        const postRes = await request(app).post("/roster/task").set('Cookie', ['sessionID=1']).send(postReq).set('Accept', 'application/json')

        expect(postRes.statusCode).toBe(200);

        const delReq = {
            rosterID: "608e26d28b440022408c0b84",
            taskID: postRes.body[0].tasks[postRes.body[0].tasks.length -1]
        }
        const delRes = await request(app).delete("/roster/task").set('Cookie', ['sessionID=1']).send(delReq).set('Accept', 'application/json')

        expect(delRes.statusCode).toBe(200);
        done();
    });


});
