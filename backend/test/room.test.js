const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../mongo/User");

beforeAll(async () => {
  await sleep(1000);
  // Need to delete previous test registration
  let mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@flatmates-database-dev.lwm8u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  await mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  // await User.deleteOne({username: "test-register"}, err => {
  //     if(err) console.log(err);
  //     console.log("Successful deletion");
  // });
  // do my clean up + log in if needed
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// test no login group
describe("Tests the endpoints dealing with room when not loggied in", () => {
  // these tests are repetative but ensure that the underlying
  // implementation of each endpoint handles when a user is not logged in
  test("POST create room without logging in", async (done) => {
    const req = {};
    const res = await request(app)
      .post("/room")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });

  test("POST join room without logging in", async (done) => {
    const req = {
      roomCode: "XXXX",
    };
    const res = await request(app)
      .post("/room/join")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });

  test("PATCH leave room without logging in", async (done) => {
    const req = {};
    const res = await request(app)
      .patch("/room/leave")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });

  test("GET get room without logging in", async (done) => {
    const req = {};
    const res = await request(app)
      .get("/room")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });

  test("DELETE delete room without logging in", async (done) => {
    const req = {};
    const res = await request(app)
      .delete("/room")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });

  test("PATCH kick user from room without logging in", async (done) => {
    const req = {
      username: "fakeUser",
    };
    const res = await request(app)
      .patch("/room/kick")
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not logged in");
    done();
  });
});

// test login group
describe("Tests the endpoints dealing with room when loggied in", () => {
  let cookie;
  let code;
  beforeAll(async () => {
    // login
    const req = {
      username: "roomTestsAccount-username",
      password: "roomTestsAccount-password",
    };
    const res = await request(app)
      .post("/user/login")
      .send(req)
      .set("Accept", "application/json");

    cookie = res.header["set-cookie"];
    code = res.body.roomCode;
  });

  //   beforeEach()(async () => {
  //     // create room for testing
  //   });

  test("POST create room", async (done) => {
    const req = {};
    const res = await request(app)
      .post("/room")
      .set("Cookie", cookie)
      .send(req)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.roomCode).toBeDefined();

    // CLEANUP delete room
    const reqDel = {};
    const resDel = await request(app)
      .delete("/room")
      .set("Cookie", cookie)
      .send(reqDel)
      .set("Accept", "application/json");

    done();
  });

  describe("Tests with pre-created room", () => {
    beforeEach(async () => {
      const req = {};
      const res = await request(app)
        .post("/room")
        .set("Cookie", cookie)
        .send(req)
        .set("Accept", "application/json");
    });

    test("GET get room details", async (done) => {
      const req = {};
      const res = await request(app)
        .get("/room")
        .set("Cookie", cookie)
        .send(req)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeDefined();
      done();
    });

    test("DELETE delete room", async (done) => {
      const req = {};
      const res = await request(app)
        .delete("/room")
        .set("Cookie", cookie)
        .send(req)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(200);
      done();
    });

    test("POST join room", async (done) => {
      // 2nd user joins the room
      // (created by the default user used in the tests)
      const [res, secondUsrCookie] = await joinRoom();

      expect(res.statusCode).toBe(200);
      done();
    });

    test("PATCH leave room", async (done) => {
      const [res, secondUsrCookie] = await joinRoom();

      var req2 = {};
      var res2 = await request(app)
        .patch("/room/leave")
        .set("Cookie", secondUsrCookie)
        .send(req2)
        .set("Accept", "application/json");

      expect(res2.body.message).toBe("x");
      expect(res2.statusCode).toBe(200);
      done();
    });

    test("PATCH kick a user from room", async (done) => {
      const [res, secondUsrCookie] = await joinRoom();

      // original user kicks the 2nd user
      var req2 = { username: "roomTestsAccount2-username" };
      var res2 = await request(app)
        .patch("/room/kick")
        .set("Cookie", cookie)
        .send(req2)
        .set("Accept", "application/json");

      expect(res2.body.message).toBe("x");
      expect(res2.statusCode).toBe(200);
      done();
    });

    async function joinRoom() {
      let cookieUsr2;
      var reqLogin = {
        username: "roomTestsAccount2-username",
        password: "roomTestsAccount2-password",
      };
      var resLogin = await request(app)
        .post("/user/login")
        .send(reqLogin)
        .set("Accept", "application/json");

      cookieUsr2 = resLogin.header["set-cookie"];

      var req = { roomCode: code };
      var res = await request(app)
        .post("/room/join")
        .set("Cookie", cookieUsr2)
        .send(req)
        .set("Accept", "application/json");

      return [res, cookieUsr2];
    }

    afterEach(async () => {
      const req = {};
      const res = await request(app)
        .delete("/room")
        .set("Cookie", cookie)
        .send(req)
        .set("Accept", "application/json");
    });
  });
});
