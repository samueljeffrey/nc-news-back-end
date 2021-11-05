## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/articles?topic=paper`

Assertion: expected undefined to deeply equal []

Hints:
- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists


### ESSENTIAL GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:
- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists


### ESSENTIAL GET `/api/articles/1000`

Assertion: expected 400 to equal 404

Hints:
- if an article is not found with a valid `article_id`, use a 404: Not Found status code


### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 201 to equal 200

Hints:
- use a 200: OK status code for successful `patch` requests


### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client


### ESSENTIAL GET `/api/articles/2/comments`

Assertion: expected undefined to deeply equal []

Hints:
- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments


### ESSENTIAL GET `/api/articles/1000/comments`

Assertion: expected 200 to equal 404

Hints:
- return 404: Not Found when given a valid `article_id` that does not exist


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:
- use a 400: Bad Request status code when `POST` request does not include all the required keys


### ESSENTIAL POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:
- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:
- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist


### FURTHER DELETE `/api/comments/1000`

Assertion: expected 400 to equal 404

Hints:
- use a 404: Not Found when `DELETE` contains a valid comment_id that does not exist


### FURTHER GET `/api/users/butter_bridge`

Assertion: expected 404 to equal 200

Hints:
- use a 200 status code


### FURTHER GET `/api/users/butter_bridge`

Assertion: expected { message: 'Path not found' } to contain key 'user'

Hints:
- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names


### FURTHER PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:
- use a 200: OK status code for successful `patch` requests


### FURTHER PATCH `/api/comments/1`

Assertion: expected { message: 'Invalid comment id' } to contain key 'comment'

Hints:
- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`


### FURTHER PATCH `/api/comments/1`

Assertion: Cannot read properties of undefined (reading 'votes')

Hints:
- increment the `votes` of the specified article


### FURTHER PATCH `/api/comments/1`

Assertion: Cannot read properties of undefined (reading 'votes')

Hints:
- decrement the `votes` of the specified article


### FURTHER PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:
- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body


### FURTHER PATCH `/api/comments/1000`

Assertion: expected 400 to equal 404

Hints:
- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist


