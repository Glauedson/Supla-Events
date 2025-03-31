const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("./AuthenticateToken");

const routes = Router();

/* User Routes */
routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);

/* Authenticate Routes */
routes.post("/auth/profile", Authenticate, UserController.profileUser);

module.exports = routes;
