import { Router } from "express";
import signupRouter from "./signup.routes.js";
import signinRouter from "./signin.routes.js";

const mainRouter = Router();

mainRouter.use('/', signinRouter);
mainRouter.use("/signup", signupRouter);

export default mainRouter;