import express from "express";
import teamController from "../controllers/team.controller.js";
const router = express.Router();

// for creating organization
router.route("/createteam").post(teamController.createTeam);

export default router;
