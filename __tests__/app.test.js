const db = require("../db");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("status:200 and responds with the chosen article as an object", () => {
      return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then((res) => {
          expect(res.body.article[0]).toEqual({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: new Date(1588731240000).toISOString(),
            votes: 0,
          });
        });
    });
  });
  describe("PATCH", () => {
    //
  });
});

// describe("/api/articles", () => {
//   describe("GET", () => {
//     test("status:200 and responds with array of valid articles (with serial article id numbers)", () => {
//       return request(app)
//         .get("/api/articles")
//         .expect(200)
//         .then((res) => {
//           expect(res.body.articles[0]).toEqual({
//             article_id: 1,
//             title: "Living in the shadow of a great man",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "I find this existence challenging",
//             created_at: new Date(1594329060000).toISOString(),
//             votes: 100,
//           });
//           expect(res.body.articles[4]).toEqual({
//             article_id: 5,
//             title: "UNCOVERED: catspiracy to bring down democracy",
//             topic: "cats",
//             author: "rogersop",
//             body: "Bastet walks amongst us, and the cats are taking arms!",
//             created_at: new Date(1596464040000).toISOString(),
//             votes: 0,
//           });
//           expect(res.body.articles[8]).toEqual({
//             article_id: 9,
//             title: "They're not exactly dogs, are they?",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "Well? Think about it.",
//             created_at: new Date(1591438200000).toISOString(),
//             votes: 0,
//           });
//         });
//     });
//   });
// });

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
