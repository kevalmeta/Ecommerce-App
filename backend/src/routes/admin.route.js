import { Router } from "express";
import { createProduct,getAllCustomers,getAllProducts,getDashboardStats,updateOrderStatus,updateProducts } from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

//opti
router.use(protectRoute,adminOnly)

router.post("/products",upload.array("images",3),createProduct);
router.get("/products",getAllProducts);
router.put("/products/:id",upload.array("images",3),updateProducts);

router.get("/orders",getAllProducts)
router.patch("/orders/:orderId/status",updateOrderStatus) // pending -> shipped -> deliverd

router.get("/customers",getAllCustomers)
router.get("/stats",getDashboardStats)

export default router;