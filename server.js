import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./utils/db.js";
import cookieParser from "cookie-parser";
import orgRouter from "./routes/organization.router.js";
import depRouter from "./routes/department.router.js";
import roleRouter from "./routes/role.router.js";
import teamRouter from "./routes/teams.router.js";
import logicsRouter from "./routes/logics.router.js";
import employeeRouter from "./routes/employees.router.js";
import payrollRouter from "./routes/payroll.router.js";
import leaveRequestRouter from "./routes/leave.router.js";
import performanceReviewRouter from "./routes/performanceReview.router.js";
import jobPostingRouter from "./routes/jobPosting.router.js";
import applicantRouter from "./routes/applicants.router.js";
import benefitsRouter from "./routes/benefits.router.js";
import benefitsClaimsRouter from "./routes/benefitsClaims.router.js";
import salaryRouter from "./routes/salary.router.js";
import prevOrganizationRouter from "./routes/prevOrganization.router.js";
import uploadRouter from "./routes/documents.router.js"; // Import the new router
import qrRouter from "./routes/qr.route.js";
import blogRouter from "./routes/blog.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Handling Organizational Structure Routes
app.use("/api/orgStructure/organization", orgRouter);
app.use("/api/orgStructure/departments", depRouter);
app.use("/api/orgStructure/jobRoles", roleRouter);
app.use("/api/orgStructure/teams", teamRouter);

// API for Employee
app.use("/api/employees", employeeRouter);

// API for Payroll
app.use("/api/payroll", payrollRouter);

// API for Leave Request
app.use("/api/leaves", leaveRequestRouter);

// API for Performance Review
app.use("/api/performanceReviews", performanceReviewRouter);

// API for Job Posting
app.use("/api/jobPosting", jobPostingRouter);

// API for Applicants Applying for Job
app.use("/api/applicants", applicantRouter);

// API for Benefits
app.use("/api/benefits", benefitsRouter);

// API for Benefits Claims
app.use("/api/benefitsClaims", benefitsClaimsRouter);

// API for Logics and Calculations
app.use("/api/logics", logicsRouter);

// API for Salary
app.use("/api/salary", salaryRouter);

// API for Previous Organization
app.use("/api/prevOrganization", prevOrganizationRouter);

// API for File Upload
app.use("/api/documents", uploadRouter); // Add this line for file upload routes

// API for QR related CRUD
app.use("/api/QR/", qrRouter);

// API for the blog
app.use("/api/blogs", blogRouter);

// Server Start Setup
const startServer = async () => {
  try {
    await connectDb(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running at Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();




