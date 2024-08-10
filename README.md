# Library Management System


This is a full-stack Library Management System built using C# .NET for the backend and React with TypeScript for the frontend. The application allows users to manage book records such as create, read, update and delete through a user-friendly interface. 

## Prerequisites
Before you begin, ensure you have the following installed on your system:
💠.NET SDK (version 6.0 or higher)
💠Node.js (version 14 or higher)
💠SQLite
💠Git


## Backend Setup
💠Clone the Repository:
```
git clone https://github.com/your-username/library-management.git
cd library-management/backend
```

💠Restore NuGet Packages:
```
dotnet restore
```

💠Apply Migrations and Create the Database:
```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

💠Run the Backend:
```
dotnet run
```

<p>The backend API will be available at <b>http://localhost:5298/api/books</b></p>.

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
To run the full application:
1. Start the backend server by following the Backend Setup instructions.
2. Start the frontend server by following the Frontend Setup instructions.
3. Open your browser and navigate to http://localhost:5173 to interact with the application.

## API Documentation
Books API Endpoints
💠GET /api/books: Retrieve a list of all books.
💠GET /api/books/{id}: Retrieve a specific book by ID.
💠POST /api/books: Create a new book.
💠PUT /api/books/{id}: Update an existing book by ID.
💠DELETE /api/books/{id}: Delete a book by ID.
