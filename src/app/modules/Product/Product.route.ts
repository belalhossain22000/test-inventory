import { Router } from "express";
import { productController } from "./Product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./Product.validation";

const router = Router();

// create product
router.post(
  "/",
  validateRequest(ProductValidation.createProductSchema),
  productController.createProduct
);

// get all product
router.get("/", productController.getAllProducts);

// get single product by id
router.get("/:id", productController.getSingleProduct);

// update product
router.put(
  "/:id",
  validateRequest(ProductValidation.updateProductSchema),
  productController.updateProduct
);

// delete product
router.delete("/:id", productController.deleteProduct);

export const productRoutes = router;
