import { Router } from "express";
import { authValidation } from "../middleware/auth.middleware.js";
import userControllers from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get('/appointments', authValidation, userControllers.myAppointments)

export default userRouter;