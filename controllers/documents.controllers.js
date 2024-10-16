import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "test";
const collectionName = "documents";

// Function to save the file to MongoDB
export async function saveFile(empId, file) {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Save the file data along with employee ID
    await collection.insertOne({
      emp_id: empId,
      file: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
  } finally {
    await client.close();
  }
}

// Function to read the PDF file
export const getFile = async (req, res) => {
  const { empId } = req.params; // Extract empId from the request parameters

  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Find the file using empId in metadata
    const file = await collection.findOne({ emp_id: empId });

    if (!file) {
      console.log("File not found in the database.");
      return res.status(404).send("File not found");
    }

    // Set headers and send the file data
    res.setHeader("Content-Type", file.file.contentType);
    res.setHeader("Content-Disposition", `attachment; filename="file.pdf"`);
    res.send(file.file.data.buffer); // Send the file buffer directly
  } catch (error) {
    console.error(`Error fetching file: ${error.message}`);
    res.status(500).send(`Error: ${error.message}`);
  } finally {
    await client.close();
  }
};
