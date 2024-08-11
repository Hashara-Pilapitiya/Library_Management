# Library Management System


This is a full-stack Library Management System built using C# .NET for the backend with SQLite database and React with TypeScript for the frontend. The application allows users to authenticate and manage book records such as create, read, update and delete through a user-friendly interface. 

## Prerequisites
Before you begin, ensure you have the following installed on your system:<br /><br />
💠.NET SDK (version 6.0 or higher)<br />
💠Node.js (version 14 or higher)<br />
💠SQLite<br />
💠Git


## Backend Setup
💠Clone the Repository:
```
git clone https://github.com/Hashara-Pilapitiya/Library_Management
cd Library_Management/backend
```

💠Restore NuGet Packages:
```
dotnet restore
```

💠Apply Migrations and Create the Database:
```
dotnet ef migrations add Test
dotnet ef database update
```

💠Run the Backend:
```
dotnet run
```

<p>The backend API will be available at <b>http://localhost:5298</b>.</p>

## Frontend Setup
💠Navigate to the Frontend Directory:
```
cd frontend
```

💠Install Dependencies:
```
npm install
```

💠Run the Frontend:
```
npm run dev
```

<p>The frontend application will be available at <b>http://localhost:5173</b>.</p>

## Running the Application
To run the full application:<br /><br />
1. Start the backend server by following the Backend Setup instructions.<br />
2. Start the frontend server by following the Frontend Setup instructions.<br />
3. Open your browser and navigate to http://localhost:5173 to interact with the application.

## Features
💠User authentication with protected routes<br />
💠Allow users create, upate, view and delete books

## API Documentation
Books API Endpoints<br /><br />
💠GET /api/books: Retrieve a list of all books.<br />
💠GET /api/books/{id}: Retrieve a specific book by ID.<br />
💠POST /api/books: Create a new book.<br />
💠PUT /api/books/{id}: Update an existing book by ID.<br />
💠DELETE /api/books/{id}: Delete a book by ID.

## Feedback
All feedbacks are welcome on <a>hasharanethmi2020@gmail.com</a>
