import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { functions, inngest } from "./config/inngest.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is Up and running");
  });
};

startServer();
