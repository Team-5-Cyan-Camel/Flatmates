const request = require("supertest");
const app = require("../bin/www");
const mongoose = require("mongoose");
const Client = require('socket.io-client');

var clientSockets = [];

beforeAll(async () => {
    await sleep(1000);
    const port = process.env.PORT || '3000';
    for (let i = 0; i < 2; i++) {
        clientSockets[i] = new Client(`http://localhost:${port}`);
        clientSockets[i].on('connect', () => {
            clientSockets[i].emit('enter_room', {
                roomID: "6087459a2bdb4b0b0c4fe680"
            })
        });
    }
});

afterEach(() => {
    for (let i = 0; i < 2; i++) {
        clientSockets[i].off('roster_update');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Tests the socket responses dealing with roster", () => {
    test("POST and DELETE new roster socket", async done => {
        let resCounter = 0;
        for (let i = 0; i < 2; i++) {
            clientSockets[i].on('roster_update', (roster) => {
                resCounter++;
                if(resCounter==4){
                    done();
                }
            });
        }
    
        const postReq = {
            title: "test-roster-title"
        }
        const postRes = await request(app).post("/roster").set('Cookie', ['sessionID=1']).send(postReq).set('Accept', 'application/json')

        const delReq = {
            rosterID: postRes.body.rosters[postRes.body.rosters.length - 1]._id
        }
        const delRes = await request(app).delete("/roster").set('Cookie', ['sessionID=1']).send(delReq).set('Accept', 'application/json')
    });

    test("PATCH rotate a roster socket", async done => {
        let resCounter = 0;
        for (let i = 0; i < 2; i++) {
            clientSockets[i].on('roster_update', (roster) => {
                resCounter++;
                if(resCounter==2){
                    done();
                }
            });
        }

        const req = {
            rosterID: "608e26d28b440022408c0b84"
        }
        let res = await request(app).patch("/roster/rotate").set('Cookie', ['sessionID=1']).send(req).set('Accept', 'application/json')
    });

    test("POST and DELETE new task socket", async done => {
        let resCounter = 0;
        for (let i = 0; i < 2; i++) {
            clientSockets[i].on('roster_update', (roster) => {
                resCounter++;
                if(resCounter==4){
                    done();
                }
            });
        }

        const postReq = {
            rosterID: "608e26d28b440022408c0b84",
            title: "test-task",
            description: "test-description",
            assignedUserID: "608f45c33a46e90179388df2"
        }
        const postRes = await request(app).post("/roster/task").set('Cookie', ['sessionID=1']).send(postReq).set('Accept', 'application/json')

        const delReq = {
            rosterID: "608e26d28b440022408c0b84",
            taskID: postRes.body.rosters[0].tasks[postRes.body.rosters[0].tasks.length - 1]
        }
        const delRes = await request(app).delete("/roster/task").set('Cookie', ['sessionID=1']).send(delReq).set('Accept', 'application/json')
    });


});
