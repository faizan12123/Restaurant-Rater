# Restaurant Rater

## Author
|   Name  
| :------------: 
| Faizan Hussain

## Project Description

* Full-stack web application that allows users to register an account, sign in, add/ update/ delete restaurants, and
review/ rate those restaurants.
* Database created in PostgreSQL, user interface created using React, and routes/ middleware/ backend created
using ExpressJs and Node.js
* Users are authorized to access the application using JSON web token.

## SQL Commands to run on local system

1. Download/ install PostgreSQL
2. Run the following commands in your PSQL terminal:
```
CREATE DATABASE yelp;
    
CREATE TABLE restaurants (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
location VARCHAR (50) NOT NULL,
price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT references restaurants(id) ON DELETE CASCADE,
name VARCHAR(50) NOT NULL,
review TEXT NOT NULL,
rating INT NOT NULL CHECK(rating >=1 and rating <=5)
);

-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(225) NOT NULL,
user_password VARCHAR(255) NOT NULL
);
```

## Dependencies

| Command | Description |
| :---: | :------: |
|npm init -y| Initializes Node inside of the project directory |
|npm i express| Installs Express|
|npm i dotenv |Creates a .env file to contain environmental variables|
|npm i nodemon |Restarts the server every time a change to the code has been made|
|npm i morgan |Middleware Provider|
|npm i pg |Connects our node server to the postgres DB and allows queries to be sent|
|npm i create-react-app -g |Installs React into project directory|
|create-react-app |Creates a React app in project directory|
|npm i react-router-dom |Used to create React Routes for the different web-pages|
|npm i axios|Javascript library used to make HTTP requests from node.js|
|npm i cors |Middleware that allows fetch requests from other domains(allows our front-end on a different local host to send a request to this local host)|
|npm i jsonwebtoken |Used to generate our json web token to verify it|
|npm i bcrypt |Encypt user passwords so that it does not just show the password in the database|
