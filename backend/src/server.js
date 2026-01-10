<<<<<<< HEAD
// import express from "express";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";

// import cors from "cors";

// import { ENV } from "./config/env.js";
// import { connectDB } from "./config/db.js";

// import { functions, inngest } from "./config/inngest.js";
// import adminRoutes from "./routes/admin.route.js";
// import userRoutes from "./routes/user.route.js";
// import orderRoutes from "./routes/order.route.js";
// import productRoutes from "./routes/product.route.js";
// import reviewRoutes from "./routes/review.route.js";
// import cartRoutes from "./routes/cart.route.js";


// const app = express();

// app.use(express.json());

// // app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // credentials: true allows cookies to be sent along with requests

// app.use(clerkMiddleware());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://ecommerce-app-black-three-13.vercel.app",
//     ],
//     credentials: true,
//   })
// );

// app.use("/api/inngest", serve({
//   client: inngest, 
//   functions,
//   serveHost: "https://ecommerce-app-57w5.onrender.com"
// }));

// app.get("/", (req, res) => res.send("Backend Server is Running Successfully!"));

// app.use("/api/admin", adminRoutes)
// app.use("/api/user", userRoutes)
// app.use("/api/orders", orderRoutes)
// app.use("/api/products", productRoutes)
// app.use("/api/reviews", reviewRoutes)
// app.use("/api/cart", cartRoutes)

// app.get("/api/health", (req, res) => res.status(200).json({ message: "Success" }));



// const startServer = async () => {
//   await connectDB();
//   app.listen(ENV.PORT, () => {
//     console.log(`Server is Up and running on port ${ENV.PORT}`);
//   });
// };

// startServer();


import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
=======
import express from "express";
import { clerkMiddleware } from "@clerk/express";
>>>>>>> 272645f6a96aefc2caa24d18d67b172122614091
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

<<<<<<< HEAD
=======
// CORS - BEFORE Clerk middleware
>>>>>>> 272645f6a96aefc2caa24d18d67b172122614091
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

<<<<<<< HEAD
// Apply Clerk but don't enforce authentication yet
app.use(clerkMiddleware());
=======
// Clerk middleware with public routes configuration
app.use(
  clerkMiddleware({
    publishableKey: ENV.CLERK_PUBLISHABLE_KEY,
    // Define public routes that DON'T require authentication
    publicRoutes: [
      "/",
      "/api/health",
      "/api/products",
      "/api/products/(.*)",
      "/api/reviews",
      "/api/reviews/(.*)",
    ],
  })
);
>>>>>>> 272645f6a96aefc2caa24d18d67b172122614091

app.use("/api/inngest", serve({
  client: inngest, 
  functions,
  serveHost: "https://ecommerce-app-57w5.onrender.com"
}));

app.get("/", (req, res) => res.send("Backend Server is Running Successfully!"));

<<<<<<< HEAD
// Public routes - NO requireAuth()
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// Protected routes - WITH requireAuth()
app.use("/api/admin", requireAuth(), adminRoutes);
app.use("/api/user", requireAuth(), userRoutes);
app.use("/api/orders", requireAuth(), orderRoutes);
app.use("/api/cart", requireAuth(), cartRoutes);
=======
// Public routes (anyone can access)
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// Protected routes (require authentication - handle in route files)
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
>>>>>>> 272645f6a96aefc2caa24d18d67b172122614091

app.get("/api/health", (req, res) => res.status(200).json({ message: "Success" }));

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server is Up and running on port ${ENV.PORT}`);
  });
};

startServer();