import express from "express";
const router = express.Router();
import logicsController from "../controllers/logics.controller.js";
// for creating organization
router.route("/calculateSallary").get(logicsController.calculateSallary);

export default router;
