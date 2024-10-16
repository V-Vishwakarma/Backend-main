import express from "express";
import { schedulePerformanceReview, getPerformanceReview, getAllPerformanceReview, updatePerformanceReview, deletePerformanceReview } from "../controllers/performanceReview.controller.js";


const router = express.Router();

/* Tested */

router.post("/", schedulePerformanceReview);
router.get("/:employeeId", getPerformanceReview);
router.get("/", getAllPerformanceReview);
router.put("/:employeeId", updatePerformanceReview);
router.delete("/:employeeId", deletePerformanceReview);

/*-----*/

export default router;

