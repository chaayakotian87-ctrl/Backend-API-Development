// Routes connect a URL + HTTP method to the controller function that handles it.

const express = require("express");
const controller = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");

const router = express.Router();

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", validateUser, controller.createUser);
router.put("/:id", validateUser, controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
