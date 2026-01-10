import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import { functions, inngest } from "./config/inngest.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import productRoutes from "./routes/product.route.js";
import reviewRoutes from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();

app.use(express.json());

// ✅ CORS FIRST - BEFORE Clerk
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-app-black-three-13.vercel.app",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Clerk with public routes configuration
app.use(
  clerkMiddleware({
    // Make these routes public (no auth required)
    publishableKey: ENV.CLERK_PUBLISHABLE_KEY,
  })
);

app.use("/api/inngest", serve({
  client: inngest, 
  functions,
  serveHost: "https://ecommerce-app-57w5.onrender.com"
}));

app.get("/", (req, res) => res.send("Backend Server is Running Successfully!"));

// ✅ Public routes (no auth needed)
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// ✅ Protected routes (auth required - handled in route files or here)
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => res.status(200).json({ message: "Success" }));

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server is Up and running on port ${ENV.PORT}`);
  });
};

startServer();