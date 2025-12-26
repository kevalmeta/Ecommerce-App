import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import { functions, inngest } from "./config/inngest.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";


const app = express();
app.use(cors()); //

app.use(express.json());

app.use("/api/inngest", serve({ 
  client: inngest, 
  functions,
  serveHost: "https://ecommerce-app-57w5.onrender.com" 
}));

app.get("/", (req, res) => res.send("Backend Server is Running Successfully!"));

app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)

app.get("/api/health", (req, res) => res.status(200).json({ message: "Success" }));


app.use(clerkMiddleware()); 

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server is Up and running on port ${ENV.PORT}`);
  });
};

startServer();