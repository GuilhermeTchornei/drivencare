import { Router } from "express";
import signupRouter from "./signup.routes.js";

const mainRouter = Router();

mainRouter.use("/signup", signupRouter);

export default mainRouter;