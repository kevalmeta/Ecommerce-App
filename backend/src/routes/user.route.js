// import {Router} from "express";
// import { addAddress, addToWishlist, deleteSAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
// import {protectRoute} from "../middleware/auth.middleware.js"

// const router =Router();

// router.use(protectRoute);

// //address routers
// router.post("/addresses",addAddress)
// router.get("/addresses",getAddresses)
// router.put("/addresses/:addressId",updateAddress)
// router.delete("/addresses/:addressId",deleteSAddress)

// //wishlist routes
// router.post("/",addToWishlist)
// router.delete("/:productId",removeFromWishlist)
// router.get("/",getWishlist)

// export default router;

import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteSAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/user.controller.js";

const router = Router();

// Wishlist routes - NO AUTH for testing
console.log('✅ Registering wishlist routes');
router.post("/wishlist", async (req, res) => {
  console.log('📦 POST /wishlist hit!');
  console.log('Body:', req.body);
  try {
    await addToWishlist(req, res);
  } catch (error) {
    console.error('Error in wishlist route:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/wishlist", async (req, res) => {
  console.log('📋 GET /wishlist hit!');
  try {
    await getWishlist(req, res);
  } catch (error) {
    console.error('Error in wishlist route:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/wishlist/:productId", async (req, res) => {
  console.log('🗑️ DELETE /wishlist hit!');
  console.log('ProductId:', req.params.productId);
  try {
    await removeFromWishlist(req, res);
  } catch (error) {
    console.error('Error in wishlist route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Address routes with auth
router.use(protectRoute);
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteSAddress);

export default router;