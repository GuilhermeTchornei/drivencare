import { Router } from "express";
import { authValidation } from "../middleware/auth.middleware.js";
import appointmentsControllers from "../controllers/appointments.controllers.js";

const appointmentsRouter = Router();

appointmentsRouter.post('/doctors', authValidation, appointmentsControllers.doctorsList);

export default appointmentsRouter;