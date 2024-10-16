import express from "express";
import multer from "multer";
import { saveFile, getFile } from "../controllers/documents.controllers.js"; // Import the file service

const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Route for file upload
router.post("/upload", upload.single("pdf"), async (req, res) => {
  const empId = req.body.emp_id;
  const file = req.file;

  try {
    if (!file || !empId) {
      return res.status(400).send("File or Employee ID missing");
    }

    await saveFile(empId, file); // Call the service to save the file
    res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).send("Error uploading file");
  }
});

// For reading the pdf
router.get("/read/:empId", getFile);

export default router;
