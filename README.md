# User Management REST API

A simple, professional backend API built with **Node.js** and **Express.js** for the DecodeLabs Full Stack Development internship (Project 2: Backend API Development).

## Objective

Build the "brain" of an application: an API that accepts user input, validates it, processes the request on the server, and returns clear JSON responses with the correct HTTP status codes.

## Features

- Full CRUD for users: create, read (all or one), update, delete
- RESTful URLs: resources are nouns, HTTP methods are verbs
- Input validation on every POST and PUT ("never trust the client")
- Consistent JSON response format for success and errors
- Correct HTTP status codes (200, 201, 400, 404, 413, 500)
- Centralized error handling, including malformed JSON and unknown routes
- Simple in-memory data store (no database needed)
- Importable Postman collection with automated checks

## Technologies Used

- Node.js (v18 or newer)
- Express.js 5
- JavaScript
- REST API and JSON
- Postman (for testing)

## Project Structure

```
backend-api-project/
├── src/
│   ├── controllers/
│   │   └── userController.js    # Logic for each endpoint
│   ├── routes/
│   │   └── userRoutes.js        # Maps URL + method to a controller
│   ├── middleware/
│   │   ├── validateUser.js      # Checks name, email, age
│   │   └── errorHandler.js      # 404 and central error handling
│   ├── data/
│   │   └── users.js             # In-memory users array
│   └── app.js                   # Starts the server
├── User-Management-API.postman_collection.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Installation

1. Install [Node.js](https://nodejs.org) (v18 or newer). Check with `node -v`.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## How to Run

```bash
npm start
```

You should see: `Server running at http://localhost:3000`

Open http://localhost:3000 in a browser to check that it works. Stop the server with `Ctrl + C`.
To use another port: `PORT=4000 npm start` (Mac/Linux) or `set PORT=4000 && npm start` (Windows cmd).

> Data is stored in memory. Restarting the server resets it to the 3 sample users.

## API Endpoints

| Method | Endpoint         | Description         | Success | Errors   |
|--------|------------------|---------------------|---------|----------|
| GET    | `/api/users`     | Get all users       | 200     |          |
| GET    | `/api/users/:id` | Get one user by ID  | 200     | 400, 404 |
| POST   | `/api/users`     | Create a new user   | 201     | 400      |
| PUT    | `/api/users/:id` | Update a user       | 200     | 400, 404 |
| DELETE | `/api/users/:id` | Delete a user       | 200     | 400, 404 |

## Data Model

| Field   | Type    | Notes                         |
|---------|---------|-------------------------------|
| `id`    | number  | Created by the server         |
| `name`  | string  | Required                      |
| `email` | string  | Required, valid email format  |
| `age`   | number  | Required, whole number 1 to 120 |

## Validation Rules

| Field   | Rule | Error message |
|---------|------|---------------|
| name    | Required | `Name is required` |
| name    | Must be text and not empty or spaces only | `Name must be a non-empty text value` |
| email   | Required | `Email is required` |
| email   | Must match `something@domain.ext` | `Invalid email address` |
| age     | Required | `Age is required` |
| age     | Must be a JSON number (not text) | `Age must be a valid number` |
| age     | Whole number from 1 to 120 | `Age must be a whole number between 1 and 120` |

Other checks: the `:id` in the URL must be a number (400), and the request body must be valid JSON (400).
If several rules fail, all messages are returned together, separated by `;`.
The server trims spaces from `name` and `email`, and stores the email in lowercase.

## Response Format

Success:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": { "id": 4, "name": "Riya Verma", "email": "riya@example.com", "age": 21 }
}
```

Error:

```json
{
  "success": false,
  "message": "Invalid email address"
}
```

`GET /api/users` also includes a `count` field.

## Request and Response Examples

### 1. GET all users

`GET http://localhost:3000/api/users` → **200 OK**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "count": 3,
  "data": [
    { "id": 1, "name": "Aarav Sharma", "email": "aarav@example.com", "age": 22 },
    { "id": 2, "name": "Priya Singh", "email": "priya@example.com", "age": 25 },
    { "id": 3, "name": "John Smith", "email": "john@example.com", "age": 30 }
  ]
}
```

### 2. GET user by ID

`GET http://localhost:3000/api/users/1` → **200 OK**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": { "id": 1, "name": "Aarav Sharma", "email": "aarav@example.com", "age": 22 }
}
```

### 3. POST create a user

`POST http://localhost:3000/api/users`

