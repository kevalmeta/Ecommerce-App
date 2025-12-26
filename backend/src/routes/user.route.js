import {Router} from "express";
import { addAddress, addToWishlist, deleteSAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router =Router();

router.use(protectRoute);

//address routers
router.post("/addresses",protectRoute,addAddress)
router.get("/addresses",protectRoute,getAddresses)
router.put("/addresses/:addressId",protectRoute,updateAddress)
router.delete("/addresses/:addressId",protectRoute,deleteSAddress)

//wishlist routes

router.put("/wishlist",addToWishlist)
router.delete("/wishlist/:productId",removeFromWishlist)
router.get("/wishlist",getWishlist)

export default router;