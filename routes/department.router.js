import express from "express";
import depController from "../controllers/department.controller.js";
const router = express.Router();

// for creating departments
router.route("/createDepartment").post(depController.createDepartment);
// for fetching departments
router.route("/getDepartments").get(depController.fetchDepartments);

export default router;
