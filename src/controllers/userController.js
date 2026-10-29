// Controllers hold the server-side logic: what to do for each request.

const { users, getNextId } = require("../data/users");

// Turns the :id part of the URL into a number (or null if it is not a whole number)
function parseId(rawId) {
  return /^\d+$/.test(rawId) ? Number(rawId) : null;
}

// GET /api/users
function getAllUsers(req, res) {
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    count: users.length,
    data: users,
  });
}

// GET /api/users/:id
function getUserById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  }

  const user = users.find((item) => item.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found` });
  }

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
}

// POST /api/users  (body already validated by validateUser)
function createUser(req, res) {
  const newUser = { id: getNextId(), ...req.validUser };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
}

// PUT /api/users/:id  (body already validated by validateUser)
function updateUser(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  }

  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found` });
  }

  users[index] = { id, ...req.validUser };

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[index],
  });
}

// DELETE /api/users/:id
function deleteUser(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  }

  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found` });
  }

  const [deletedUser] = users.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
