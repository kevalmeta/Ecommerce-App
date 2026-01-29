import { Router } from "express";
import router from "./admin.route.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPaymentIntent } from "../controllers/payment.controller.js";

const route = Router();

router.post("/create-intent",protectRoute,createPaymentIntent);

export default router;