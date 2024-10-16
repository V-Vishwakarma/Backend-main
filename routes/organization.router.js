import express from "express";
import orgController from "../controllers/organization.controller.js";
const router = express.Router();

// for creating organization
router.route("/createOrg").post(orgController.createOrg);
// for fetching organization id
router.route("/getId").get(orgController.fetchOrgId);
// for deleting organization
router.route("/deleteOrg").delete(orgController.deleteOrg);

export default router;
