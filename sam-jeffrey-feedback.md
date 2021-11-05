# BE Northcoders NC News Portfolio Check List

## Readme - Remove the one that was provided and write your own

**Write your own readme using https://readme.so/ to assist, make sure you remove old readme (if you're working on further endpoints you still have our original repo to work from**

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [✅] Remove any unnecessary `console.logs` and comments
- [✅] .gitignore the `.env` files
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

## Connection to db

- [✅] Throw error if `process.env.PGDATABASE` is not set

## Creating tables

- [✅] Use `NOT NULL` on required fields
- [✅] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [ ] Delete all comments when the article they are related to is deleted: Add `ON DELETE CASCADE` to `article_id` column in `comments` table.

## Inserting data

- [✅] Drop tables and create tables in seed function

## Tests

- [✅] Seeding before each test
- [ NA ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [✅] Ensure all tests are passing
- [ ] Cover all endpoints and errors

- `GET /api/topics`

  - [✅] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [✅] Status 200, single article object (including `comment_count`)
  - [❗] Status 400, invalid ID, e.g. string of "not-an-id"
  - [❗] Status 404, non existent ID, e.g. 0 or 9999
    - **When I input a valid ID which doesn't exist in the database aka `999999` we get a 400 invalid article ID response. But what's more appropriate is a article not found 404 response because a number is valid it just doesn't exist. When I put a actually invalid id in like `banana` I break the server, make sure we're handling that.**

- `PATCH /api/articles/:article_id`

  - [✅💡] Status 200, updated single article object
    - **200 more appropriate response code than 201 as we're not creating anything new**
  - [✅] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing
  - [❗] Status 400, invalid ID, e.g. string of "not-an-id"
  - [❗] Status 404, non existent ID, e.g. 0 or 9999
    - **same comment as above, for a real number that just doesn't exist in our database we should respond with 404 because we can't find it but it's a valid id**

- `GET /api/articles`

  - [✅] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [✅] Status 200, default sort & order: `created_at`, `desc`
  - [✅] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [✅] Status 200, accepts `order` query, e.g. `?order=desc`
  - [✅] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [✅] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [✅] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [❗] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
    - **Use a 404 status code, when provided a non-existent topic, check whether the topic exists in the database in your model (or separate util function?)**
  - [ ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [✅] Status 200, array of comment objects for the specified article
  - [✅] Status 400, invalid ID, e.g. string of "not-an-id"
  - [❗] Status 404, non existent ID, e.g. 0 or 9999
    - **return 404: Not Found when given a valid `article_id` that does not exist**
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [✅] Status 201, created comment object
  - [✅] Status 400, invalid ID, e.g. string of "not-an-id"
  - [❗] Status 404, non existent ID, e.g. 0 or 9999
    - **received 400 but 404 more appropriate here**
  - [❗] Status 400, missing required field(s), e.g. no username or body properties
    - **missing body breaks server and missing username lets me post a comment with null author**
  - [ ] Status 404, username does not exist
    - **404 more appropriate than 400 when valid username but it doesn't exist in the database**
  - [❗] Status 201, ignores unnecessary properties
    - **gives error 400 status when additional properties are sent**

- `DELETE /api/comments/:comment_id`

  - [✅] Status 204, deletes comment from database
  - [✅] Status 400, invalid ID, e.g "not-an-id"
  - [ ] Status 404, non existent ID, e.g 999
    - **Got 400 instead of 400 for a valid but non-existent id**

- `GET /api`

  - [✅] Status 200, JSON describing all the available endpoints

## Routing

- [✅] Split into api, topics, users, comments and articles routers
- [✅] Use `.route` for endpoints that share the same path

## Controllers

- [✅] Name functions and variables well
- [❓] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)
  - **Catch is being used in model, I'd almost prefer seeing catch(next) or similar inside the controller. We're also sending some error responses directly in the controller rather than sending promise rejections in our models along the error handling middleware**
    - **For example, patchSingleArticle: I'd prefer seeing that votes validation happen inside the model and you return a promise rejection in the model which gets handled in error middleware.**
    - **Give me a shout if this isn't too clear**
  - **❗ We shouldn't do any data manipulation inside the controller so things like line 57 on getAllArticles should really be handled in the model**

## Models

- **❗ A few semi-colons missing in PSQL queries**
- Protected from SQL injection
  - [✅] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [❗] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [✅] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [✅] Use `LEFT JOIN` for comment counts
  - **we do make a comment_count for GET articles but GET articles/:article_id doesn't and instead uses another model to count comments. This is a workaround that works but any data manipulation like that should be done in the model ideally. It would be more ideal to see this comment count be handled in PSQL.**

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
- [❗] Consistently use `Promise.reject` in either models _**OR**_ controllers
  - **Relating to my above comment, we're seeing some error handling in the catch blocks that don't look too uniform. E.g. just returning messages if the catch of selectTopics instead of using promise rejection. Same with returning undefined if catch is activated in removeComment - it seems very open to seeing error responses that aren't precisely relating to the error being experienced.**
  - **I'd like to see more use of catch(next), promise.rejection, use of PSQL to give specific error responses**

## Extra Tasks - To be completed after hosting

- `GET /api/users`

  - [✅] Status 200, responds with array of user objects

- `GET /api/users/:username`

  - [ ] Status 200, responds with single user object
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
