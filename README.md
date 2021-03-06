# Historic Paintings API

An api that allows access to the worlds most historic paintings.

## Getting Started


### Clone the Repo

This section is intended for software developers.  If you have rights to the repo, simply clone the repo.  If you do not have rights to the repo, you may fork the repo and clone your fork.  

```
$ git clone https://github.com/billjoy090967/art-api-exam-nolist.git
```

### Install Dependencies

Install NPM dependencies using the following commands in your terminal:

```
$ cd art-api-exam-nolist
$ npm install
```

### Establish Environment Variables

You'll need to create a local **.env** file to store your application's secret.  Follow these steps to generate and store the secrets.

0. Create a `COUCHDB_URL` environment variable:  Using Cloudant for example or a local instance of CouchDB, create an API key for the database.  Store the key and password within your **.env** file.  Use the key and password to create an environment variable named `COUCHDB_URL` using this pattern `COUCHDB_URL=https://<key>:<password>@<your base url>/`.

  **Example**

  ```
  COUCHDB_URL=https://sdfrtrerdfsxdnorth:187254aff7762f28afxu92d137c1899c14f7c999@jeffjohnson.cloudant.com/
  ```

0.  Create a `PORT` environment variable used by the client application to connect and communicate with your api.

  **Example**

  ```
  PORT=4000
  ```

0. Create a `COUCHDB_NAME` environment variable.  The name of the database.

  **Example**

  ```
  COUCHDB_NAME=billart
  ```

### Load in Data

Create an npm script named load that runs your load-data.js program.

Test this program by running the following command from your terminal:

``` npm run <script name>
```


### Start the API

Run the following command to start the api on localhost:4000.

```
$ npm start
```

### Make your first GET call

 `/`

Open your browser to https://localhost:4000/ and view the welcome message.

 ``Welcome to the Art API. Manage all the paintings for much win.``


## Basics

### Base URL
All endpoints within the paintings are located at the following base URL:
 https://localhost:4000/paintings


### Scheme
**HTTP**

### HTTP Verbs
 ```
   -GET
   -POST
   -PUT
   -DELETE
   ```

### Content type
 The content type should be **application.json**

### Response status codes

**Response 200 - OK**

***GET /paintings/{id} or
PUT /paintings/{id}***

```
Sample Response:

{
  "_id": "painting_bal_du_moulin_de_la_galette",
  "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": 1876,
  "museum": {name: "Musée d’Orsay", location: "Paris"}
}
```

**Response 201 - Content Added**

***POST /paintings***
```
Sample Request Body JSON Data:


Sample Response:

{
  "ok": true,
  "id": "painting_bal_du_moulin_de_la_galette",
  "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
}
```
**Response 400 - Bad Response**

***POST /paintings/***
```
Sample Response:

{
    "expose": true,
    "statusCode": 400,
    "status": 400,
    "body": "{\n  \"name\": \"The Persistence of Memory\",\n  \"movement\": \"surrealism\",\n  \"artist\": \"Salvador Dali\",\n  \"yearCreated\": 1931,\n  \"museum\": {name: \"Musuem of Modern Art\", location: \"New York\"}\n}",
    "type": "entity.parse.failed"
}
```

**Response 404 - Not Found**

***DELETE /paintings/{id}***
```
Sample Response:

{
    "name": "HTTPError",
    "statusCode": 404,
    "status": 404,
    "message": "missing"
}
```


**Response 409 - Conflict**

***PUT / artists***
```
Sample Response:

{
    "name": "HTTPError",
    "statusCode": 409,
    "status": 409,
    "message": "Document update conflict.",
    "description": "Didnt Update"
}

```
**Response 500 - Internal Server Error**
