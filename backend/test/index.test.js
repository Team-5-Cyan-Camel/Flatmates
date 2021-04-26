const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await sleep(2000)
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Test the root path", () => {
  test("It should response the GET method", async done => {
    const res = await request(app).get("/")

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('This is the index for the Flatmates server');
    done();
  });
});
