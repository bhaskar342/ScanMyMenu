const express = require("express");
const restaurantRoutes = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/roleMiddleware");
const restaurantController = require("../../controllers/superadminController/restaurantsController");

restaurantRoutes.get(
  "/all",
  verifyToken,
  authorizeRoles("superadmin"),
  restaurantController.getAllRestaurants
);

restaurantRoutes.put(
  "/toggle-status/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  restaurantController.toggleRestaurantStatus
);

exports.restaurantRoutes = restaurantRoutes;
