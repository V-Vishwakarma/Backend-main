//create routes for the prevOrganization

import express from "express";

import {
    createPrevOrganization,
    deletePrevOrganization,
    getPrevOrganization,
    updatePrevOrganization,
    } from "../controllers/prevOrganization.controller.js";

const router = express.Router();

router.post("/createPrevOrganization", createPrevOrganization);

router.get("/getPrevOrganizationbyId/:id", getPrevOrganization);

router.put("/updatePrevOrganizationbyId/:id", updatePrevOrganization);

router.delete("/deletePrevOrganizationbyId/:id", deletePrevOrganization);

export default router;

