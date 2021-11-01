const db = require("../db");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  describe("/api", () => {
    describe("GET", () => {
      test("status:200 and responds with message 'Connected to server'", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then((res) => {
            expect(res.body.message).toBe("Connected to server");
          });
      });
    });
  });
  describe("/api/topics", () => {
    describe("GET", () => {
      test("status:200 and responds with array of valid topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then((res) => {
            expect(res.body.topics).toEqual([
              { description: "The man, the Mitch, the legend", slug: "mitch" },
              { description: "Not dogs", slug: "cats" },
              { description: "what books are made of", slug: "paper" },
            ]);
          });
      });
    });
  });
  describe("/api/wrongpath", () => {
    describe("GET", () => {
      test("status:404 and responds with message 'Path not found'", () => {
        return request(app)
          .get("/api/wrongpath")
          .expect(404)
          .then((res) => {
            expect(res.body.message).toBe("Path not found");
          });
      });
    });
  });
});
describe("/wrongpath", () => {
  describe("GET", () => {
    test("status:404 and responds with object, with message key", () => {
      return request(app)
        .get("/wrongpath")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Path not found");
        });
    });
  });
});
