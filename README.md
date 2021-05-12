# DataTinder backend

This repository is used to as a backend server for https://github.com/jussihayha/DataTinderit -project.  
Relies heavily on MongoDB.

This is a simple backend that takes userdata, item data and creates two different recommenders based on them.  
User recommender uses items so that it compares different users and gives out recommendations on items based on likes.

Item recommender takes characteristics that items have, compares them and returns similar items.




## Getting Started

These instructions give you an overview on how to take advantage of this repository.  
Your mileage may wary though and some heavy forking might be necessary to get this up and running for your needs.

### Prerequisites

Before you start with this backend you should have a MongoDB database / collection at your disposal.  
We used Cloud Atlas for our needs and recommend that for you too. Local databases are nice, but having a free cloud db is nicer.

* NPM / Node
* MongoDB
* Some data to use - in an ideal situation your data would have some categorized information you can use (genre, type, other adjectives)
* You have to figure out the way to save your data to MongoDB

You need to have and .env file in the project root that has the MongoDB URL:  
MONGO=mongodb+srv://<USERNAME>:<PASSWORD>@<YOUR_MONGO_URL>/<YOUR_DB>?retryWrites=true


### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ Clone or download this repository
$ Use terminal of your choice and run npm instal in the project root folder
$ Install local or get yourself a cloud based MongoDB database
$ Setup .env file as explained in prerequisites
$ Redefine Mongo models based on your own schema and needs - current models are found in the models directory. Changing these will require a lot of refactoring.
$ Start your server locally with npm run dev (for live reload) or npm run start for more persistent 
```

## Endpoints

All requests require that you have Authentication header in place.  
Backend does not verify the header, so this might be something you want to configure.

We used Firebase during development but ended up going without authentication as we did  
not want to gather user information and this is a POC project.

The userdata we collected was very minimal so you might want to expand that also.  
Think MVP and GDPR.

$ GET /api/suggestions
- returns a random item from your data 
- does not return same data twice, if user has voted / reacted on item

$ GET /api/votes
- gets all 'likes' that an user has made

$ POST /api/votes
- used for saving user likes, dislikes and neutral votes.
- like is 1, dislike is -1 and neutral is 0

Example POST request
```JSON
{
  "programId": "1234",
  "type": "movie",
  "value": 1
}
```
$ GET /api/recommendations
- tries to return 10 recommendations based on user votes

$ GET /api/popular
- tries to get 10 most popular items based on like-votes.



## Deployment

This backend does not alter item data so that is something you might need to think before deployment.  
This is your average Node backend server so basic guidelines on how to deploy those apply.

https://www.geeksforgeeks.org/deploying-node-applications/


### Server

* Live:
Example server is running for a short period at https://neksu.vps.webdock.io  
You can test the endpoints with postman or using the app located in the same url.
Should you open that link in a browser, I should advice you to use mobile views via Developer Console.

### Branches

* Main branch is the working version and other branches might have content that are no longer viable.

## Acknowledgments

* All credits for the recommender goes to Ohto Rainio and you can find more information from:  
https://www.npmjs.com/package/knn-recommender