import express from "express";
import qrController from "../controllers/qr.controller.js";
const router = express.Router();

// for generating and saving QR Code
router.route("/generateAndSave").post(qrController.saveQR);

// for retreiveing QR Code as image
router.route("/getQR").get(qrController.getQR);

export default router;
