// Entry point: creates the Express app, connects everything and starts the server.

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Read JSON from request bodies and make it available as req.body
app.use(express.json());

// Simple welcome and health-check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Management API is running. Try GET /api/users",
  });
});

// All user routes start with /api/users
app.use("/api/users", userRoutes);

// These two must stay LAST: unknown routes, then error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
