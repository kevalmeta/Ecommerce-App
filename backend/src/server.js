import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { functions, inngest } from "./config/inngest.js";

// ... existing imports

const app = express();

// 1. Core middleware (JSON parsing must be first)
app.use(express.json());

// 2. PUBLIC ROUTES (Inngest must be public)
// Place this BEFORE any auth middleware
app.use("/api/inngest", serve({ 
  client: inngest, 
  functions,
  serveHost: "https://ecommerce-app-57w5.onrender.com" 
}));

// Root and Health routes (also public)
app.get("/", (req, res) => res.send("Backend Server is Running Successfully!"));
app.get("/api/health", (req, res) => res.status(200).json({ message: "Success" }));

// 3. AUTH MIDDLEWARE (For your private API routes)
app.use(clerkMiddleware()); 

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server is Up and running on port ${ENV.PORT}`);
  });
};

startServer();