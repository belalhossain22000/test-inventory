import { Router } from "express";
import { productController } from "./Product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./Product.validation";
import auth from "../../middlewares/auth";
import { EmployeeRole } from "@prisma/client";

const router = Router();

// create product
router.post(
  "/",
  auth(EmployeeRole.SUPER_ADMIN, EmployeeRole.ADMIN),
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
  auth(),
  validateRequest(ProductValidation.updateProductSchema),
  productController.updateProduct
);

// delete product
router.delete("/:id",auth(EmployeeRole.SUPER_ADMIN, EmployeeRole.ADMIN), productController.deleteProduct);

export const productRoutes = router;
