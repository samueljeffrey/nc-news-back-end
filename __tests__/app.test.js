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
  describe("/api/users", () => {
    describe("GET", () => {
      test("status:200 and responds with array of valid users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then((res) => {
            expect(res.body.users[0]).toEqual({
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            });
            expect(res.body.users[1]).toEqual({
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            });
            expect(res.body.users[3]).toEqual({
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            });
          });
      });
    });
  });
  describe("/api/articles", () => {
    describe("GET", () => {
      test("status:200 and responds with array of valid articles (with serial article id numbers)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0]).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: new Date(1594329060000).toISOString(),
              votes: 100,
            });
            expect(res.body.articles[4]).toEqual({
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              topic: "cats",
              author: "rogersop",
              body: "Bastet walks amongst us, and the cats are taking arms!",
              created_at: new Date(1596464040000).toISOString(),
              votes: 0,
            });
            expect(res.body.articles[8]).toEqual({
              article_id: 9,
              title: "They're not exactly dogs, are they?",
              topic: "mitch",
              author: "butter_bridge",
              body: "Well? Think about it.",
              created_at: new Date(1591438200000).toISOString(),
              votes: 0,
            });
          });
      });
    });
  });
  describe("/api/comments", () => {
    describe("GET", () => {
      test("status:200 and responds with array of valid comments (with serial comment id numbers)", () => {
        return request(app)
          .get("/api/comments")
          .expect(200)
          .then((res) => {
            expect(res.body.comments[0]).toEqual({
              comment_id: 1,
              body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              votes: 16,
              author: "butter_bridge",
              article_id: 9,
              created_at: new Date(1586179020000).toISOString(),
            });
            expect(res.body.comments[5]).toEqual({
              comment_id: 6,
              body: "I hate streaming eyes even more",
              votes: 0,
              author: "icellusedkars",
              article_id: 1,
              created_at: new Date(1586642520000).toISOString(),
            });
            expect(res.body.comments[10]).toEqual({
              comment_id: 11,
              body: "Ambidextrous marsupial",
              votes: 0,
              author: "icellusedkars",
              article_id: 3,
              created_at: new Date(1600560600000).toISOString(),
            });
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
