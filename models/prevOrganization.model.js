import mongoose from "mongoose";

const prevOrganizationSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
        default: "", 
    }, 
    designation: {
        type: String,
        default: "", 
    },
    lastCTC: {
        type: Number,
        default: 0, 
    },
    joiningDate: {
        type: Date,
        default: null,
    },
    leavingDate: {
        type: Date,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const PrevOrganization = mongoose.model("PrevOrganization", prevOrganizationSchema);

export default PrevOrganization;
