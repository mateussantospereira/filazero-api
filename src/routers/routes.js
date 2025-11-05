import { Router } from "express";
import appointmentsController from "../controllers/appointmentsController.js";
import doctorsController from "../controllers/doctorsController.js";
import expedientsController from "../controllers/expedientsController.js";
import fieldsController from "../controllers/fieldsController.js";
import hospitalsController from "../controllers/hospitalsController.js";
import registersController from "../controllers/registersController.js";
import weekdaysController from "../controllers/weekdaysController.js";
import { appointmentsSchema } from "../zod/index.ts";
import { doctorsSchema } from "../zod/index.ts";
import { expedientsSchema } from "../zod/index.ts";
import { fieldsSchema } from "../zod/index.ts";
import { hospitalsSchema } from "../zod/index.ts";
import { registersSchema } from "../zod/index.ts";
import { weekdaysSchema } from "../zod/index.ts";
import zodValidatorBody from "../middlewares/zodValidatorBody.js";
import zodValidatorParams from "../middlewares/zodValidatorParams.js";
import {
    emailSchemaParams,
    idSchemaParams,
    weekdaysSchemaParams,
} from "../schemas/params.js";
import { z } from "zod";

const router = Router();

// Agendas
router.post(
    "/appointments",
    zodValidatorBody(appointmentsSchema),
    appointmentsController.create
);
router.get("/appointments", appointmentsController.findMany);
router.get(
    "/appointments/:id",
    zodValidatorParams(idSchemaParams),
    appointmentsController.findUnique
);
router.put(
    "/appointments/:id",
    zodValidatorParams(idSchemaParams),
    zodValidatorBody(appointmentsSchema),
    appointmentsController.update
);
router.delete(
    "/appointments/:id",
    zodValidatorParams(idSchemaParams),
    appointmentsController.delete
);

// Médicos
router.post(
    "/doctors",
    zodValidatorBody(doctorsSchema),
    doctorsController.create
);
router.get("/doctors", doctorsController.findMany);
router.get(
    "/doctors/:email",
    zodValidatorParams(emailSchemaParams),
    doctorsController.findUnique
);
router.put(
    "/doctors/:email",
    zodValidatorParams(emailSchemaParams),
    zodValidatorBody(doctorsSchema),
    doctorsController.update
);
router.delete(
    "/doctors/:email",
    zodValidatorParams(emailSchemaParams),
    doctorsController.delete
);

// Expedientes
router.post(
    "/expedients",
    zodValidatorBody(expedientsSchema),
    expedientsController.create
);
router.get("/expedients", expedientsController.findMany);
router.get(
    "/expedients/:id",
    zodValidatorParams(idSchemaParams),
    expedientsController.findUnique
);
router.put(
    "/expedients/:id",
    zodValidatorParams(idSchemaParams),
    zodValidatorBody(expedientsSchema),
    expedientsController.update
);
router.delete(
    "/expedients/:id",
    zodValidatorParams(idSchemaParams),
    expedientsController.delete
);

// Áreas médicas
router.post("/fields", zodValidatorBody(fieldsSchema), fieldsController.create);
router.get("/fields", fieldsController.findMany);
router.get(
    "/fields/:id",
    zodValidatorParams(idSchemaParams),
    fieldsController.findUnique
);
router.put(
    "/fields/:id",
    zodValidatorParams(idSchemaParams),
    zodValidatorBody(fieldsSchema),
    fieldsController.update
);
router.delete(
    "/fields/:id",
    zodValidatorParams(idSchemaParams),
    fieldsController.delete
);

// Hospitais
router.post(
    "/hospitals",
    zodValidatorBody(hospitalsSchema),
    hospitalsController.create
);
router.get("/hospitals", hospitalsController.findMany);
router.get(
    "/hospitals/:id",
    zodValidatorParams(idSchemaParams),
    hospitalsController.findUnique
);
router.put(
    "/hospitals/:id",
    zodValidatorParams(idSchemaParams),
    zodValidatorBody(hospitalsSchema),
    hospitalsController.update
);
router.delete(
    "/hospitals/:id",
    zodValidatorParams(idSchemaParams),
    hospitalsController.delete
);

// Registros
router.post(
    "/registers",
    zodValidatorBody(registersSchema),
    registersController.create
);
router.get("/registers", registersController.findMany);
router.get(
    "/registers/:email",
    zodValidatorParams(emailSchemaParams),
    registersController.findUnique
);
router.put(
    "/registers/:email",
    zodValidatorParams(emailSchemaParams),
    zodValidatorBody(registersSchema),
    registersController.update
);
router.delete(
    "/registers/:email",
    zodValidatorParams(emailSchemaParams),
    registersController.delete
);

// Dias da semana
router.post(
    "/weekdays",
    zodValidatorBody(z.array(weekdaysSchema)),
    weekdaysController.create
);
router.get("/weekdays", weekdaysController.findMany);
router.get(
    "/weekdays/:id_expedient",
    zodValidatorParams(weekdaysSchemaParams),
    weekdaysController.findManyByExpedient
);
router.delete(
    "/weekdays/:id_expedient",
    zodValidatorParams(weekdaysSchemaParams),
    weekdaysController.delete
);

export default router;
