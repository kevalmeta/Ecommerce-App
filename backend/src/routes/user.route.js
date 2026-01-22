import {Router} from "express";
import { addAddress, addToWishlist, deleteSAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router =Router();

router.use(protectRoute);

//address routers
router.post("/addresses",addAddress)
router.get("/addresses",getAddresses)
router.put("/addresses/:addressId",updateAddress)
router.delete("/addresses/:addressId",deleteSAddress)

//wishlist routes
router.post("/",addToWishlist)
router.delete("/:productId",removeFromWishlist)
router.get("/",getWishlist)

export default router;