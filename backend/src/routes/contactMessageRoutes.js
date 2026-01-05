const express = require("express");
const contactMessageRoutes = express.Router();
const contactMessageController = require("../controllers/contactmessageController");

contactMessageRoutes.post("/send", contactMessageController.postMessage);
exports.contactMessageRoutes = contactMessageRoutes;
