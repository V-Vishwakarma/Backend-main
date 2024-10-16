import express from "express";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";
import auth from "../middlewares/authorization.js";

const router = express.Router();

/* Tested */
router.post("/createEmployee", createEmployee);
router.get("/getEmployee", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
/*-----*/

export default router;
