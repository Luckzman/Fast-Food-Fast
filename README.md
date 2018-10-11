# Fast-Food-Fast
# Fast-Food-Fast

[![Build Status](https://travis-ci.com/Luckzman/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.com/Luckzman/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/Luckzman/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Luckzman/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b8c8ed5861f3851d0f0/maintainability)](https://codeclimate.com/github/Luckzman/Fast-Food-Fast/maintainability)

Fast-Food-Fast​ is a food delivery service app for a restaurant.


## Table of Content 
1. [Built With](#built-with)
2. [Application Features](#application-features)
3. [How to use](#how-to-use)
4. [Author](#author)
5. [License](#license)

## Built With
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) & [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)

### Deployment
Ride-My-Way UI is hosted on gh-pages while the app is hosted on Heroku
* [Github Page](https://luckzman.github.io/Fast-Food-Fast/ui/index.html)
* [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2193919)
* [Heroku app](https://fastfoodfast2018.herokuapp.com/api/v1/order/)

## Application Features
1. Users can create an account and log in
2. A user should be able to order for food
3. The admin should be able to add, edit or delete the fast-food items
4. The admin should be able to see a list of fast-food items
5. The admin user should be able to do the following:
    * See a list of orders
    * Accept and decline orders
    * Mark orders as completed
6. A user should be able to see a history of ordered food

### API Endpoint
Endpoint | Functionality
-------- | -------------
POST  /auth/signup | Register a User
POST  /auth/login | Login a Users
POST  /orders | Place an order for food
GET /orders/ | Fetch all orders (Admin Access Only)
GET /orders/:id | Fetch a specific order (Admin Access Only)
PUT /orders/:id | Update the status of an order (Admin Access Only)
GET /menu | Get all available menu
POST /menu | Add meal option to Menu (Admin Access Only)
PUT /menu/id/upload | Update menu item with image (Admin Access Only)

## How to use
### Prerequisite
To clone and run this application, you'll need [git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/)(which comes with [npm](https://www.npmjs.com/)) installed on you computer.

### Installing
From your command line
```
# Clone this repository
$ git clone https://github.com/Luckzman/Fast-Food-Fast.git

# Go into the repository directory
$ cd Fast-Food-Fast

# Install dependencies
$ npm install

# run the app
$ npm start
```

### Running Test
* Navigate to the project root directory
* After installation, run `npm test`

## Author
Lucky Omokarho Oniovosa

## License
MIT