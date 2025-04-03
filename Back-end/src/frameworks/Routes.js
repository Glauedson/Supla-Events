const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("./AuthenticateToken");
const EventController = require("../adapters/controllers/EventController");

const routes = Router();

/* User Routes */
routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);

/* Event Routes */
routes.get("/event/all", EventController.getAllEvents);

/* Authenticate Routes */
routes.post("/auth/profile", Authenticate, UserController.profileUser);

module.exports = routes;
