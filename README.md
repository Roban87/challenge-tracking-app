Instructions:
1. Clone  / fork this repository
2. Go into frontend folder and run 'yarn'
3. Go into backend folder and run 'yarn'
4. Setup backend database: 
	in backend folder enter mysql and run the Rubber_DuckKings.sql file
	in terminal write: mysql -u [username] -p < Rubber_DuckKings.sql
5.Set up environmental variables:
Backend: in backend folder create a .env file with the following variables:
•	PORT=8088
•	MYSQL_HOST=[mysql host address]
•	MYSQL_USER=[mysql username]
•	MYSQL_PASSWORD=[mysql password]
•	MYSQL_DATABASE=challenge
•	SOCKET_PORT=8081
•	SECRET=[secret code for authtoken creation and authorization handling]
Frontend: in frontend folder create a .env file with the following variables
•	REACT_APP_FRONTEND=http://localhost:3000
•	REACT_APP_BACKEND= http://localhost:8080/api
•	REACT_APP_SOCKET=http://localhost:8081/

Creating an admin user: 
In backend folder run the script 'create-admin'. This will create an admin user in the database to access admin page: username: admin, password: password
Run application:
in backend folder: launch server with 'yarn start'
in frontend folder: launch forntend server with 'yarn start'
The application should automatically open in your browser.
