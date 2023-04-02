import { Router } from "express";
import signupSchema from "../schemas/signup.schema.js";
import { schemaValidation } from "../middleware/schemaValidation.middleware.js";
import signupControllers from "../controllers/signup.controllers.js";

const signupRouter = Router();

signupRouter.post('/patients', schemaValidation(signupSchema.patient), signupControllers.patient);

export default signupRouter;