Request body:

```json
{ "name": "Riya Verma", "email": "riya@example.com", "age": 21 }
```

→ **201 Created**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": { "id": 4, "name": "Riya Verma", "email": "riya@example.com", "age": 21 }
}
```

### 4. POST invalid data

Request body:

```json
{ "name": "Sam", "email": "not-an-email" }
```

→ **400 Bad Request**

```json
{
  "success": false,
  "message": "Invalid email address; Age is required"
}
```

### 5. PUT update a user

`PUT http://localhost:3000/api/users/2`

Request body (send all three fields):

```json
{ "name": "Priya Singh", "email": "priya.new@example.com", "age": 26 }
```

→ **200 OK**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { "id": 2, "name": "Priya Singh", "email": "priya.new@example.com", "age": 26 }
}
```

### 6. DELETE a user

`DELETE http://localhost:3000/api/users/3` → **200 OK**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": { "id": 3, "name": "John Smith", "email": "john@example.com", "age": 30 }
}
```

### 7. Non-existing user

`GET http://localhost:3000/api/users/999` → **404 Not Found**

```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

## Testing with Postman

Start the server first (`npm start`).

### Option A: Import the ready-made collection

1. Open Postman and click **Import**.
2. Choose `User-Management-API.postman_collection.json`.
3. Open the collection and click **Run**, then **Run User Management API**.
4. All 7 requests should show green passed tests (14 checks).

### Option B: Create each request by hand

For every request, use the base URL `http://localhost:3000`.
For POST and PUT: open the **Body** tab, choose **raw**, choose **JSON** in the dropdown, and paste the body.

| # | Test | Method and URL | Body | Expected |
|---|------|----------------|------|----------|
| 1 | Get all users | GET `/api/users` | none | 200, list of users |
| 2 | Get user by ID | GET `/api/users/1` | none | 200, one user |
| 3 | Create user | POST `/api/users` | `{"name":"Riya Verma","email":"riya@example.com","age":21}` | 201, new user with an ID |
| 4 | Invalid data | POST `/api/users` | `{"name":"Sam","email":"not-an-email"}` | 400, error message |
| 5 | Update user | PUT `/api/users/2` | `{"name":"Priya Singh","email":"priya.new@example.com","age":26}` | 200, updated user |
| 6 | Delete user | DELETE `/api/users/3` | none | 200, deleted user |
| 7 | Missing user | GET `/api/users/999` | none | 404, "not found" message |

After step 6, run step 1 again to confirm the user is gone.

## Key Concepts (for explaining the project)

- **API**: a set of URLs a program can call to get or change data.
- **REST**: a style where URLs name things (`/users`) and the HTTP method says the action.
- **GET / POST / PUT / DELETE**: read / create / update / remove.
- **JSON**: a text format for data, written as `{ "key": "value" }`.
- **Request and response**: the client sends a request (method, URL, optional JSON body); the server sends back a response (status code and JSON).
- **Status codes**: 2xx success, 4xx the client made a mistake, 5xx the server failed.
- **Validation**: the server checks all input because clients can send anything, by mistake or on purpose.
- **Flow of one request**: `app.js` → `express.json()` reads the body → route matches URL and method → `validateUser` checks input → controller does the work → JSON response. Any error goes to `errorHandler`.

## Future Enhancements

- Store users in a database (MongoDB or PostgreSQL) so data survives restarts
- Reject duplicate email addresses (HTTP 409)
- Add `PATCH` for partial updates
- Add pagination, search, and sorting on `GET /api/users`
- Add authentication (JWT) and role-based access
- Add automated tests (Jest and Supertest)
- Add rate limiting and security headers
- Generate API documentation with Swagger / OpenAPI

## License

ISC
