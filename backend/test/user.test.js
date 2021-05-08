const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../mongo/User");

beforeAll(async () => {
    await sleep(1000)
    // Need to delete previous test registration
    let mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@flatmates-database-dev.lwm8u.mongodb.net/testDatabase?retryWrites=true&w=majority`;
    await mongoose.connect(
        mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
    await User.deleteOne({username: "test-register"}, err => {
        if(err) console.log(err);
        console.log("Successful deletion");
    });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Tests the endpoints dealing with user", () => {
  test("POST login successful", async (done) => {
    const req = {
      username: "test-username",
      password: "test-password",
    };
    const res = await request(app)
      .post("/user/login")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.header["set-cookie"]).toBeDefined();
    expect(res.body.inRoom).toBeDefined();
    done();
  });

  test("POST login wrong password", async (done) => {
    const req = {
      username: "test-username",
      password: "wrong-password",
    };
    const res = await request(app)
      .post("/user/login")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.header["set-cookie"]).toBeUndefined();
    expect(res.body.inRoom).toBeUndefined();
    done();
  });

  test("POST login wrong username", async (done) => {
    const req = {
      username: "wrong-username",
      password: "test-password",
    };
    const res = await request(app)
      .post("/user/login")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.header["set-cookie"]).toBeUndefined();
    expect(res.body.inRoom).toBeUndefined();
    done();
  });

  test("POST register successful", async (done) => {
    const req = {
      username: "test-register",
      password: "test-password",
      name: "Human"
    };
    const res = await request(app)
      .post("/user/register")
      .send(req)
      .set("Accept", "application/json");

    expect(res.header["set-cookie"]).toBeDefined();
    expect(res.statusCode).toBe(201);
    done();
  });

  test("PATCH update user", async (done) => {
    const req1 = {
      "name": "Gerald",
      "phoneNumber": "12345678",
      "email": "gerald@gmail.com"
    };
    const res1 = await request(app)
      .patch("/user/update")
      .set('Cookie', ['sessionID=1'])
      .send(req1)
      .set("Accept", "application/json");

    expect(res1.statusCode).toBe(200);
    expect(res1.body.name).toBe(req1.name);
    expect(res1.body.phoneNumber).toBe(req1.phoneNumber);
    expect(res1.body.email).toBe(req1.email);

    const req2 = {
      "name": "Geraldine",
      "phoneNumber": "87654321",
      "email": "geraldine@gmail.com"
    };
    const res2 = await request(app)
      .patch("/user/update")
      .set('Cookie', ['sessionID=1'])
      .send(req2)
      .set("Accept", "application/json");

    expect(res2.statusCode).toBe(200);
    expect(res2.body.name).toBe(req2.name);
    expect(res2.body.phoneNumber).toBe(req2.phoneNumber);
    expect(res2.body.email).toBe(req2.email);

    done();
  });
});
