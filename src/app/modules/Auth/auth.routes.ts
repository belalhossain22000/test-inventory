import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";



const router = express.Router();

// user login route
router.post(
  "/login",

  AuthController.loginUser
);

// user logout route
router.post("/logout", AuthController.logoutUser);


router.put(
  "/change-password",
  auth(),

  AuthController.changePassword
);


router.post(
  '/forgot-password',
  AuthController.forgotPassword
);

router.post(
  '/reset-password',
  AuthController.resetPassword
)

export const AuthRoutes = router;
