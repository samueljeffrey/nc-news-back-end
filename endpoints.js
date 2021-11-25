const data = {
  "/api/topics": {
    GET: {
      description:
        "returns a list of the possible article topics, each with a slug and description",
      "output example": [
        {
          slug: "topic1",
          description: "description of topic 1",
        },
        {
          slug: "topic2",
          description: "description of topic 2",
        },
      ],
    },
  },
  "/api/articles/:article_id": {
    GET: {
      description:
        "returns, if found, the information for the article matching the given id, containing its title, author, article id, body, topic, time posted, number of votes and number of comments",
      parameter: "placeholder :article_id in path must be filled by a number",
      "output example": {
        author: "sam123",
        title: "How to return a JSON file",
        article_id: 123,
        body: "The first step is to...",
        topic: "api",
        created_at: 1234567890,
        votes: 1,
        comment_count: 0,
      },
    },
    PATCH: {
      description:
        "updates the number of votes on the article with the given id, if found, according to the given request body, and returns the updated article information",
      parameter: "placeholder :article_id in path must be filled by a number",
      "input example": {
        inc_votes: 4,
      },
      "output example": {
        author: "sam123",
        title: "How to return a JSON file",
        article_id: 123,
        body: "The first step is to...",
        topic: "api",
        created_at: 1234567890,
        votes: 5,
        comment_count: 0,
      },
    },
    DELETE: {
      description:
        "deletes the article with the given id, if found, and returns a 204 status with no response body",
      parameter: "placeholder :article_id in path must be filled by a number",
    },
  },
  "/api/articles": {
    GET: {
      description:
        "returns a list of articles, filtered and sorted according to queries given during the request",
      "possible queries": ["topic", "sort_by", "order"],
      "query example": ["?topic=api&sort_by=article_id&order=ASC"],
      "output example": [
        {
          author: "sam5",
          title: "How to return a JSON file",
          article_id: 12,
          body: "The first step is to...",
          topic: "api",
          created_at: 1234567890,
          votes: 3,
          comment_count: 0,
        },
        {
          author: "sam3",
          title: "How not to return a JSON file",
          article_id: 23,
          body: "The first step is to...",
          topic: "api",
          created_at: 1234567890,
          votes: 1,
          comment_count: 0,
        },
        {
          author: "sam4",
          title: "Why to return a JSON file",
          article_id: 34,
          body: "The first step is to...",
          topic: "api",
          created_at: 1234567890,
          votes: 5,
          comment_count: 0,
        },
      ],
    },
    POST: {
      description:
        "using the request body, a new article is created and added to the list of articles, a the full article object is returned",
      "input example": {
        username: "sam3",
        body: "this is the body",
        title: "Title",
        topic: "topic4",
      },
      "output example": {
        article_id: 23,
        votes: 0,
        title: "Title",
        created_at: 123459,
        comment_count: 0,
        author: "sam3",
        topic: "topic4",
        body: "this is the body",
      },
    },
  },
  "/api/articles/:article_id/comments": {
    GET: {
      description:
        "returns a list of comments for the article matching the given id, if found",
      parameter: "placeholder :article_id in path must be filled by a number",
      "output example": [
        {
          comment_id: 21,
          votes: 0,
          created_at: 123456,
          author: "sam4",
          body: "lame",
        },
        {
          comment_id: 22,
          votes: 5,
          created_at: 123457,
          author: "sam6",
          body: "thrilling",
        },
      ],
    },
    POST: {
      description:
        "using the request body, a new comment is created and added to the list of comments for the given article id, a the full comment object is returned",
      parameter: "placeholder :article_id in path must be filled by a number",
      "input example": {
        username: "sam3",
        body: "this is the body",
      },
      "output example": {
        comment_id: 23,
        votes: 0,
        created_at: 123459,
        author: "sam3",
        body: "this is the body",
      },
    },
  },
  "/api/comments/:comment_id": {
    DELETE: {
      description:
        "deletes the comment with the given id, if found, and returns a 204 status with no response body",
      parameter: "placeholder :comment_id in path must be filled by a number",
    },
    PATCH: {
      description:
        "updates the number of votes on the comment with the given id, if found, according to the given request body, and returns the updated comment object",
      parameter: "placeholder :comment_id in path must be filled by a number",
      "input example": {
        inc_votes: 4,
      },
      "output example": {
        author: "sam123",
        comment_id: 123,
        body: "The first step is to...",
        created_at: 1234567890,
        votes: 5,
      },
    },
  },
  "/api/users": {
    GET: {
      description:
        "returns an array of user objects, each containing only a username property",
      "output example": [
        { username: "sam1" },
        { username: "sam2" },
        { username: "sam3" },
      ],
    },
  },
  "/api/users/:username": {
    GET: {
      description:
        "returns a single user object, if found, which contains the properties 'username', 'name', and 'avatar_url'",
      "output example": {
        username: "sam4",
        name: "sam",
        avatar_url: "www.someurl.com",
      },
      parameter: "placeholder :username in path must be filled by a number",
    },
  },
  "/api": {
    GET: {
      description:
        "returns this very json object, detailing what you can expect from requests to all of the available endpoints",
    },
  },
};

module.exports = data;
