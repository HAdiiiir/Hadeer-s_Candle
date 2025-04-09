import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";

// ======================================
//            CATEGORY ROUTES
// ======================================
const router = express.Router();

// ------------------------------
//          PUBLIC ROUTES
// ------------------------------

// GET ALL CATEGORIES
router.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Category routes are working",
    categories: [],
  });
});

// GET SINGLE CATEGORY
router.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: `Category with ID ${req.params.id} found`,
    category: { 
      id: req.params.id, 
      name: "Sample Category" 
    },
  });
});

// ------------------------------
//     PROTECTED ADMIN ROUTES
// ------------------------------

// CREATE NEW CATEGORY
router.post(
  "/",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: { 
        ...req.body, 
        id: "new-category-id" 
      },
    });
  }
);

// UPDATE CATEGORY
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Category with ID ${req.params.id} updated successfully`,
      category: { 
        ...req.body, 
        id: req.params.id 
      },
    });
  }
);

// DELETE CATEGORY
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Category with ID ${req.params.id} deleted successfully`,
    });
  }
);

export default router;