import { Router } from "express";
import signupRouter from "./signup.routes.js";
import signinRouter from "./signin.routes.js";
import appointmentsRouter from "./appointments.routes.js";
import specialtyRouter from "./specialties.routes.js";
import branchRouter from "./branchs.routes.js";

const mainRouter = Router();

mainRouter.use('/', [signinRouter, specialtyRouter, branchRouter]);
mainRouter.use("/signup", signupRouter);
mainRouter.use('/appointments', appointmentsRouter);

export default mainRouter;