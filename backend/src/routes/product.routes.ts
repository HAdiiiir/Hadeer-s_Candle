import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";

// ======================================
//             PRODUCT ROUTES
// ======================================
const router = express.Router();

// ------------------------------
//          PUBLIC ROUTES
// ------------------------------

// GET ALL PRODUCTS
router.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Product routes are working",
    products: [],
  });
});

// GET FEATURED PRODUCTS
router.get("/featured", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Featured products",
    products: [],
  });
});

// GET SINGLE PRODUCT
router.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: `Product with ID ${req.params.id} found`,
    product: {
      id: req.params.id,
      name: "Sample Product",
      price: 100
    },
  });
});

// ------------------------------
//         PROTECTED ROUTES
// ------------------------------

// CREATE PRODUCT (ADMIN ONLY)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: {
        ...req.body,
        id: "new-product-id"
      },
    });
  }
);

// UPDATE PRODUCT (ADMIN ONLY)
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Product with ID ${req.params.id} updated successfully`,
      product: {
        ...req.body,
        id: req.params.id
      },
    });
  }
);

// DELETE PRODUCT (ADMIN ONLY)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Product with ID ${req.params.id} deleted successfully`,
    });
  }
);

// ADD PRODUCT RATING (AUTHENTICATED USERS)
router.post(
  "/:id/rating",
  authenticate,
  (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: `Rating added to product with ID ${req.params.id}`,
      averageRating: 4.5,
    });
  }
);

export default router;