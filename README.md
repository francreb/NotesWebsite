# NotesWebsite
To open and run the full-stack notes application, you'll need to follow these steps to set up both the backend and frontend. Here’s a step-by-step guide:

Prerequisites Node.js: Ensure you have Node.js installed on your machine. You can download it from nodejs.org. PostgreSQL: Make sure you have PostgreSQL installed and running. You can download it from postgresql.org. Git: Optional, but recommended for version control. Step 1: Set Up the Backend Clone the Backend Repository:

bash

Run Copy code git clone cd notes-backend Install Dependencies:

bash

Run Copy code npm install Create the Database:

Open your PostgreSQL command line or GUI (like pgAdmin) and create a new database: sql

Run Copy code CREATE DATABASE notes_app; Configure Environment Variables:

Create a .env file in the backend directory with the following content: env

Run Copy code NODE_ENV=development PORT=5000 DB_HOST=localhost DB_PORT=5432 DB_NAME=notes_app DB_USER=your_postgres_username DB_PASSWORD=your_postgres_password JWT_SECRET=your_super_secret_jwt_key Run Migrations:

Run the following command to create the necessary tables in your database: bash

Run Copy code npx sequelize-cli db:migrate Start the Backend Server:

bash

Run Copy code npm run dev Your backend server should now be running on http://localhost:5000. Step 2: Set Up the Frontend Clone the Frontend Repository:

bash

Run Copy code git clone cd notes-frontend Install Dependencies:

bash

Run Copy code npm install Configure Environment Variables:

Create a .env file in the frontend directory with the following content: env

Run Copy code REACT_APP_API_URL=http://localhost:5000 Start the Frontend Application:

bash

Run Copy code npm start Your frontend application should now be running on http://localhost:3000. Step 3: Access the Application Open your web browser and navigate to http://localhost:3000. You should see the login page of your notes application. Step 4: Register and Log In Register a New User:

Click on the "Sign up here" link to create a new account. Fill in the registration form and submit. Log In:

After registering, you can log in with the credentials you just created. Manage Notes:

Once logged in, you can create, edit, delete, and archive notes.
