import { Router } from "express";
import registersController from "../controllers/registersController.js";
import zodValidator from "../middlewares/zodValidator.js";
import { registersSchema } from "../zod/index.ts";

const router = Router();

// Reistros
router.post(
    "/registers",
    zodValidator(registersSchema),
    registersController.create
);
router.get("/registers", registersController.findMany);
router.get("/registers/:email", registersController.findUnique);
router.put(
    "/registers/:email",
    zodValidator(registersSchema),
    registersController.update
);
router.delete("/registers/:email", registersController.delete);

export default router;
