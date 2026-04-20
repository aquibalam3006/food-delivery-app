import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrders,
  allOrders,
  updateStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// 🔥 PROTECTED ROUTES
router.post("/place", authMiddleware, placeOrder);
router.post("/userorders", authMiddleware, userOrders);

// ADMIN
router.get("/list", allOrders);
router.post("/status", updateStatus);

export default router;