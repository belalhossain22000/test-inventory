import { Router } from "express";
import { employeeController } from "./Employee.controller";
import validateRequest from "../../middlewares/validateRequest";
import { EmployeeValidation } from "./Employee.validation";
import auth from "../../middlewares/auth";
import { EmployeeRole } from "@prisma/client";

const router = Router();

// create employee
router.post(
  "/",
  validateRequest(EmployeeValidation.createEmployeeValidationSchema),
  employeeController.createEmployee
);

// create admin
router.post(
  "/admin",
  validateRequest(EmployeeValidation.createEmployeeValidationSchema),
  employeeController.createAdmin
);

// get all employee
router.get("/", employeeController.getAllEmployees);

// get single employee by id
router.get("/:id", employeeController.getSingleEmployee);

// update employee
router.put(
  "/:id",
  validateRequest(EmployeeValidation.updateEmployeeValidationSchema),
  employeeController.updateEmployee
);

// delete employee
router.delete("/:id",auth(EmployeeRole.ADMIN, EmployeeRole.SUPER_ADMIN), employeeController.deleteEmployee);

export const employeeRoutes = router;
