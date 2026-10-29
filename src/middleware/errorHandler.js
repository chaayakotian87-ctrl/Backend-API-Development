// Centralized error handling.
// Every error in the app ends up here, so responses always look the same.

// Runs when no route matched the request
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// Express recognizes an error handler by its 4 parameters (err, req, res, next)
function errorHandler(err, req, res, next) {
  // The client sent broken JSON, for example a missing quote or comma
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body",
    });
  }

  // The request body was bigger than Express allows (default 100kb)
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Request body is too large",
    });
  }

  // Anything else is an unexpected server error.
  // Log the details for the developer, but do not leak them to the client.
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = { notFoundHandler, errorHandler };
