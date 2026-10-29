// In-memory data store.
// The data lives in this array while the server is running.
// When the server restarts, it resets to the sample users below.

const users = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", age: 22 },
  { id: 2, name: "Priya Singh", email: "priya@example.com", age: 25 },
  { id: 3, name: "John Smith", email: "john@example.com", age: 30 },
];

// The next ID to give to a new user. IDs always go up and are never reused.
let nextId = 4;

function getNextId() {
  const id = nextId;
  nextId += 1;
  return id;
}

module.exports = { users, getNextId };
