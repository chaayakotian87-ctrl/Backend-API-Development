// Validation middleware: checks the request body BEFORE the controller runs.
// "Never trust the client" - every value is checked on the server.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AGE = 1;
const MAX_AGE = 120;

function validateUser(req, res, next) {
  // If no JSON body was sent, req.body is undefined, so fall back to {}
  const { name, email, age } = req.body || {};
  const errors = [];

  // name: required, must be text, must not be empty
  if (name === undefined || name === null) {
    errors.push("Name is required");
  } else if (typeof name !== "string" || name.trim() === "") {
    errors.push("Name must be a non-empty text value");
  }

  // email: required, must look like an email address
  if (email === undefined || email === null) {
    errors.push("Email is required");
  } else if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    errors.push("Invalid email address");
  }

  // age: required, must be a whole number in a reasonable range
  if (age === undefined || age === null) {
    errors.push("Age is required");
  } else if (typeof age !== "number" || !Number.isFinite(age)) {
    errors.push("Age must be a valid number");
  } else if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE) {
    errors.push(`Age must be a whole number between ${MIN_AGE} and ${MAX_AGE}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join("; "),
    });
  }

  // Save the cleaned values so the controller can use them directly
  req.validUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age,
  };
  next();
}

module.exports = validateUser;
