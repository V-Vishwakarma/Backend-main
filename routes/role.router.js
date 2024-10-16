import express from "express";
import roleController from "../controllers/role.controller.js";
const router = express.Router();

// for creating organization
router.route("/createRole").post(roleController.createRole);
// for fetching roles by id
router.route("/getRoleById").get(roleController.fetchRoleById);
// for fetching roles by level
router.route("/getRolesByLevel").get(roleController.fetchRolesByLevel);
// for fetching roles by level and department
router
  .route("/getRolesByLevelAndDep")
  .get(roleController.fetchRolesByLevelAndDep);
export default router;
