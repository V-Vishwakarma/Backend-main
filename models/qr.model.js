import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
  empId: { type: String, unique: true },
  qrCode: String, // Base64 string
});

const QRModel = mongoose.model("Qr", qrSchema);
export default QRModel;
