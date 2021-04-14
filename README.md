## Challenge Tracking Application
- GFA FedEx week application. Created with a small team (3 people).
- Application for challenge tracking: Challenge is created by an admin. Users can sign up for the challenge. Creating and tracking commitments related to the challenge. Following the overall evolution of the commitments by charts.

 Main Stack:
  Frontend: React, Redux
  Backend: NodeJS, ExpressJS, MySQL
  Socket.io
  ...and more

# Installation
Instructions:
1. Clone  / fork this repository
2. Go into frontend folder and run 'yarn'
3. Go into backend folder and run 'yarn'
4. Setup backend database:
 - in backend folder enter mysql and run the Rubber_DuckKings.sql file
 - in terminal write: mysql -u [username] -p < Rubber_DuckKings.sql
5. Set up environmental variables:
 - backend: in backend folder create a .env file with the following variables:
```
PORT=8080
SOCKET_PORT=8080
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=challenge
SENDGRID_API_KEY=
EMAIL_ADDRESS=
SECRET=[secret code for authtoken creation and authorization handling]
```
 - frontend: in frontend folder create a .env file with the following variables:
```
REACT_APP_FRONTEND=http://localhost:3000
REACT_APP_BACKEND=http://localhost:8080/api
REACT_APP_SOCKET=http://localhost:8080
```

6. Creating an admin user: 
 - In backend folder run the script 'create-admin'. This will create an admin user in the database to access admin page: username: admin, password: password
7. Run application:
 - in backend folder: launch server with 'yarn start'
 - in frontend folder: launch forntend server with 'yarn start'
 - The application should automatically open in your browser.
