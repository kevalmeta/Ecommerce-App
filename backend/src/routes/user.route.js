import {Router} from "express";
import { addAddress, addToWishlist, deleteSAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router =Router();

router.use(protectRoute);

console.log("✅ USER ROUTES LOADED");

// Wishlist routes
router.post("/wishlist", protectRoute, addToWishlist);
router.get("/wishlist", protectRoute, getWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);

// Address routes
router.post("/addresses", protectRoute, addAddress);
router.get("/addresses", protectRoute, getAddresses);
router.put("/addresses/:addressId", protectRoute, updateAddress);
router.delete("/addresses/:addressId", protectRoute, deleteSAddress);

export default router;
