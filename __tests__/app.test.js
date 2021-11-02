const db = require("../db");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(res.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            comment_count: 11,
          });
        });
    });
    test("status:400 and responds with error message if article_id is invalid", () => {
      return request(app)
        .get("/api/articles/1000")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual("Incorrect article id");
        });
    });
  });

  describe("PATCH", () => {
    test("status:201 and responds with chosen article including increased votes count", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
        .then((res) => {
          expect(res.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 105,
            comment_count: 11,
          });
        });
    });
    test("status:201 and responds with chosen article including descreased votes count", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -5 })
        .expect(201)
        .then((res) => {
          expect(res.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 95,
            comment_count: 11,
          });
        });
    });
    test("status:400 and responds with error message if article_id is invalid", () => {
      return request(app)
        .patch("/api/articles/1000")
        .send({ inc_votes: 5 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual("Incorrect article id");
        });
    });
    test("status:400 and responds with error message if request body object is incorrectly formed", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ anotherVote: 5, inc_votes: "5" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual("Invalid input");
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("status:200 and responds with array of articles, with default sorting and no topic filtering", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            body: "some gifs",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-11-03T09:12:00.000Z",
            comment_count: 3,
          });
          expect(res.body.articles[1]).toEqual({
            article_id: 6,
            title: "A",
            body: "Delicious tin of cat food",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-10-18T01:00:00.000Z",
            comment_count: 1,
          });
          expect(res.body.articles[2]).toEqual({
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-10-16T05:03:00.000Z",
            comment_count: 0,
          });
        });
    });
    test("status:200 and responds with array of articles, filtered by given topic, but with default sorting", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual([
            {
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              body: "Bastet walks amongst us, and the cats are taking arms!",
              votes: 0,
              topic: "cats",
              author: "rogersop",
              created_at: "2020-08-03T13:14:00.000Z",
              comment_count: 2,
            },
          ]);
        });
    });
    test("status:200 and responds with an array, filtered and sorted by given quieres", () => {
      return request(app)
        .get("/api/articles?topic=mitch&sort_by=title&order=ASC")
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).toEqual({
            article_id: 6,
            title: "A",
            body: "Delicious tin of cat food",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-10-18T01:00:00.000Z",
            comment_count: 1,
          });
          expect(res.body.articles[1]).toEqual({
            article_id: 11,
            title: "Am I a cat?",
            body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-01-15T22:21:00.000Z",
            comment_count: 0,
          });
          expect(res.body.articles[2]).toEqual({
            article_id: 8,
            title: "Does Mitch predate civilisation?",
            body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-04-17T01:08:00.000Z",
            comment_count: 0,
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
