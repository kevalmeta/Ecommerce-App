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

// 🔍 DEBUG: Log all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// CORS FIRST
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

console.log('✅ CORS configured for:', [
  "http://localhost:5173",
  "https://ecommerce-app-black-three-13.vercel.app",
]);

// 🔍 DEBUG: Log before Clerk
app.use((req, res, next) => {
  console.log('🔐 Before Clerk:', req.path);
  next();
});

// CLERK - Comment out temporarily to test
// app.use(clerkMiddleware());

// 🔍 DEBUG: Log after Clerk
app.use((req, res, next) => {
  console.log('✅ After Clerk:', req.path);
  next();
});

app.use("/api/inngest", serve({
  client: inngest, 
  functions,
  serveHost: "https://ecommerce-app-57w5.onrender.com"
}));

app.get("/", (req, res) => {
  console.log('🏠 Homepage hit');
  res.send("Backend Server is Running Successfully!");
});

// Routes
console.log('📦 Registering routes...');
app.use("/api/products", (req, res, next) => {
  console.log('📦 Products route hit:', req.method, req.path);
  next();
}, productRoutes);

app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  console.log('💚 Health check');
  res.status(200).json({ message: "Success" });
});

// 🔍 404 Handler - catch unhandled routes
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.path);
  res.status(404).json({ message: "Route not found", path: req.path });
});

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();