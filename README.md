# My Northcoders News API

---

## Description

This project has been to develop an API which can imitate the functionality of a news website, using sample data. For example, a user can use a get request to receive a list of articles fitting their chosen criteria, or a post request to add a comment to a list of comments associated with a given article.

---

## Try the API

#### The hosted API can be found [here](https://samueljeffrey-nc-news.herokuapp.com/api).

Adding "/api" to the end of the URL and pressing enter will allow you to see a JSON object which will show you all of the endpoints that the API has, with a description of each. Any other URL ending that you would type would only result in a JSON object with message "Path not found".

---

## Check out the project for yourself

### 1. Clone the repository

In your terminal, when in your chosen directory, run the following command:

```http
git clone https://github.com/samueljeffrey/samueljeffrey-nc-news.git
```

Once cloned, enter the new directory and open it in your editor, via the following commands in the terminal:

```http
cd samueljeffrey-nc-news
code .
```

---

### 2. Install dependencies

For this API, your device will require several dependencies, some of which must be installed as dev dependencies. To first install the dev dependencies for node, all of which allow you to use the app.test.js file correctly with Jest technology, type the following commands into your code editor's terminal:

```http
npm install jest -D
npm install jest-sorted -D
npm install supertest -D
```

The next dependencies allow you to use Express and PostgreSQL, so that you can interact with the database when using the API. Type the following into your code editor's terminal:

```http
npm install express --save
npm install pg
npm install pg-format
```

---

### 3. Create two .env files

In order to be able to direct our API to different databases, we need to create two .env files, one of which provides the name of the test database, the other providing the name of the larger development database. Run the following commands:

```http
npm install dotenv
touch .env.test
touch .env.development
```

You must then fill these two files will the correct line of code. First, click on your .env.development file in your code editor, and type the following into the first line of the file:

```http
PGDATABASE=nc_news
```

Simply save the file once this line is written, and do the same in the .env.test file, but with this command:

```http
PGDATABASE=nc_news_test
```

Your .env files are now ready to function correctly.

---

### 4. Set up the databases

To test the API, we first need it to access databases, which are currently non-existent. We need to create the required databases - a test database and a development database, the name's of which we specific in our .env files earlier. Run the following command:

```http
npm run setup-dbs
```

This command relates to a "script" which already exists in our package.json file, which tells another of our files, setup.sql, to run. Our test and development databases have now been created. They must be filled with data from our data files, which currently just consists of javascript objects. The filling of the database is called "seeding", and requires the following command to be run:

```http
npm run seed
```

During our tests, we don't need to keep "re-seeding", as the test file is already set up to do this for us before each and every test is run.

---

### 5. Try the tests

In order to test the functionality of the API at it's various endpoints, there are some jest tests in the file app.test.js. These tests simulate requests to the api using express and postgreSQL, which you have installed as dependencies. You may read through the app.test.js file in detail, or to simply check that the tests pass, run the following command, once again in your code editor's terminal:

```http
npm test
```

You should see in your terminal an indication of how many tests were run and passed (all tests should have passed). Scrolling up slightly within the terminal, there's a list of brief descriptions of what each test is doing, each with green ticks indicating that they've passed.
The tests cover both the "happy path" and "sad path", meaning that simulations have been made for valid requests that we ideally want a user to make, as well as invalid requests that they may inadvertedly make, for example, a user misspelling an endpoint or requesting article with ID 100 if we only had 99 articles.

---

#### Thanks for having a look at my API
