
# Tasks manager

## About project
The aim of the project was to create an app used to tasks management. Tasks data are stored in a local database and retrieved using a local API (JSON Server). 

## Features
1. Adding new tasks
2. For each task it is possible to: 
    - start the countdown
    - end the countdown (the duration of the task is saved)
    - finish the task
    - delete the task

## Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Installation and configuration
The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), follow the steps below to be able to use the application.
- Install all npm packages using command:
````
npm i
````
- To start develop mode use command:
````
npm start
````
- If you don't have JSON server installed on your device use command:
````
npm install json-server -g
````
- To run JSON server use command:
````
json-server --watch ./db/data.json --port 3005
````
- From now on, the application is available at:
````
http://localhost:8080
````
* Database is available at:
````
http://localhost:3005/data
````

## Author
Linkedin - [Katarzyna Panz](https://www.linkedin.com/in/katarzyna-panz-584399228/)

## Special thanks
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.
