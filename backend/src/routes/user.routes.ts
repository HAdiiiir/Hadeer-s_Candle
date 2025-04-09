import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";

// ======================================
//              USER ROUTES
// ======================================
const router = express.Router();

// ------------------------------
//         ADMIN ROUTES
// (Authenticated + Authorized)
// ------------------------------

// GET ALL USERS (ADMIN ONLY)
router.get(
  "/",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: "User routes are working",
      users: [],
    });
  }
);

// GET USER BY ID (ADMIN ONLY)
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `User with ID ${req.params.id} found`,
      user: {
        id: req.params.id,
        name: "Sample User",
        email: "user@example.com",
      },
    });
  }
);

// DELETE USER (ADMIN ONLY)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `User with ID ${req.params.id} deleted successfully`,
    });
  }
);

export default router;