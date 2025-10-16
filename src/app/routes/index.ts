import express from "express";
import { ImageRoutes } from "../modules/Image/Image.routes";
import { employeeRoutes } from "../modules/Employee/Employee.route";
import { productRoutes } from "../modules/Product/Product.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/images",
    route: ImageRoutes,
  },
  {
    path: "/employees",
    route: employeeRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
