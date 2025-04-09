import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";

// ======================================
//              ORDER ROUTES
// ======================================
const router = express.Router();

// ------------------------------
//       PROTECTED ROUTES
//       (Authenticated Users)
// ------------------------------

// CREATE NEW ORDER
router.post("/", authenticate, (req: express.Request, res: express.Response) => {
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order: { 
      id: "new-order-id", 
      ...req.body 
    },
  });
});

// GET USER'S ORDERS
router.get("/user", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "User orders",
    orders: [],
  });
});

// GET SPECIFIC ORDER
router.get("/:id", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: `Order with ID ${req.params.id} found`,
    order: { 
      id: req.params.id, 
      status: "pending" 
    },
  });
});

// CANCEL ORDER
router.put("/:id/cancel", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: `Order with ID ${req.params.id} cancelled successfully`,
  });
});

// ------------------------------
//        ADMIN ROUTES
// (Authenticated + Authorized)
// ------------------------------

// GET ALL ORDERS (ADMIN ONLY)
router.get(
  "/", 
  authenticate, 
  authorize("admin"), 
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: "All orders",
      orders: [],
    });
  }
);

// UPDATE ORDER STATUS (ADMIN ONLY)
router.put(
  "/:id/status", 
  authenticate, 
  authorize("admin"), 
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Order status updated for order with ID ${req.params.id}`,
      order: { 
        id: req.params.id, 
        status: req.body.orderStatus 
      },
    });
  }
);

export default router;