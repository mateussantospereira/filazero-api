import { z } from "zod";
import type { Prisma } from "../prisma";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
    "ReadUncommitted",
    "ReadCommitted",
    "RepeatableRead",
    "Serializable",
]);

export const AppointmentsScalarFieldEnumSchema = z.enum([
    "id",
    "email_doctor",
    "email_patient",
    "date",
    "start",
    "end",
    "registered",
]);

export const DoctorsScalarFieldEnumSchema = z.enum([
    "email",
    "id_field",
    "id_hospital",
    "id_expedient",
    "first_day",
]);

export const ExpedientsScalarFieldEnumSchema = z.enum([
    "id",
    "duration",
    "description",
]);

export const FieldsScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "description",
]);

export const HospitalsScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "street",
    "number",
    "district",
    "cep",
    "city",
    "uf",
]);

export const RegistersScalarFieldEnumSchema = z.enum([
    "name",
    "cpf",
    "gender",
    "birth",
    "email",
    "password",
    "type",
]);

export const WeekdaysScalarFieldEnumSchema = z.enum([
    "id_expedient",
    "weekday",
    "week",
    "start",
    "end",
    "break",
    "time_break",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const appointmentsOrderByRelevanceFieldEnumSchema = z.enum([
    "email_doctor",
    "email_patient",
]);

export const doctorsOrderByRelevanceFieldEnumSchema = z.enum(["email"]);

export const expedientsOrderByRelevanceFieldEnumSchema = z.enum([
    "description",
]);

export const fieldsOrderByRelevanceFieldEnumSchema = z.enum([
    "name",
    "description",
]);

export const hospitalsOrderByRelevanceFieldEnumSchema = z.enum([
    "name",
    "street",
    "district",
    "cep",
    "city",
    "uf",
]);

export const registersOrderByRelevanceFieldEnumSchema = z.enum([
    "name",
    "cpf",
    "gender",
    "email",
    "password",
]);

export const weekdaysOrderByRelevanceFieldEnumSchema = z.enum(["weekday"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// APPOINTMENTS SCHEMA
/////////////////////////////////////////

export const appointmentsSchema = z.object({
    id: z.number().int().nullish(),
    email_doctor: z.string(),
    email_patient: z.string(),
    date: z.coerce.date(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    registered: z.coerce.date().nullable(),
});

export type appointments = z.infer<typeof appointmentsSchema>;

/////////////////////////////////////////
// DOCTORS SCHEMA
/////////////////////////////////////////

export const doctorsSchema = z.object({
    email: z.string(),
    id_field: z.number().int(),
    id_hospital: z.number().int(),
    id_expedient: z.number().int(),
    first_day: z.coerce.date(),
});

export type doctors = z.infer<typeof doctorsSchema>;

/////////////////////////////////////////
// EXPEDIENTS SCHEMA
/////////////////////////////////////////

export const expedientsSchema = z.object({
    id: z.number().int().nullish(),
    duration: z.iso.time(),
    description: z.string(),
});

export type expedients = z.infer<typeof expedientsSchema>;

/////////////////////////////////////////
// FIELDS SCHEMA
/////////////////////////////////////////

export const fieldsSchema = z.object({
    id: z.number().int().nullish(),
    name: z.string(),
    description: z.string().nullable(),
});

export type fields = z.infer<typeof fieldsSchema>;

/////////////////////////////////////////
// HOSPITALS SCHEMA
/////////////////////////////////////////

export const hospitalsSchema = z.object({
    id: z.number().int().nullish(),
    name: z.string(),
    street: z.string(),
    number: z.number().int(),
    district: z.string(),
    cep: z.string(),
    city: z.string(),
    uf: z.string(),
});

export type hospitals = z.infer<typeof hospitalsSchema>;

/////////////////////////////////////////
// REGISTERS SCHEMA
/////////////////////////////////////////

export const registersSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    gender: z.string(),
    birth: z.coerce.date(),
    email: z.string(),
    password: z.string(),
    type: z.number().int(),
});

export type registers = z.infer<typeof registersSchema>;

/////////////////////////////////////////
// WEEKDAYS SCHEMA
/////////////////////////////////////////

export const weekdaysSchema = z.object({
    id_expedient: z.number().int(),
    weekday: z.number().int(),
    week: z.number().int().nullish().default(1),
    start: z.iso.time(),
    end: z.iso.time(),
    break: z.iso.time().nullish(),
    time_break: z.iso.time().nullish(),
});

export type weekdays = z.infer<typeof weekdaysSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// APPOINTMENTS
//------------------------------------------------------

export const appointmentsIncludeSchema: z.ZodType<Prisma.appointmentsInclude> =
    z
        .object({
            doctors: z
                .union([z.boolean(), z.lazy(() => doctorsArgsSchema)])
                .optional(),
            registers: z
                .union([z.boolean(), z.lazy(() => registersArgsSchema)])
                .optional(),
        })
        .strict();

export const appointmentsArgsSchema: z.ZodType<Prisma.appointmentsDefaultArgs> =
    z
        .object({
            select: z.lazy(() => appointmentsSelectSchema).optional(),
            include: z.lazy(() => appointmentsIncludeSchema).optional(),
        })
        .strict();

export const appointmentsSelectSchema: z.ZodType<Prisma.appointmentsSelect> = z
    .object({
        id: z.boolean().optional(),
        email_doctor: z.boolean().optional(),
        email_patient: z.boolean().optional(),
        date: z.boolean().optional(),
        start: z.boolean().optional(),
        end: z.boolean().optional(),
        registered: z.boolean().optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsArgsSchema)])
            .optional(),
        registers: z
            .union([z.boolean(), z.lazy(() => registersArgsSchema)])
            .optional(),
    })
    .strict();

// DOCTORS
//------------------------------------------------------

export const doctorsIncludeSchema: z.ZodType<Prisma.doctorsInclude> = z
    .object({
        appointments: z
            .union([z.boolean(), z.lazy(() => appointmentsFindManyArgsSchema)])
            .optional(),
        registers: z
            .union([z.boolean(), z.lazy(() => registersArgsSchema)])
            .optional(),
        fields: z
            .union([z.boolean(), z.lazy(() => fieldsArgsSchema)])
            .optional(),
        hospitals: z
            .union([z.boolean(), z.lazy(() => hospitalsArgsSchema)])
            .optional(),
        expedients: z
            .union([z.boolean(), z.lazy(() => expedientsArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => DoctorsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

export const doctorsArgsSchema: z.ZodType<Prisma.doctorsDefaultArgs> = z
    .object({
        select: z.lazy(() => doctorsSelectSchema).optional(),
        include: z.lazy(() => doctorsIncludeSchema).optional(),
    })
    .strict();

export const doctorsCountOutputTypeArgsSchema: z.ZodType<Prisma.doctorsCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => doctorsCountOutputTypeSelectSchema).nullish(),
        })
        .strict();

export const doctorsCountOutputTypeSelectSchema: z.ZodType<Prisma.doctorsCountOutputTypeSelect> =
    z
        .object({
            appointments: z.boolean().optional(),
        })
        .strict();

export const doctorsSelectSchema: z.ZodType<Prisma.doctorsSelect> = z
    .object({
        email: z.boolean().optional(),
        id_field: z.boolean().optional(),
        id_hospital: z.boolean().optional(),
        id_expedient: z.boolean().optional(),
        first_day: z.boolean().optional(),
        appointments: z
            .union([z.boolean(), z.lazy(() => appointmentsFindManyArgsSchema)])
            .optional(),
        registers: z
            .union([z.boolean(), z.lazy(() => registersArgsSchema)])
            .optional(),
        fields: z
            .union([z.boolean(), z.lazy(() => fieldsArgsSchema)])
            .optional(),
        hospitals: z
            .union([z.boolean(), z.lazy(() => hospitalsArgsSchema)])
            .optional(),
        expedients: z
            .union([z.boolean(), z.lazy(() => expedientsArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => DoctorsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

// EXPEDIENTS
//------------------------------------------------------

export const expedientsIncludeSchema: z.ZodType<Prisma.expedientsInclude> = z
    .object({
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        weekdays: z
            .union([z.boolean(), z.lazy(() => weekdaysFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ExpedientsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

export const expedientsArgsSchema: z.ZodType<Prisma.expedientsDefaultArgs> = z
    .object({
        select: z.lazy(() => expedientsSelectSchema).optional(),
        include: z.lazy(() => expedientsIncludeSchema).optional(),
    })
    .strict();

export const expedientsCountOutputTypeArgsSchema: z.ZodType<Prisma.expedientsCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z
                .lazy(() => expedientsCountOutputTypeSelectSchema)
                .nullish(),
        })
        .strict();

export const expedientsCountOutputTypeSelectSchema: z.ZodType<Prisma.expedientsCountOutputTypeSelect> =
    z
        .object({
            doctors: z.boolean().optional(),
            weekdays: z.boolean().optional(),
        })
        .strict();

export const expedientsSelectSchema: z.ZodType<Prisma.expedientsSelect> = z
    .object({
        id: z.boolean().optional(),
        duration: z.boolean().optional(),
        description: z.boolean().optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        weekdays: z
            .union([z.boolean(), z.lazy(() => weekdaysFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ExpedientsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

// FIELDS
//------------------------------------------------------

export const fieldsIncludeSchema: z.ZodType<Prisma.fieldsInclude> = z
    .object({
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => FieldsCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict();

export const fieldsArgsSchema: z.ZodType<Prisma.fieldsDefaultArgs> = z
    .object({
        select: z.lazy(() => fieldsSelectSchema).optional(),
        include: z.lazy(() => fieldsIncludeSchema).optional(),
    })
    .strict();

export const fieldsCountOutputTypeArgsSchema: z.ZodType<Prisma.fieldsCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => fieldsCountOutputTypeSelectSchema).nullish(),
        })
        .strict();

export const fieldsCountOutputTypeSelectSchema: z.ZodType<Prisma.fieldsCountOutputTypeSelect> =
    z
        .object({
            doctors: z.boolean().optional(),
        })
        .strict();

export const fieldsSelectSchema: z.ZodType<Prisma.fieldsSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        description: z.boolean().optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => FieldsCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict();

// HOSPITALS
//------------------------------------------------------

export const hospitalsIncludeSchema: z.ZodType<Prisma.hospitalsInclude> = z
    .object({
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => HospitalsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

export const hospitalsArgsSchema: z.ZodType<Prisma.hospitalsDefaultArgs> = z
    .object({
        select: z.lazy(() => hospitalsSelectSchema).optional(),
        include: z.lazy(() => hospitalsIncludeSchema).optional(),
    })
    .strict();

export const hospitalsCountOutputTypeArgsSchema: z.ZodType<Prisma.hospitalsCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z
                .lazy(() => hospitalsCountOutputTypeSelectSchema)
                .nullish(),
        })
        .strict();

export const hospitalsCountOutputTypeSelectSchema: z.ZodType<Prisma.hospitalsCountOutputTypeSelect> =
    z
        .object({
            doctors: z.boolean().optional(),
        })
        .strict();

export const hospitalsSelectSchema: z.ZodType<Prisma.hospitalsSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        street: z.boolean().optional(),
        number: z.boolean().optional(),
        district: z.boolean().optional(),
        cep: z.boolean().optional(),
        city: z.boolean().optional(),
        uf: z.boolean().optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => HospitalsCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

// REGISTERS
//------------------------------------------------------

export const registersIncludeSchema: z.ZodType<Prisma.registersInclude> = z
    .object({
        appointments: z
            .union([z.boolean(), z.lazy(() => appointmentsFindManyArgsSchema)])
            .optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => RegistersCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

export const registersArgsSchema: z.ZodType<Prisma.registersDefaultArgs> = z
    .object({
        select: z.lazy(() => registersSelectSchema).optional(),
        include: z.lazy(() => registersIncludeSchema).optional(),
    })
    .strict();

export const registersCountOutputTypeArgsSchema: z.ZodType<Prisma.registersCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z
                .lazy(() => registersCountOutputTypeSelectSchema)
                .nullish(),
        })
        .strict();

export const registersCountOutputTypeSelectSchema: z.ZodType<Prisma.registersCountOutputTypeSelect> =
    z
        .object({
            appointments: z.boolean().optional(),
        })
        .strict();

export const registersSelectSchema: z.ZodType<Prisma.registersSelect> = z
    .object({
        name: z.boolean().optional(),
        cpf: z.boolean().optional(),
        gender: z.boolean().optional(),
        birth: z.boolean().optional(),
        email: z.boolean().optional(),
        password: z.boolean().optional(),
        type: z.boolean().optional(),
        appointments: z
            .union([z.boolean(), z.lazy(() => appointmentsFindManyArgsSchema)])
            .optional(),
        doctors: z
            .union([z.boolean(), z.lazy(() => doctorsArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => RegistersCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

// WEEKDAYS
//------------------------------------------------------

export const weekdaysIncludeSchema: z.ZodType<Prisma.weekdaysInclude> = z
    .object({
        expedients: z
            .union([z.boolean(), z.lazy(() => expedientsArgsSchema)])
            .optional(),
    })
    .strict();

export const weekdaysArgsSchema: z.ZodType<Prisma.weekdaysDefaultArgs> = z
    .object({
        select: z.lazy(() => weekdaysSelectSchema).optional(),
        include: z.lazy(() => weekdaysIncludeSchema).optional(),
    })
    .strict();

export const weekdaysSelectSchema: z.ZodType<Prisma.weekdaysSelect> = z
    .object({
        id_expedient: z.boolean().optional(),
        weekday: z.boolean().optional(),
        week: z.boolean().optional(),
        start: z.boolean().optional(),
        end: z.boolean().optional(),
        break: z.boolean().optional(),
        time_break: z.boolean().optional(),
        expedients: z
            .union([z.boolean(), z.lazy(() => expedientsArgsSchema)])
            .optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const appointmentsWhereInputSchema: z.ZodType<Prisma.appointmentsWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => appointmentsWhereInputSchema),
                z.lazy(() => appointmentsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => appointmentsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => appointmentsWhereInputSchema),
                z.lazy(() => appointmentsWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        email_doctor: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        email_patient: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        registered: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        doctors: z
            .union([
                z.lazy(() => DoctorsScalarRelationFilterSchema),
                z.lazy(() => doctorsWhereInputSchema),
            ])
            .optional(),
        registers: z
            .union([
                z.lazy(() => RegistersScalarRelationFilterSchema),
                z.lazy(() => registersWhereInputSchema),
            ])
            .optional(),
    });

export const appointmentsOrderByWithRelationInputSchema: z.ZodType<Prisma.appointmentsOrderByWithRelationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        email_doctor: z.lazy(() => SortOrderSchema).optional(),
        email_patient: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        registered: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        doctors: z.lazy(() => doctorsOrderByWithRelationInputSchema).optional(),
        registers: z
            .lazy(() => registersOrderByWithRelationInputSchema)
            .optional(),
        _relevance: z
            .lazy(() => appointmentsOrderByRelevanceInputSchema)
            .optional(),
    });

export const appointmentsWhereUniqueInputSchema: z.ZodType<Prisma.appointmentsWhereUniqueInput> =
    z
        .union([
            z.object({
                id: z.number().int(),
                email_doctor_date_start: z.lazy(
                    () =>
                        appointmentsEmail_doctorDateStartCompoundUniqueInputSchema
                ),
            }),
            z.object({
                id: z.number().int(),
            }),
            z.object({
                email_doctor_date_start: z.lazy(
                    () =>
                        appointmentsEmail_doctorDateStartCompoundUniqueInputSchema
                ),
            }),
        ])
        .and(
            z.strictObject({
                id: z.number().int().optional(),
                email_doctor_date_start: z
                    .lazy(
                        () =>
                            appointmentsEmail_doctorDateStartCompoundUniqueInputSchema
                    )
                    .optional(),
                AND: z
                    .union([
                        z.lazy(() => appointmentsWhereInputSchema),
                        z.lazy(() => appointmentsWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => appointmentsWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => appointmentsWhereInputSchema),
                        z.lazy(() => appointmentsWhereInputSchema).array(),
                    ])
                    .optional(),
                email_doctor: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                email_patient: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                date: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                start: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                end: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                registered: z
                    .union([
                        z.lazy(() => DateTimeNullableFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional()
                    .nullable(),
                doctors: z
                    .union([
                        z.lazy(() => DoctorsScalarRelationFilterSchema),
                        z.lazy(() => doctorsWhereInputSchema),
                    ])
                    .optional(),
                registers: z
                    .union([
                        z.lazy(() => RegistersScalarRelationFilterSchema),
                        z.lazy(() => registersWhereInputSchema),
                    ])
                    .optional(),
            })
        );

export const appointmentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.appointmentsOrderByWithAggregationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        email_doctor: z.lazy(() => SortOrderSchema).optional(),
        email_patient: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        registered: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        _count: z
            .lazy(() => appointmentsCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z
            .lazy(() => appointmentsAvgOrderByAggregateInputSchema)
            .optional(),
        _max: z
            .lazy(() => appointmentsMaxOrderByAggregateInputSchema)
            .optional(),
        _min: z
            .lazy(() => appointmentsMinOrderByAggregateInputSchema)
            .optional(),
        _sum: z
            .lazy(() => appointmentsSumOrderByAggregateInputSchema)
            .optional(),
    });

export const appointmentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.appointmentsScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => appointmentsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(
                        () => appointmentsScalarWhereWithAggregatesInputSchema
                    )
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => appointmentsScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => appointmentsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(
                        () => appointmentsScalarWhereWithAggregatesInputSchema
                    )
                    .array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        email_doctor: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        email_patient: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        date: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        start: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        end: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        registered: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
    });

export const doctorsWhereInputSchema: z.ZodType<Prisma.doctorsWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => doctorsWhereInputSchema),
                z.lazy(() => doctorsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => doctorsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => doctorsWhereInputSchema),
                z.lazy(() => doctorsWhereInputSchema).array(),
            ])
            .optional(),
        email: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        id_field: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        id_hospital: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        first_day: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        appointments: z
            .lazy(() => AppointmentsListRelationFilterSchema)
            .optional(),
        registers: z
            .union([
                z.lazy(() => RegistersScalarRelationFilterSchema),
                z.lazy(() => registersWhereInputSchema),
            ])
            .optional(),
        fields: z
            .union([
                z.lazy(() => FieldsScalarRelationFilterSchema),
                z.lazy(() => fieldsWhereInputSchema),
            ])
            .optional(),
        hospitals: z
            .union([
                z.lazy(() => HospitalsScalarRelationFilterSchema),
                z.lazy(() => hospitalsWhereInputSchema),
            ])
            .optional(),
        expedients: z
            .union([
                z.lazy(() => ExpedientsScalarRelationFilterSchema),
                z.lazy(() => expedientsWhereInputSchema),
            ])
            .optional(),
    });

export const doctorsOrderByWithRelationInputSchema: z.ZodType<Prisma.doctorsOrderByWithRelationInput> =
    z.strictObject({
        email: z.lazy(() => SortOrderSchema).optional(),
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        first_day: z.lazy(() => SortOrderSchema).optional(),
        appointments: z
            .lazy(() => appointmentsOrderByRelationAggregateInputSchema)
            .optional(),
        registers: z
            .lazy(() => registersOrderByWithRelationInputSchema)
            .optional(),
        fields: z.lazy(() => fieldsOrderByWithRelationInputSchema).optional(),
        hospitals: z
            .lazy(() => hospitalsOrderByWithRelationInputSchema)
            .optional(),
        expedients: z
            .lazy(() => expedientsOrderByWithRelationInputSchema)
            .optional(),
        _relevance: z.lazy(() => doctorsOrderByRelevanceInputSchema).optional(),
    });

export const doctorsWhereUniqueInputSchema: z.ZodType<Prisma.doctorsWhereUniqueInput> =
    z
        .object({
            email: z.string(),
        })
        .and(
            z.strictObject({
                email: z.string().optional(),
                AND: z
                    .union([
                        z.lazy(() => doctorsWhereInputSchema),
                        z.lazy(() => doctorsWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => doctorsWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => doctorsWhereInputSchema),
                        z.lazy(() => doctorsWhereInputSchema).array(),
                    ])
                    .optional(),
                id_field: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                id_hospital: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                id_expedient: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                first_day: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                appointments: z
                    .lazy(() => AppointmentsListRelationFilterSchema)
                    .optional(),
                registers: z
                    .union([
                        z.lazy(() => RegistersScalarRelationFilterSchema),
                        z.lazy(() => registersWhereInputSchema),
                    ])
                    .optional(),
                fields: z
                    .union([
                        z.lazy(() => FieldsScalarRelationFilterSchema),
                        z.lazy(() => fieldsWhereInputSchema),
                    ])
                    .optional(),
                hospitals: z
                    .union([
                        z.lazy(() => HospitalsScalarRelationFilterSchema),
                        z.lazy(() => hospitalsWhereInputSchema),
                    ])
                    .optional(),
                expedients: z
                    .union([
                        z.lazy(() => ExpedientsScalarRelationFilterSchema),
                        z.lazy(() => expedientsWhereInputSchema),
                    ])
                    .optional(),
            })
        );

export const doctorsOrderByWithAggregationInputSchema: z.ZodType<Prisma.doctorsOrderByWithAggregationInput> =
    z.strictObject({
        email: z.lazy(() => SortOrderSchema).optional(),
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        first_day: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => doctorsCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z.lazy(() => doctorsAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => doctorsMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => doctorsMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => doctorsSumOrderByAggregateInputSchema).optional(),
    });

export const doctorsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.doctorsScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => doctorsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => doctorsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => doctorsScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => doctorsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => doctorsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        email: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        id_field: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        id_hospital: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        first_day: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
    });

export const expedientsWhereInputSchema: z.ZodType<Prisma.expedientsWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => expedientsWhereInputSchema),
                z.lazy(() => expedientsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => expedientsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => expedientsWhereInputSchema),
                z.lazy(() => expedientsWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        duration: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        doctors: z.lazy(() => DoctorsListRelationFilterSchema).optional(),
        weekdays: z.lazy(() => WeekdaysListRelationFilterSchema).optional(),
    });

export const expedientsOrderByWithRelationInputSchema: z.ZodType<Prisma.expedientsOrderByWithRelationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        duration: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        doctors: z
            .lazy(() => doctorsOrderByRelationAggregateInputSchema)
            .optional(),
        weekdays: z
            .lazy(() => weekdaysOrderByRelationAggregateInputSchema)
            .optional(),
        _relevance: z
            .lazy(() => expedientsOrderByRelevanceInputSchema)
            .optional(),
    });

export const expedientsWhereUniqueInputSchema: z.ZodType<Prisma.expedientsWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z.strictObject({
                id: z.number().int().optional(),
                AND: z
                    .union([
                        z.lazy(() => expedientsWhereInputSchema),
                        z.lazy(() => expedientsWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => expedientsWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => expedientsWhereInputSchema),
                        z.lazy(() => expedientsWhereInputSchema).array(),
                    ])
                    .optional(),
                duration: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                description: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                doctors: z
                    .lazy(() => DoctorsListRelationFilterSchema)
                    .optional(),
                weekdays: z
                    .lazy(() => WeekdaysListRelationFilterSchema)
                    .optional(),
            })
        );

export const expedientsOrderByWithAggregationInputSchema: z.ZodType<Prisma.expedientsOrderByWithAggregationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        duration: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => expedientsCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z.lazy(() => expedientsAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => expedientsMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => expedientsMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => expedientsSumOrderByAggregateInputSchema).optional(),
    });

export const expedientsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.expedientsScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => expedientsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => expedientsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => expedientsScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => expedientsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => expedientsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        duration: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        description: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
    });

export const fieldsWhereInputSchema: z.ZodType<Prisma.fieldsWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => fieldsWhereInputSchema),
                z.lazy(() => fieldsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => fieldsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => fieldsWhereInputSchema),
                z.lazy(() => fieldsWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        doctors: z.lazy(() => DoctorsListRelationFilterSchema).optional(),
    });

export const fieldsOrderByWithRelationInputSchema: z.ZodType<Prisma.fieldsOrderByWithRelationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(() => doctorsOrderByRelationAggregateInputSchema)
            .optional(),
        _relevance: z.lazy(() => fieldsOrderByRelevanceInputSchema).optional(),
    });

export const fieldsWhereUniqueInputSchema: z.ZodType<Prisma.fieldsWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z.strictObject({
                id: z.number().int().optional(),
                AND: z
                    .union([
                        z.lazy(() => fieldsWhereInputSchema),
                        z.lazy(() => fieldsWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => fieldsWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => fieldsWhereInputSchema),
                        z.lazy(() => fieldsWhereInputSchema).array(),
                    ])
                    .optional(),
                name: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                description: z
                    .union([
                        z.lazy(() => StringNullableFilterSchema),
                        z.string(),
                    ])
                    .optional()
                    .nullable(),
                doctors: z
                    .lazy(() => DoctorsListRelationFilterSchema)
                    .optional(),
            })
        );

export const fieldsOrderByWithAggregationInputSchema: z.ZodType<Prisma.fieldsOrderByWithAggregationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        _count: z.lazy(() => fieldsCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => fieldsAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => fieldsMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => fieldsMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => fieldsSumOrderByAggregateInputSchema).optional(),
    });

export const fieldsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.fieldsScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => fieldsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => fieldsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => fieldsScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => fieldsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => fieldsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        description: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
    });

export const hospitalsWhereInputSchema: z.ZodType<Prisma.hospitalsWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => hospitalsWhereInputSchema),
                z.lazy(() => hospitalsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => hospitalsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => hospitalsWhereInputSchema),
                z.lazy(() => hospitalsWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        street: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        number: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        district: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        cep: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        city: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        uf: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        doctors: z.lazy(() => DoctorsListRelationFilterSchema).optional(),
    });

export const hospitalsOrderByWithRelationInputSchema: z.ZodType<Prisma.hospitalsOrderByWithRelationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        street: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        district: z.lazy(() => SortOrderSchema).optional(),
        cep: z.lazy(() => SortOrderSchema).optional(),
        city: z.lazy(() => SortOrderSchema).optional(),
        uf: z.lazy(() => SortOrderSchema).optional(),
        doctors: z
            .lazy(() => doctorsOrderByRelationAggregateInputSchema)
            .optional(),
        _relevance: z
            .lazy(() => hospitalsOrderByRelevanceInputSchema)
            .optional(),
    });

export const hospitalsWhereUniqueInputSchema: z.ZodType<Prisma.hospitalsWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z.strictObject({
                id: z.number().int().optional(),
                AND: z
                    .union([
                        z.lazy(() => hospitalsWhereInputSchema),
                        z.lazy(() => hospitalsWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => hospitalsWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => hospitalsWhereInputSchema),
                        z.lazy(() => hospitalsWhereInputSchema).array(),
                    ])
                    .optional(),
                name: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                street: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                number: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                district: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                cep: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                city: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                uf: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                doctors: z
                    .lazy(() => DoctorsListRelationFilterSchema)
                    .optional(),
            })
        );

export const hospitalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.hospitalsOrderByWithAggregationInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        street: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        district: z.lazy(() => SortOrderSchema).optional(),
        cep: z.lazy(() => SortOrderSchema).optional(),
        city: z.lazy(() => SortOrderSchema).optional(),
        uf: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => hospitalsCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z.lazy(() => hospitalsAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => hospitalsMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => hospitalsMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => hospitalsSumOrderByAggregateInputSchema).optional(),
    });

export const hospitalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.hospitalsScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => hospitalsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => hospitalsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => hospitalsScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => hospitalsScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => hospitalsScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        street: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        number: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        district: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        cep: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        city: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        uf: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
    });

export const registersWhereInputSchema: z.ZodType<Prisma.registersWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => registersWhereInputSchema),
                z.lazy(() => registersWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => registersWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => registersWhereInputSchema),
                z.lazy(() => registersWhereInputSchema).array(),
            ])
            .optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        cpf: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        gender: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        birth: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        email: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        password: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        type: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        appointments: z
            .lazy(() => AppointmentsListRelationFilterSchema)
            .optional(),
        doctors: z
            .union([
                z.lazy(() => DoctorsNullableScalarRelationFilterSchema),
                z.lazy(() => doctorsWhereInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const registersOrderByWithRelationInputSchema: z.ZodType<Prisma.registersOrderByWithRelationInput> =
    z.strictObject({
        name: z.lazy(() => SortOrderSchema).optional(),
        cpf: z.lazy(() => SortOrderSchema).optional(),
        gender: z.lazy(() => SortOrderSchema).optional(),
        birth: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        appointments: z
            .lazy(() => appointmentsOrderByRelationAggregateInputSchema)
            .optional(),
        doctors: z.lazy(() => doctorsOrderByWithRelationInputSchema).optional(),
        _relevance: z
            .lazy(() => registersOrderByRelevanceInputSchema)
            .optional(),
    });

export const registersWhereUniqueInputSchema: z.ZodType<Prisma.registersWhereUniqueInput> =
    z
        .union([
            z.object({
                email: z.string(),
                cpf: z.string(),
            }),
            z.object({
                email: z.string(),
            }),
            z.object({
                cpf: z.string(),
            }),
        ])
        .and(
            z.strictObject({
                cpf: z.string().optional(),
                email: z.string().optional(),
                AND: z
                    .union([
                        z.lazy(() => registersWhereInputSchema),
                        z.lazy(() => registersWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => registersWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => registersWhereInputSchema),
                        z.lazy(() => registersWhereInputSchema).array(),
                    ])
                    .optional(),
                name: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                gender: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                birth: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                password: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                type: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                appointments: z
                    .lazy(() => AppointmentsListRelationFilterSchema)
                    .optional(),
                doctors: z
                    .union([
                        z.lazy(() => DoctorsNullableScalarRelationFilterSchema),
                        z.lazy(() => doctorsWhereInputSchema),
                    ])
                    .optional()
                    .nullable(),
            })
        );

export const registersOrderByWithAggregationInputSchema: z.ZodType<Prisma.registersOrderByWithAggregationInput> =
    z.strictObject({
        name: z.lazy(() => SortOrderSchema).optional(),
        cpf: z.lazy(() => SortOrderSchema).optional(),
        gender: z.lazy(() => SortOrderSchema).optional(),
        birth: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => registersCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z.lazy(() => registersAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => registersMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => registersMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => registersSumOrderByAggregateInputSchema).optional(),
    });

export const registersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.registersScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => registersScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => registersScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => registersScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => registersScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => registersScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        cpf: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        gender: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        birth: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        email: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        password: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        type: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
    });

export const weekdaysWhereInputSchema: z.ZodType<Prisma.weekdaysWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => weekdaysWhereInputSchema),
                z.lazy(() => weekdaysWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => weekdaysWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => weekdaysWhereInputSchema),
                z.lazy(() => weekdaysWhereInputSchema).array(),
            ])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        weekday: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        week: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        break: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        expedients: z
            .union([
                z.lazy(() => ExpedientsScalarRelationFilterSchema),
                z.lazy(() => expedientsWhereInputSchema),
            ])
            .optional(),
    });

export const weekdaysOrderByWithRelationInputSchema: z.ZodType<Prisma.weekdaysOrderByWithRelationInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        weekday: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        break: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        time_break: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        expedients: z
            .lazy(() => expedientsOrderByWithRelationInputSchema)
            .optional(),
        _relevance: z
            .lazy(() => weekdaysOrderByRelevanceInputSchema)
            .optional(),
    });

export const weekdaysWhereUniqueInputSchema: z.ZodType<Prisma.weekdaysWhereUniqueInput> =
    z
        .object({
            id_expedient_weekday_week: z.lazy(
                () => weekdaysId_expedientWeekdayWeekCompoundUniqueInputSchema
            ),
        })
        .and(
            z.strictObject({
                id_expedient_weekday_week: z
                    .lazy(
                        () =>
                            weekdaysId_expedientWeekdayWeekCompoundUniqueInputSchema
                    )
                    .optional(),
                AND: z
                    .union([
                        z.lazy(() => weekdaysWhereInputSchema),
                        z.lazy(() => weekdaysWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => weekdaysWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => weekdaysWhereInputSchema),
                        z.lazy(() => weekdaysWhereInputSchema).array(),
                    ])
                    .optional(),
                id_expedient: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                weekday: z
                    .union([z.lazy(() => StringFilterSchema), z.string()])
                    .optional(),
                week: z
                    .union([z.lazy(() => IntFilterSchema), z.number().int()])
                    .optional(),
                start: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                end: z
                    .union([
                        z.lazy(() => DateTimeFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional(),
                break: z
                    .union([
                        z.lazy(() => DateTimeNullableFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional()
                    .nullable(),
                time_break: z
                    .union([
                        z.lazy(() => DateTimeNullableFilterSchema),
                        z.coerce.date(),
                    ])
                    .optional()
                    .nullable(),
                expedients: z
                    .union([
                        z.lazy(() => ExpedientsScalarRelationFilterSchema),
                        z.lazy(() => expedientsWhereInputSchema),
                    ])
                    .optional(),
            })
        );

export const weekdaysOrderByWithAggregationInputSchema: z.ZodType<Prisma.weekdaysOrderByWithAggregationInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        weekday: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        break: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        time_break: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputSchema),
            ])
            .optional(),
        _count: z
            .lazy(() => weekdaysCountOrderByAggregateInputSchema)
            .optional(),
        _avg: z.lazy(() => weekdaysAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => weekdaysMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => weekdaysMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => weekdaysSumOrderByAggregateInputSchema).optional(),
    });

export const weekdaysScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.weekdaysScalarWhereWithAggregatesInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => weekdaysScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => weekdaysScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => weekdaysScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => weekdaysScalarWhereWithAggregatesInputSchema),
                z
                    .lazy(() => weekdaysScalarWhereWithAggregatesInputSchema)
                    .array(),
            ])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        weekday: z
            .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
            .optional(),
        week: z
            .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
            .optional(),
        start: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        end: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional(),
        break: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
    });

export const appointmentsCreateInputSchema: z.ZodType<Prisma.appointmentsCreateInput> =
    z.strictObject({
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
        doctors: z.lazy(
            () => doctorsCreateNestedOneWithoutAppointmentsInputSchema
        ),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutAppointmentsInputSchema
        ),
    });

export const appointmentsUncheckedCreateInputSchema: z.ZodType<Prisma.appointmentsUncheckedCreateInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_doctor: z.string(),
        email_patient: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsUpdateInputSchema: z.ZodType<Prisma.appointmentsUpdateInput> =
    z.strictObject({
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        doctors: z
            .lazy(
                () =>
                    doctorsUpdateOneRequiredWithoutAppointmentsNestedInputSchema
            )
            .optional(),
        registers: z
            .lazy(
                () =>
                    registersUpdateOneRequiredWithoutAppointmentsNestedInputSchema
            )
            .optional(),
    });

export const appointmentsUncheckedUpdateInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_doctor: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_patient: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const appointmentsCreateManyInputSchema: z.ZodType<Prisma.appointmentsCreateManyInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_doctor: z.string(),
        email_patient: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsUpdateManyMutationInputSchema: z.ZodType<Prisma.appointmentsUpdateManyMutationInput> =
    z.strictObject({
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const appointmentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateManyInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_doctor: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_patient: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const doctorsCreateInputSchema: z.ZodType<Prisma.doctorsCreateInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutDoctorsInputSchema)
            .optional(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutDoctorsInputSchema
        ),
        fields: z.lazy(() => fieldsCreateNestedOneWithoutDoctorsInputSchema),
        hospitals: z.lazy(
            () => hospitalsCreateNestedOneWithoutDoctorsInputSchema
        ),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema
            )
            .optional(),
    });

export const doctorsUpdateInputSchema: z.ZodType<Prisma.doctorsUpdateInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutDoctorsNestedInputSchema)
            .optional(),
        registers: z
            .lazy(
                () => registersUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        fields: z
            .lazy(() => fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema)
            .optional(),
        hospitals: z
            .lazy(
                () => hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        expedients: z
            .lazy(
                () => expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsCreateManyInputSchema: z.ZodType<Prisma.doctorsCreateManyInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
    });

export const doctorsUpdateManyMutationInputSchema: z.ZodType<Prisma.doctorsUpdateManyMutationInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const doctorsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const expedientsCreateInputSchema: z.ZodType<Prisma.expedientsCreateInput> =
    z.strictObject({
        duration: z.coerce.date(),
        description: z.string(),
        doctors: z
            .lazy(() => doctorsCreateNestedManyWithoutExpedientsInputSchema)
            .optional(),
        weekdays: z
            .lazy(() => weekdaysCreateNestedManyWithoutExpedientsInputSchema)
            .optional(),
    });

export const expedientsUncheckedCreateInputSchema: z.ZodType<Prisma.expedientsUncheckedCreateInput> =
    z.strictObject({
        id: z.number().int().optional(),
        duration: z.coerce.date(),
        description: z.string(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedCreateNestedManyWithoutExpedientsInputSchema
            )
            .optional(),
        weekdays: z
            .lazy(
                () =>
                    weekdaysUncheckedCreateNestedManyWithoutExpedientsInputSchema
            )
            .optional(),
    });

export const expedientsUpdateInputSchema: z.ZodType<Prisma.expedientsUpdateInput> =
    z.strictObject({
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(() => doctorsUpdateManyWithoutExpedientsNestedInputSchema)
            .optional(),
        weekdays: z
            .lazy(() => weekdaysUpdateManyWithoutExpedientsNestedInputSchema)
            .optional(),
    });

export const expedientsUncheckedUpdateInputSchema: z.ZodType<Prisma.expedientsUncheckedUpdateInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedUpdateManyWithoutExpedientsNestedInputSchema
            )
            .optional(),
        weekdays: z
            .lazy(
                () =>
                    weekdaysUncheckedUpdateManyWithoutExpedientsNestedInputSchema
            )
            .optional(),
    });

export const expedientsCreateManyInputSchema: z.ZodType<Prisma.expedientsCreateManyInput> =
    z.strictObject({
        id: z.number().int().optional(),
        duration: z.coerce.date(),
        description: z.string(),
    });

export const expedientsUpdateManyMutationInputSchema: z.ZodType<Prisma.expedientsUpdateManyMutationInput> =
    z.strictObject({
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const expedientsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.expedientsUncheckedUpdateManyInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const fieldsCreateInputSchema: z.ZodType<Prisma.fieldsCreateInput> =
    z.strictObject({
        name: z.string(),
        description: z.string().optional().nullable(),
        doctors: z
            .lazy(() => doctorsCreateNestedManyWithoutFieldsInputSchema)
            .optional(),
    });

export const fieldsUncheckedCreateInputSchema: z.ZodType<Prisma.fieldsUncheckedCreateInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
        doctors: z
            .lazy(
                () => doctorsUncheckedCreateNestedManyWithoutFieldsInputSchema
            )
            .optional(),
    });

export const fieldsUpdateInputSchema: z.ZodType<Prisma.fieldsUpdateInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        doctors: z
            .lazy(() => doctorsUpdateManyWithoutFieldsNestedInputSchema)
            .optional(),
    });

export const fieldsUncheckedUpdateInputSchema: z.ZodType<Prisma.fieldsUncheckedUpdateInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        doctors: z
            .lazy(
                () => doctorsUncheckedUpdateManyWithoutFieldsNestedInputSchema
            )
            .optional(),
    });

export const fieldsCreateManyInputSchema: z.ZodType<Prisma.fieldsCreateManyInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
    });

export const fieldsUpdateManyMutationInputSchema: z.ZodType<Prisma.fieldsUpdateManyMutationInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const fieldsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.fieldsUncheckedUpdateManyInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const hospitalsCreateInputSchema: z.ZodType<Prisma.hospitalsCreateInput> =
    z.strictObject({
        name: z.string(),
        street: z.string(),
        number: z.number().int(),
        district: z.string(),
        cep: z.string(),
        city: z.string(),
        uf: z.string(),
        doctors: z
            .lazy(() => doctorsCreateNestedManyWithoutHospitalsInputSchema)
            .optional(),
    });

export const hospitalsUncheckedCreateInputSchema: z.ZodType<Prisma.hospitalsUncheckedCreateInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        street: z.string(),
        number: z.number().int(),
        district: z.string(),
        cep: z.string(),
        city: z.string(),
        uf: z.string(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedCreateNestedManyWithoutHospitalsInputSchema
            )
            .optional(),
    });

export const hospitalsUpdateInputSchema: z.ZodType<Prisma.hospitalsUpdateInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(() => doctorsUpdateManyWithoutHospitalsNestedInputSchema)
            .optional(),
    });

export const hospitalsUncheckedUpdateInputSchema: z.ZodType<Prisma.hospitalsUncheckedUpdateInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedUpdateManyWithoutHospitalsNestedInputSchema
            )
            .optional(),
    });

export const hospitalsCreateManyInputSchema: z.ZodType<Prisma.hospitalsCreateManyInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        street: z.string(),
        number: z.number().int(),
        district: z.string(),
        cep: z.string(),
        city: z.string(),
        uf: z.string(),
    });

export const hospitalsUpdateManyMutationInputSchema: z.ZodType<Prisma.hospitalsUpdateManyMutationInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const hospitalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.hospitalsUncheckedUpdateManyInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const registersCreateInputSchema: z.ZodType<Prisma.registersCreateInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutRegistersInputSchema)
            .optional(),
        doctors: z
            .lazy(() => doctorsCreateNestedOneWithoutRegistersInputSchema)
            .optional(),
    });

export const registersUncheckedCreateInputSchema: z.ZodType<Prisma.registersUncheckedCreateInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutRegistersInputSchema
            )
            .optional(),
        doctors: z
            .lazy(
                () => doctorsUncheckedCreateNestedOneWithoutRegistersInputSchema
            )
            .optional(),
    });

export const registersUpdateInputSchema: z.ZodType<Prisma.registersUpdateInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutRegistersNestedInputSchema)
            .optional(),
        doctors: z
            .lazy(() => doctorsUpdateOneWithoutRegistersNestedInputSchema)
            .optional(),
    });

export const registersUncheckedUpdateInputSchema: z.ZodType<Prisma.registersUncheckedUpdateInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutRegistersNestedInputSchema
            )
            .optional(),
        doctors: z
            .lazy(
                () => doctorsUncheckedUpdateOneWithoutRegistersNestedInputSchema
            )
            .optional(),
    });

export const registersCreateManyInputSchema: z.ZodType<Prisma.registersCreateManyInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
    });

export const registersUpdateManyMutationInputSchema: z.ZodType<Prisma.registersUpdateManyMutationInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const registersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.registersUncheckedUpdateManyInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const weekdaysCreateInputSchema: z.ZodType<Prisma.weekdaysCreateInput> =
    z.strictObject({
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutWeekdaysInputSchema
        ),
    });

export const weekdaysUncheckedCreateInputSchema: z.ZodType<Prisma.weekdaysUncheckedCreateInput> =
    z.strictObject({
        id_expedient: z.number().int(),
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
    });

export const weekdaysUpdateInputSchema: z.ZodType<Prisma.weekdaysUpdateInput> =
    z.strictObject({
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        expedients: z
            .lazy(
                () =>
                    expedientsUpdateOneRequiredWithoutWeekdaysNestedInputSchema
            )
            .optional(),
    });

export const weekdaysUncheckedUpdateInputSchema: z.ZodType<Prisma.weekdaysUncheckedUpdateInput> =
    z.strictObject({
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const weekdaysCreateManyInputSchema: z.ZodType<Prisma.weekdaysCreateManyInput> =
    z.strictObject({
        id_expedient: z.number().int(),
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
    });

export const weekdaysUpdateManyMutationInputSchema: z.ZodType<Prisma.weekdaysUpdateManyMutationInput> =
    z.strictObject({
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const weekdaysUncheckedUpdateManyInputSchema: z.ZodType<Prisma.weekdaysUncheckedUpdateManyInput> =
    z.strictObject({
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
    z.strictObject({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    });

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
    z.strictObject({
        equals: z.coerce.date().optional(),
        in: z.coerce.date().array().optional(),
        notIn: z.coerce.date().array().optional(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
            .optional(),
    });

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
    z.strictObject({
        equals: z.coerce.date().optional().nullable(),
        in: z.coerce.date().array().optional().nullable(),
        notIn: z.coerce.date().array().optional().nullable(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeNullableFilterSchema),
            ])
            .optional()
            .nullable(),
    });

export const DoctorsScalarRelationFilterSchema: z.ZodType<Prisma.DoctorsScalarRelationFilter> =
    z.strictObject({
        is: z.lazy(() => doctorsWhereInputSchema).optional(),
        isNot: z.lazy(() => doctorsWhereInputSchema).optional(),
    });

export const RegistersScalarRelationFilterSchema: z.ZodType<Prisma.RegistersScalarRelationFilter> =
    z.strictObject({
        is: z.lazy(() => registersWhereInputSchema).optional(),
        isNot: z.lazy(() => registersWhereInputSchema).optional(),
    });

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
    z.strictObject({
        sort: z.lazy(() => SortOrderSchema),
        nulls: z.lazy(() => NullsOrderSchema).optional(),
    });

export const appointmentsOrderByRelevanceInputSchema: z.ZodType<Prisma.appointmentsOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => appointmentsOrderByRelevanceFieldEnumSchema),
            z.lazy(() => appointmentsOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const appointmentsEmail_doctorDateStartCompoundUniqueInputSchema: z.ZodType<Prisma.appointmentsEmail_doctorDateStartCompoundUniqueInput> =
    z.strictObject({
        email_doctor: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
    });

export const appointmentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.appointmentsCountOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        email_doctor: z.lazy(() => SortOrderSchema).optional(),
        email_patient: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        registered: z.lazy(() => SortOrderSchema).optional(),
    });

export const appointmentsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.appointmentsAvgOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const appointmentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.appointmentsMaxOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        email_doctor: z.lazy(() => SortOrderSchema).optional(),
        email_patient: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        registered: z.lazy(() => SortOrderSchema).optional(),
    });

export const appointmentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.appointmentsMinOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        email_doctor: z.lazy(() => SortOrderSchema).optional(),
        email_patient: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        registered: z.lazy(() => SortOrderSchema).optional(),
    });

export const appointmentsSumOrderByAggregateInputSchema: z.ZodType<Prisma.appointmentsSumOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
    z.strictObject({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([
                z.number(),
                z.lazy(() => NestedIntWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
        _sum: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedIntFilterSchema).optional(),
        _max: z.lazy(() => NestedIntFilterSchema).optional(),
    });

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
    z.strictObject({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([
                z.string(),
                z.lazy(() => NestedStringWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedStringFilterSchema).optional(),
        _max: z.lazy(() => NestedStringFilterSchema).optional(),
    });

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
    z.strictObject({
        equals: z.coerce.date().optional(),
        in: z.coerce.date().array().optional(),
        notIn: z.coerce.date().array().optional(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
        _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    });

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
    z.strictObject({
        equals: z.coerce.date().optional().nullable(),
        in: z.coerce.date().array().optional().nullable(),
        notIn: z.coerce.date().array().optional().nullable(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
            ])
            .optional()
            .nullable(),
        _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
        _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
        _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    });

export const AppointmentsListRelationFilterSchema: z.ZodType<Prisma.AppointmentsListRelationFilter> =
    z.strictObject({
        every: z.lazy(() => appointmentsWhereInputSchema).optional(),
        some: z.lazy(() => appointmentsWhereInputSchema).optional(),
        none: z.lazy(() => appointmentsWhereInputSchema).optional(),
    });

export const FieldsScalarRelationFilterSchema: z.ZodType<Prisma.FieldsScalarRelationFilter> =
    z.strictObject({
        is: z.lazy(() => fieldsWhereInputSchema).optional(),
        isNot: z.lazy(() => fieldsWhereInputSchema).optional(),
    });

export const HospitalsScalarRelationFilterSchema: z.ZodType<Prisma.HospitalsScalarRelationFilter> =
    z.strictObject({
        is: z.lazy(() => hospitalsWhereInputSchema).optional(),
        isNot: z.lazy(() => hospitalsWhereInputSchema).optional(),
    });

export const ExpedientsScalarRelationFilterSchema: z.ZodType<Prisma.ExpedientsScalarRelationFilter> =
    z.strictObject({
        is: z.lazy(() => expedientsWhereInputSchema).optional(),
        isNot: z.lazy(() => expedientsWhereInputSchema).optional(),
    });

export const appointmentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.appointmentsOrderByRelationAggregateInput> =
    z.strictObject({
        _count: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsOrderByRelevanceInputSchema: z.ZodType<Prisma.doctorsOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => doctorsOrderByRelevanceFieldEnumSchema),
            z.lazy(() => doctorsOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const doctorsCountOrderByAggregateInputSchema: z.ZodType<Prisma.doctorsCountOrderByAggregateInput> =
    z.strictObject({
        email: z.lazy(() => SortOrderSchema).optional(),
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        first_day: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.doctorsAvgOrderByAggregateInput> =
    z.strictObject({
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.doctorsMaxOrderByAggregateInput> =
    z.strictObject({
        email: z.lazy(() => SortOrderSchema).optional(),
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        first_day: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsMinOrderByAggregateInputSchema: z.ZodType<Prisma.doctorsMinOrderByAggregateInput> =
    z.strictObject({
        email: z.lazy(() => SortOrderSchema).optional(),
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        first_day: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsSumOrderByAggregateInputSchema: z.ZodType<Prisma.doctorsSumOrderByAggregateInput> =
    z.strictObject({
        id_field: z.lazy(() => SortOrderSchema).optional(),
        id_hospital: z.lazy(() => SortOrderSchema).optional(),
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
    });

export const DoctorsListRelationFilterSchema: z.ZodType<Prisma.DoctorsListRelationFilter> =
    z.strictObject({
        every: z.lazy(() => doctorsWhereInputSchema).optional(),
        some: z.lazy(() => doctorsWhereInputSchema).optional(),
        none: z.lazy(() => doctorsWhereInputSchema).optional(),
    });

export const WeekdaysListRelationFilterSchema: z.ZodType<Prisma.WeekdaysListRelationFilter> =
    z.strictObject({
        every: z.lazy(() => weekdaysWhereInputSchema).optional(),
        some: z.lazy(() => weekdaysWhereInputSchema).optional(),
        none: z.lazy(() => weekdaysWhereInputSchema).optional(),
    });

export const doctorsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.doctorsOrderByRelationAggregateInput> =
    z.strictObject({
        _count: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysOrderByRelationAggregateInputSchema: z.ZodType<Prisma.weekdaysOrderByRelationAggregateInput> =
    z.strictObject({
        _count: z.lazy(() => SortOrderSchema).optional(),
    });

export const expedientsOrderByRelevanceInputSchema: z.ZodType<Prisma.expedientsOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => expedientsOrderByRelevanceFieldEnumSchema),
            z.lazy(() => expedientsOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const expedientsCountOrderByAggregateInputSchema: z.ZodType<Prisma.expedientsCountOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        duration: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const expedientsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.expedientsAvgOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const expedientsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.expedientsMaxOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        duration: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const expedientsMinOrderByAggregateInputSchema: z.ZodType<Prisma.expedientsMinOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        duration: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const expedientsSumOrderByAggregateInputSchema: z.ZodType<Prisma.expedientsSumOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
    z.strictObject({
        equals: z.string().optional().nullable(),
        in: z.string().array().optional().nullable(),
        notIn: z.string().array().optional().nullable(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
            .optional()
            .nullable(),
    });

export const fieldsOrderByRelevanceInputSchema: z.ZodType<Prisma.fieldsOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => fieldsOrderByRelevanceFieldEnumSchema),
            z.lazy(() => fieldsOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const fieldsCountOrderByAggregateInputSchema: z.ZodType<Prisma.fieldsCountOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const fieldsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.fieldsAvgOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const fieldsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.fieldsMaxOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const fieldsMinOrderByAggregateInputSchema: z.ZodType<Prisma.fieldsMinOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
    });

export const fieldsSumOrderByAggregateInputSchema: z.ZodType<Prisma.fieldsSumOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
    });

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
    z.strictObject({
        equals: z.string().optional().nullable(),
        in: z.string().array().optional().nullable(),
        notIn: z.string().array().optional().nullable(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([
                z.string(),
                z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
            ])
            .optional()
            .nullable(),
        _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
        _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    });

export const hospitalsOrderByRelevanceInputSchema: z.ZodType<Prisma.hospitalsOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => hospitalsOrderByRelevanceFieldEnumSchema),
            z.lazy(() => hospitalsOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const hospitalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.hospitalsCountOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        street: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        district: z.lazy(() => SortOrderSchema).optional(),
        cep: z.lazy(() => SortOrderSchema).optional(),
        city: z.lazy(() => SortOrderSchema).optional(),
        uf: z.lazy(() => SortOrderSchema).optional(),
    });

export const hospitalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.hospitalsAvgOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
    });

export const hospitalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.hospitalsMaxOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        street: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        district: z.lazy(() => SortOrderSchema).optional(),
        cep: z.lazy(() => SortOrderSchema).optional(),
        city: z.lazy(() => SortOrderSchema).optional(),
        uf: z.lazy(() => SortOrderSchema).optional(),
    });

export const hospitalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.hospitalsMinOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        street: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        district: z.lazy(() => SortOrderSchema).optional(),
        cep: z.lazy(() => SortOrderSchema).optional(),
        city: z.lazy(() => SortOrderSchema).optional(),
        uf: z.lazy(() => SortOrderSchema).optional(),
    });

export const hospitalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.hospitalsSumOrderByAggregateInput> =
    z.strictObject({
        id: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
    });

export const DoctorsNullableScalarRelationFilterSchema: z.ZodType<Prisma.DoctorsNullableScalarRelationFilter> =
    z.strictObject({
        is: z
            .lazy(() => doctorsWhereInputSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => doctorsWhereInputSchema)
            .optional()
            .nullable(),
    });

export const registersOrderByRelevanceInputSchema: z.ZodType<Prisma.registersOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => registersOrderByRelevanceFieldEnumSchema),
            z.lazy(() => registersOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const registersCountOrderByAggregateInputSchema: z.ZodType<Prisma.registersCountOrderByAggregateInput> =
    z.strictObject({
        name: z.lazy(() => SortOrderSchema).optional(),
        cpf: z.lazy(() => SortOrderSchema).optional(),
        gender: z.lazy(() => SortOrderSchema).optional(),
        birth: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
    });

export const registersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.registersAvgOrderByAggregateInput> =
    z.strictObject({
        type: z.lazy(() => SortOrderSchema).optional(),
    });

export const registersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.registersMaxOrderByAggregateInput> =
    z.strictObject({
        name: z.lazy(() => SortOrderSchema).optional(),
        cpf: z.lazy(() => SortOrderSchema).optional(),
        gender: z.lazy(() => SortOrderSchema).optional(),
        birth: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
    });

export const registersMinOrderByAggregateInputSchema: z.ZodType<Prisma.registersMinOrderByAggregateInput> =
    z.strictObject({
        name: z.lazy(() => SortOrderSchema).optional(),
        cpf: z.lazy(() => SortOrderSchema).optional(),
        gender: z.lazy(() => SortOrderSchema).optional(),
        birth: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
    });

export const registersSumOrderByAggregateInputSchema: z.ZodType<Prisma.registersSumOrderByAggregateInput> =
    z.strictObject({
        type: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysOrderByRelevanceInputSchema: z.ZodType<Prisma.weekdaysOrderByRelevanceInput> =
    z.strictObject({
        fields: z.union([
            z.lazy(() => weekdaysOrderByRelevanceFieldEnumSchema),
            z.lazy(() => weekdaysOrderByRelevanceFieldEnumSchema).array(),
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string(),
    });

export const weekdaysId_expedientWeekdayWeekCompoundUniqueInputSchema: z.ZodType<Prisma.weekdaysId_expedientWeekdayWeekCompoundUniqueInput> =
    z.strictObject({
        id_expedient: z.number(),
        weekday: z.string(),
        week: z.number(),
    });

export const weekdaysCountOrderByAggregateInputSchema: z.ZodType<Prisma.weekdaysCountOrderByAggregateInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        weekday: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        break: z.lazy(() => SortOrderSchema).optional(),
        time_break: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysAvgOrderByAggregateInputSchema: z.ZodType<Prisma.weekdaysAvgOrderByAggregateInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysMaxOrderByAggregateInputSchema: z.ZodType<Prisma.weekdaysMaxOrderByAggregateInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        weekday: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        break: z.lazy(() => SortOrderSchema).optional(),
        time_break: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysMinOrderByAggregateInputSchema: z.ZodType<Prisma.weekdaysMinOrderByAggregateInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        weekday: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
        start: z.lazy(() => SortOrderSchema).optional(),
        end: z.lazy(() => SortOrderSchema).optional(),
        break: z.lazy(() => SortOrderSchema).optional(),
        time_break: z.lazy(() => SortOrderSchema).optional(),
    });

export const weekdaysSumOrderByAggregateInputSchema: z.ZodType<Prisma.weekdaysSumOrderByAggregateInput> =
    z.strictObject({
        id_expedient: z.lazy(() => SortOrderSchema).optional(),
        week: z.lazy(() => SortOrderSchema).optional(),
    });

export const doctorsCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsCreateNestedOneWithoutAppointmentsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutAppointmentsInputSchema)
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
    });

export const registersCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersCreateNestedOneWithoutAppointmentsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => registersCreateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => registersUncheckedCreateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => registersCreateOrConnectWithoutAppointmentsInputSchema)
            .optional(),
        connect: z.lazy(() => registersWhereUniqueInputSchema).optional(),
    });

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
    z.strictObject({
        set: z.coerce.date().optional(),
    });

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
    z.strictObject({
        set: z.coerce.date().optional().nullable(),
    });

export const doctorsUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.doctorsUpdateOneRequiredWithoutAppointmentsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutAppointmentsInputSchema)
            .optional(),
        upsert: z
            .lazy(() => doctorsUpsertWithoutAppointmentsInputSchema)
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpdateToOneWithWhereWithoutAppointmentsInputSchema
                ),
                z.lazy(() => doctorsUpdateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => doctorsUncheckedUpdateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
    });

export const registersUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.registersUpdateOneRequiredWithoutAppointmentsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => registersCreateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => registersUncheckedCreateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => registersCreateOrConnectWithoutAppointmentsInputSchema)
            .optional(),
        upsert: z
            .lazy(() => registersUpsertWithoutAppointmentsInputSchema)
            .optional(),
        connect: z.lazy(() => registersWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        registersUpdateToOneWithWhereWithoutAppointmentsInputSchema
                ),
                z.lazy(() => registersUpdateWithoutAppointmentsInputSchema),
                z.lazy(
                    () => registersUncheckedUpdateWithoutAppointmentsInputSchema
                ),
            ])
            .optional(),
    });

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
    z.strictObject({
        set: z.number().optional(),
        increment: z.number().optional(),
        decrement: z.number().optional(),
        multiply: z.number().optional(),
        divide: z.number().optional(),
    });

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
    z.strictObject({
        set: z.string().optional(),
    });

export const appointmentsCreateNestedManyWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsCreateNestedManyWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutDoctorsInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyDoctorsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const registersCreateNestedOneWithoutDoctorsInputSchema: z.ZodType<Prisma.registersCreateNestedOneWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => registersCreateWithoutDoctorsInputSchema),
                z.lazy(() => registersUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => registersCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => registersWhereUniqueInputSchema).optional(),
    });

export const fieldsCreateNestedOneWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsCreateNestedOneWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => fieldsCreateWithoutDoctorsInputSchema),
                z.lazy(() => fieldsUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => fieldsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => fieldsWhereUniqueInputSchema).optional(),
    });

export const hospitalsCreateNestedOneWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsCreateNestedOneWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => hospitalsCreateWithoutDoctorsInputSchema),
                z.lazy(() => hospitalsUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => hospitalsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => hospitalsWhereUniqueInputSchema).optional(),
    });

export const expedientsCreateNestedOneWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsCreateNestedOneWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => expedientsCreateWithoutDoctorsInputSchema),
                z.lazy(
                    () => expedientsUncheckedCreateWithoutDoctorsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => expedientsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => expedientsWhereUniqueInputSchema).optional(),
    });

export const appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUncheckedCreateNestedManyWithoutDoctorsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutDoctorsInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyDoctorsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const appointmentsUpdateManyWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.appointmentsUpdateManyWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutDoctorsInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpsertWithWhereUniqueWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpsertWithWhereUniqueWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyDoctorsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateWithWhereUniqueWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateWithWhereUniqueWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateManyWithWhereWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateManyWithWhereWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const registersUpdateOneRequiredWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.registersUpdateOneRequiredWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => registersCreateWithoutDoctorsInputSchema),
                z.lazy(() => registersUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => registersCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        upsert: z
            .lazy(() => registersUpsertWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => registersWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () => registersUpdateToOneWithWhereWithoutDoctorsInputSchema
                ),
                z.lazy(() => registersUpdateWithoutDoctorsInputSchema),
                z.lazy(() => registersUncheckedUpdateWithoutDoctorsInputSchema),
            ])
            .optional(),
    });

export const fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.fieldsUpdateOneRequiredWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => fieldsCreateWithoutDoctorsInputSchema),
                z.lazy(() => fieldsUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => fieldsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        upsert: z.lazy(() => fieldsUpsertWithoutDoctorsInputSchema).optional(),
        connect: z.lazy(() => fieldsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () => fieldsUpdateToOneWithWhereWithoutDoctorsInputSchema
                ),
                z.lazy(() => fieldsUpdateWithoutDoctorsInputSchema),
                z.lazy(() => fieldsUncheckedUpdateWithoutDoctorsInputSchema),
            ])
            .optional(),
    });

export const hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.hospitalsUpdateOneRequiredWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => hospitalsCreateWithoutDoctorsInputSchema),
                z.lazy(() => hospitalsUncheckedCreateWithoutDoctorsInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => hospitalsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        upsert: z
            .lazy(() => hospitalsUpsertWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => hospitalsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () => hospitalsUpdateToOneWithWhereWithoutDoctorsInputSchema
                ),
                z.lazy(() => hospitalsUpdateWithoutDoctorsInputSchema),
                z.lazy(() => hospitalsUncheckedUpdateWithoutDoctorsInputSchema),
            ])
            .optional(),
    });

export const expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.expedientsUpdateOneRequiredWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => expedientsCreateWithoutDoctorsInputSchema),
                z.lazy(
                    () => expedientsUncheckedCreateWithoutDoctorsInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => expedientsCreateOrConnectWithoutDoctorsInputSchema)
            .optional(),
        upsert: z
            .lazy(() => expedientsUpsertWithoutDoctorsInputSchema)
            .optional(),
        connect: z.lazy(() => expedientsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        expedientsUpdateToOneWithWhereWithoutDoctorsInputSchema
                ),
                z.lazy(() => expedientsUpdateWithoutDoctorsInputSchema),
                z.lazy(
                    () => expedientsUncheckedUpdateWithoutDoctorsInputSchema
                ),
            ])
            .optional(),
    });

export const appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateManyWithoutDoctorsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutDoctorsInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpsertWithWhereUniqueWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpsertWithWhereUniqueWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyDoctorsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateWithWhereUniqueWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateWithWhereUniqueWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateManyWithWhereWithoutDoctorsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateManyWithWhereWithoutDoctorsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsCreateNestedManyWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsCreateNestedManyWithoutExpedientsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema).array(),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const weekdaysCreateNestedManyWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysCreateNestedManyWithoutExpedientsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
                z
                    .lazy(() => weekdaysCreateWithoutExpedientsInputSchema)
                    .array(),
                z.lazy(
                    () => weekdaysUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => weekdaysCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => weekdaysCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedCreateNestedManyWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateNestedManyWithoutExpedientsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema).array(),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const weekdaysUncheckedCreateNestedManyWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUncheckedCreateNestedManyWithoutExpedientsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
                z
                    .lazy(() => weekdaysCreateWithoutExpedientsInputSchema)
                    .array(),
                z.lazy(
                    () => weekdaysUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => weekdaysCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => weekdaysCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUpdateManyWithoutExpedientsNestedInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithoutExpedientsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema).array(),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpsertWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpdateWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateManyWithWhereWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const weekdaysUpdateManyWithoutExpedientsNestedInputSchema: z.ZodType<Prisma.weekdaysUpdateManyWithoutExpedientsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
                z
                    .lazy(() => weekdaysCreateWithoutExpedientsInputSchema)
                    .array(),
                z.lazy(
                    () => weekdaysUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => weekdaysCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpsertWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpsertWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => weekdaysCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpdateWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpdateWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpdateManyWithWhereWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpdateManyWithWhereWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => weekdaysScalarWhereInputSchema),
                z.lazy(() => weekdaysScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutExpedientsNestedInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutExpedientsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
                z.lazy(() => doctorsCreateWithoutExpedientsInputSchema).array(),
                z.lazy(
                    () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpsertWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpdateWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateManyWithWhereWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const weekdaysUncheckedUpdateManyWithoutExpedientsNestedInputSchema: z.ZodType<Prisma.weekdaysUncheckedUpdateManyWithoutExpedientsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
                z
                    .lazy(() => weekdaysCreateWithoutExpedientsInputSchema)
                    .array(),
                z.lazy(
                    () => weekdaysUncheckedCreateWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUncheckedCreateWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => weekdaysCreateOrConnectWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysCreateOrConnectWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpsertWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpsertWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => weekdaysCreateManyExpedientsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => weekdaysWhereUniqueInputSchema),
                z.lazy(() => weekdaysWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpdateWithWhereUniqueWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpdateWithWhereUniqueWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        weekdaysUpdateManyWithWhereWithoutExpedientsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            weekdaysUpdateManyWithWhereWithoutExpedientsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => weekdaysScalarWhereInputSchema),
                z.lazy(() => weekdaysScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsCreateNestedManyWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsCreateNestedManyWithoutFieldsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyFieldsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedCreateNestedManyWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateNestedManyWithoutFieldsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyFieldsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
    z.strictObject({
        set: z.string().optional().nullable(),
    });

export const doctorsUpdateManyWithoutFieldsNestedInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithoutFieldsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () => doctorsUpsertWithWhereUniqueWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyFieldsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () => doctorsUpdateWithWhereUniqueWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUpdateManyWithWhereWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutFieldsNestedInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutFieldsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
                z.lazy(() => doctorsCreateWithoutFieldsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema),
                z
                    .lazy(() => doctorsCreateOrConnectWithoutFieldsInputSchema)
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () => doctorsUpsertWithWhereUniqueWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyFieldsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () => doctorsUpdateWithWhereUniqueWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutFieldsInputSchema
                ),
                z
                    .lazy(
                        () => doctorsUpdateManyWithWhereWithoutFieldsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsCreateNestedManyWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsCreateNestedManyWithoutHospitalsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyHospitalsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedCreateNestedManyWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateNestedManyWithoutHospitalsInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyHospitalsInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUpdateManyWithoutHospitalsNestedInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithoutHospitalsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpsertWithWhereUniqueWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyHospitalsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpdateWithWhereUniqueWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateManyWithWhereWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutHospitalsNestedInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutHospitalsNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
                z.lazy(() => doctorsCreateWithoutHospitalsInputSchema).array(),
                z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsUncheckedCreateWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => doctorsCreateOrConnectWithoutHospitalsInputSchema),
                z
                    .lazy(
                        () => doctorsCreateOrConnectWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpsertWithWhereUniqueWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpsertWithWhereUniqueWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => doctorsCreateManyHospitalsInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => doctorsWhereUniqueInputSchema),
                z.lazy(() => doctorsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        doctorsUpdateWithWhereUniqueWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateWithWhereUniqueWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => doctorsUpdateManyWithWhereWithoutHospitalsInputSchema
                ),
                z
                    .lazy(
                        () =>
                            doctorsUpdateManyWithWhereWithoutHospitalsInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const appointmentsCreateNestedManyWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsCreateNestedManyWithoutRegistersInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutRegistersInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyRegistersInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsCreateNestedOneWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsCreateNestedOneWithoutRegistersInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutRegistersInputSchema)
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
    });

export const appointmentsUncheckedCreateNestedManyWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUncheckedCreateNestedManyWithoutRegistersInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutRegistersInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyRegistersInputEnvelopeSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedCreateNestedOneWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateNestedOneWithoutRegistersInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutRegistersInputSchema)
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
    });

export const appointmentsUpdateManyWithoutRegistersNestedInputSchema: z.ZodType<Prisma.appointmentsUpdateManyWithoutRegistersNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutRegistersInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpsertWithWhereUniqueWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpsertWithWhereUniqueWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyRegistersInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateWithWhereUniqueWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateWithWhereUniqueWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateManyWithWhereWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateManyWithWhereWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUpdateOneWithoutRegistersNestedInputSchema: z.ZodType<Prisma.doctorsUpdateOneWithoutRegistersNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutRegistersInputSchema)
            .optional(),
        upsert: z
            .lazy(() => doctorsUpsertWithoutRegistersInputSchema)
            .optional(),
        disconnect: z
            .union([z.boolean(), z.lazy(() => doctorsWhereInputSchema)])
            .optional(),
        delete: z
            .union([z.boolean(), z.lazy(() => doctorsWhereInputSchema)])
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () => doctorsUpdateToOneWithWhereWithoutRegistersInputSchema
                ),
                z.lazy(() => doctorsUpdateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedUpdateWithoutRegistersInputSchema),
            ])
            .optional(),
    });

export const appointmentsUncheckedUpdateManyWithoutRegistersNestedInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateManyWithoutRegistersNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
                z
                    .lazy(() => appointmentsCreateWithoutRegistersInputSchema)
                    .array(),
                z.lazy(
                    () => appointmentsUncheckedCreateWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUncheckedCreateWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(
                    () => appointmentsCreateOrConnectWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsCreateOrConnectWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpsertWithWhereUniqueWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpsertWithWhereUniqueWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => appointmentsCreateManyRegistersInputEnvelopeSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => appointmentsWhereUniqueInputSchema),
                z.lazy(() => appointmentsWhereUniqueInputSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateWithWhereUniqueWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateWithWhereUniqueWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () =>
                        appointmentsUpdateManyWithWhereWithoutRegistersInputSchema
                ),
                z
                    .lazy(
                        () =>
                            appointmentsUpdateManyWithWhereWithoutRegistersInputSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
    });

export const doctorsUncheckedUpdateOneWithoutRegistersNestedInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateOneWithoutRegistersNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => doctorsCreateOrConnectWithoutRegistersInputSchema)
            .optional(),
        upsert: z
            .lazy(() => doctorsUpsertWithoutRegistersInputSchema)
            .optional(),
        disconnect: z
            .union([z.boolean(), z.lazy(() => doctorsWhereInputSchema)])
            .optional(),
        delete: z
            .union([z.boolean(), z.lazy(() => doctorsWhereInputSchema)])
            .optional(),
        connect: z.lazy(() => doctorsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () => doctorsUpdateToOneWithWhereWithoutRegistersInputSchema
                ),
                z.lazy(() => doctorsUpdateWithoutRegistersInputSchema),
                z.lazy(() => doctorsUncheckedUpdateWithoutRegistersInputSchema),
            ])
            .optional(),
    });

export const expedientsCreateNestedOneWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsCreateNestedOneWithoutWeekdaysInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => expedientsCreateWithoutWeekdaysInputSchema),
                z.lazy(
                    () => expedientsUncheckedCreateWithoutWeekdaysInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => expedientsCreateOrConnectWithoutWeekdaysInputSchema)
            .optional(),
        connect: z.lazy(() => expedientsWhereUniqueInputSchema).optional(),
    });

export const expedientsUpdateOneRequiredWithoutWeekdaysNestedInputSchema: z.ZodType<Prisma.expedientsUpdateOneRequiredWithoutWeekdaysNestedInput> =
    z.strictObject({
        create: z
            .union([
                z.lazy(() => expedientsCreateWithoutWeekdaysInputSchema),
                z.lazy(
                    () => expedientsUncheckedCreateWithoutWeekdaysInputSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => expedientsCreateOrConnectWithoutWeekdaysInputSchema)
            .optional(),
        upsert: z
            .lazy(() => expedientsUpsertWithoutWeekdaysInputSchema)
            .optional(),
        connect: z.lazy(() => expedientsWhereUniqueInputSchema).optional(),
        update: z
            .union([
                z.lazy(
                    () =>
                        expedientsUpdateToOneWithWhereWithoutWeekdaysInputSchema
                ),
                z.lazy(() => expedientsUpdateWithoutWeekdaysInputSchema),
                z.lazy(
                    () => expedientsUncheckedUpdateWithoutWeekdaysInputSchema
                ),
            ])
            .optional(),
    });

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
    z.strictObject({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntFilterSchema)])
            .optional(),
    });

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
    z.strictObject({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    });

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
    z.strictObject({
        equals: z.coerce.date().optional(),
        in: z.coerce.date().array().optional(),
        notIn: z.coerce.date().array().optional(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
            .optional(),
    });

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
    z.strictObject({
        equals: z.coerce.date().optional().nullable(),
        in: z.coerce.date().array().optional().nullable(),
        notIn: z.coerce.date().array().optional().nullable(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeNullableFilterSchema),
            ])
            .optional()
            .nullable(),
    });

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
    z.strictObject({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([
                z.number(),
                z.lazy(() => NestedIntWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
        _sum: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedIntFilterSchema).optional(),
        _max: z.lazy(() => NestedIntFilterSchema).optional(),
    });

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> =
    z.strictObject({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
            .optional(),
    });

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
    z.strictObject({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([
                z.string(),
                z.lazy(() => NestedStringWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedStringFilterSchema).optional(),
        _max: z.lazy(() => NestedStringFilterSchema).optional(),
    });

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
    z.strictObject({
        equals: z.coerce.date().optional(),
        in: z.coerce.date().array().optional(),
        notIn: z.coerce.date().array().optional(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterSchema).optional(),
        _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
        _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    });

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
    z.strictObject({
        equals: z.coerce.date().optional().nullable(),
        in: z.coerce.date().array().optional().nullable(),
        notIn: z.coerce.date().array().optional().nullable(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([
                z.coerce.date(),
                z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
            ])
            .optional()
            .nullable(),
        _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
        _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
        _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    });

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
    z.strictObject({
        equals: z.number().optional().nullable(),
        in: z.number().array().optional().nullable(),
        notIn: z.number().array().optional().nullable(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
            .optional()
            .nullable(),
    });

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
    z.strictObject({
        equals: z.string().optional().nullable(),
        in: z.string().array().optional().nullable(),
        notIn: z.string().array().optional().nullable(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
            .optional()
            .nullable(),
    });

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
    z.strictObject({
        equals: z.string().optional().nullable(),
        in: z.string().array().optional().nullable(),
        notIn: z.string().array().optional().nullable(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([
                z.string(),
                z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
            ])
            .optional()
            .nullable(),
        _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
        _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    });

export const doctorsCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsCreateWithoutAppointmentsInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutDoctorsInputSchema
        ),
        fields: z.lazy(() => fieldsCreateNestedOneWithoutDoctorsInputSchema),
        hospitals: z.lazy(
            () => hospitalsCreateNestedOneWithoutDoctorsInputSchema
        ),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateWithoutAppointmentsInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
    });

export const doctorsCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsCreateOrConnectWithoutAppointmentsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutAppointmentsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutAppointmentsInputSchema),
        ]),
    });

export const registersCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersCreateWithoutAppointmentsInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        doctors: z
            .lazy(() => doctorsCreateNestedOneWithoutRegistersInputSchema)
            .optional(),
    });

export const registersUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersUncheckedCreateWithoutAppointmentsInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        doctors: z
            .lazy(
                () => doctorsUncheckedCreateNestedOneWithoutRegistersInputSchema
            )
            .optional(),
    });

export const registersCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersCreateOrConnectWithoutAppointmentsInput> =
    z.strictObject({
        where: z.lazy(() => registersWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => registersCreateWithoutAppointmentsInputSchema),
            z.lazy(
                () => registersUncheckedCreateWithoutAppointmentsInputSchema
            ),
        ]),
    });

export const doctorsUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsUpsertWithoutAppointmentsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => doctorsUpdateWithoutAppointmentsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutAppointmentsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutAppointmentsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutAppointmentsInputSchema),
        ]),
        where: z.lazy(() => doctorsWhereInputSchema).optional(),
    });

export const doctorsUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsUpdateToOneWithWhereWithoutAppointmentsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => doctorsUpdateWithoutAppointmentsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutAppointmentsInputSchema),
        ]),
    });

export const doctorsUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsUpdateWithoutAppointmentsInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registers: z
            .lazy(
                () => registersUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        fields: z
            .lazy(() => fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema)
            .optional(),
        hospitals: z
            .lazy(
                () => hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        expedients: z
            .lazy(
                () => expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateWithoutAppointmentsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const registersUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersUpsertWithoutAppointmentsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => registersUpdateWithoutAppointmentsInputSchema),
            z.lazy(
                () => registersUncheckedUpdateWithoutAppointmentsInputSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => registersCreateWithoutAppointmentsInputSchema),
            z.lazy(
                () => registersUncheckedCreateWithoutAppointmentsInputSchema
            ),
        ]),
        where: z.lazy(() => registersWhereInputSchema).optional(),
    });

export const registersUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersUpdateToOneWithWhereWithoutAppointmentsInput> =
    z.strictObject({
        where: z.lazy(() => registersWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => registersUpdateWithoutAppointmentsInputSchema),
            z.lazy(
                () => registersUncheckedUpdateWithoutAppointmentsInputSchema
            ),
        ]),
    });

export const registersUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersUpdateWithoutAppointmentsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(() => doctorsUpdateOneWithoutRegistersNestedInputSchema)
            .optional(),
    });

export const registersUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.registersUncheckedUpdateWithoutAppointmentsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(
                () => doctorsUncheckedUpdateOneWithoutRegistersNestedInputSchema
            )
            .optional(),
    });

export const appointmentsCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsCreateWithoutDoctorsInput> =
    z.strictObject({
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutAppointmentsInputSchema
        ),
    });

export const appointmentsUncheckedCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUncheckedCreateWithoutDoctorsInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_patient: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsCreateOrConnectWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsCreateOrConnectWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
            z.lazy(() => appointmentsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const appointmentsCreateManyDoctorsInputEnvelopeSchema: z.ZodType<Prisma.appointmentsCreateManyDoctorsInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => appointmentsCreateManyDoctorsInputSchema),
            z.lazy(() => appointmentsCreateManyDoctorsInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const registersCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.registersCreateWithoutDoctorsInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutRegistersInputSchema)
            .optional(),
    });

export const registersUncheckedCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.registersUncheckedCreateWithoutDoctorsInput> =
    z.strictObject({
        name: z.string(),
        cpf: z.string(),
        gender: z.string(),
        birth: z.coerce.date(),
        email: z.string(),
        password: z.string(),
        type: z.number().int(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutRegistersInputSchema
            )
            .optional(),
    });

export const registersCreateOrConnectWithoutDoctorsInputSchema: z.ZodType<Prisma.registersCreateOrConnectWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => registersWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => registersCreateWithoutDoctorsInputSchema),
            z.lazy(() => registersUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const fieldsCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsCreateWithoutDoctorsInput> =
    z.strictObject({
        name: z.string(),
        description: z.string().optional().nullable(),
    });

export const fieldsUncheckedCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsUncheckedCreateWithoutDoctorsInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
    });

export const fieldsCreateOrConnectWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsCreateOrConnectWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => fieldsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => fieldsCreateWithoutDoctorsInputSchema),
            z.lazy(() => fieldsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const hospitalsCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsCreateWithoutDoctorsInput> =
    z.strictObject({
        name: z.string(),
        street: z.string(),
        number: z.number().int(),
        district: z.string(),
        cep: z.string(),
        city: z.string(),
        uf: z.string(),
    });

export const hospitalsUncheckedCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsUncheckedCreateWithoutDoctorsInput> =
    z.strictObject({
        id: z.number().int().optional(),
        name: z.string(),
        street: z.string(),
        number: z.number().int(),
        district: z.string(),
        cep: z.string(),
        city: z.string(),
        uf: z.string(),
    });

export const hospitalsCreateOrConnectWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsCreateOrConnectWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => hospitalsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => hospitalsCreateWithoutDoctorsInputSchema),
            z.lazy(() => hospitalsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const expedientsCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsCreateWithoutDoctorsInput> =
    z.strictObject({
        duration: z.coerce.date(),
        description: z.string(),
        weekdays: z
            .lazy(() => weekdaysCreateNestedManyWithoutExpedientsInputSchema)
            .optional(),
    });

export const expedientsUncheckedCreateWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsUncheckedCreateWithoutDoctorsInput> =
    z.strictObject({
        id: z.number().int().optional(),
        duration: z.coerce.date(),
        description: z.string(),
        weekdays: z
            .lazy(
                () =>
                    weekdaysUncheckedCreateNestedManyWithoutExpedientsInputSchema
            )
            .optional(),
    });

export const expedientsCreateOrConnectWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsCreateOrConnectWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => expedientsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => expedientsCreateWithoutDoctorsInputSchema),
            z.lazy(() => expedientsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const appointmentsUpsertWithWhereUniqueWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUpsertWithWhereUniqueWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => appointmentsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => appointmentsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => appointmentsCreateWithoutDoctorsInputSchema),
            z.lazy(() => appointmentsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
    });

export const appointmentsUpdateWithWhereUniqueWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUpdateWithWhereUniqueWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => appointmentsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => appointmentsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
    });

export const appointmentsUpdateManyWithWhereWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUpdateManyWithWhereWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => appointmentsUpdateManyMutationInputSchema),
            z.lazy(
                () => appointmentsUncheckedUpdateManyWithoutDoctorsInputSchema
            ),
        ]),
    });

export const appointmentsScalarWhereInputSchema: z.ZodType<Prisma.appointmentsScalarWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => appointmentsScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => appointmentsScalarWhereInputSchema),
                z.lazy(() => appointmentsScalarWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        email_doctor: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        email_patient: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        registered: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
    });

export const registersUpsertWithoutDoctorsInputSchema: z.ZodType<Prisma.registersUpsertWithoutDoctorsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => registersUpdateWithoutDoctorsInputSchema),
            z.lazy(() => registersUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => registersCreateWithoutDoctorsInputSchema),
            z.lazy(() => registersUncheckedCreateWithoutDoctorsInputSchema),
        ]),
        where: z.lazy(() => registersWhereInputSchema).optional(),
    });

export const registersUpdateToOneWithWhereWithoutDoctorsInputSchema: z.ZodType<Prisma.registersUpdateToOneWithWhereWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => registersWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => registersUpdateWithoutDoctorsInputSchema),
            z.lazy(() => registersUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
    });

export const registersUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.registersUpdateWithoutDoctorsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutRegistersNestedInputSchema)
            .optional(),
    });

export const registersUncheckedUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.registersUncheckedUpdateWithoutDoctorsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cpf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gender: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        birth: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        type: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutRegistersNestedInputSchema
            )
            .optional(),
    });

export const fieldsUpsertWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsUpsertWithoutDoctorsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => fieldsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => fieldsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => fieldsCreateWithoutDoctorsInputSchema),
            z.lazy(() => fieldsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
        where: z.lazy(() => fieldsWhereInputSchema).optional(),
    });

export const fieldsUpdateToOneWithWhereWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsUpdateToOneWithWhereWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => fieldsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => fieldsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => fieldsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
    });

export const fieldsUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsUpdateWithoutDoctorsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const fieldsUncheckedUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.fieldsUncheckedUpdateWithoutDoctorsInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const hospitalsUpsertWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsUpsertWithoutDoctorsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => hospitalsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => hospitalsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => hospitalsCreateWithoutDoctorsInputSchema),
            z.lazy(() => hospitalsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
        where: z.lazy(() => hospitalsWhereInputSchema).optional(),
    });

export const hospitalsUpdateToOneWithWhereWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsUpdateToOneWithWhereWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => hospitalsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => hospitalsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => hospitalsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
    });

export const hospitalsUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsUpdateWithoutDoctorsInput> =
    z.strictObject({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const hospitalsUncheckedUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.hospitalsUncheckedUpdateWithoutDoctorsInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        street: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        number: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        district: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        cep: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        uf: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const expedientsUpsertWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsUpsertWithoutDoctorsInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => expedientsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => expedientsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => expedientsCreateWithoutDoctorsInputSchema),
            z.lazy(() => expedientsUncheckedCreateWithoutDoctorsInputSchema),
        ]),
        where: z.lazy(() => expedientsWhereInputSchema).optional(),
    });

export const expedientsUpdateToOneWithWhereWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsUpdateToOneWithWhereWithoutDoctorsInput> =
    z.strictObject({
        where: z.lazy(() => expedientsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => expedientsUpdateWithoutDoctorsInputSchema),
            z.lazy(() => expedientsUncheckedUpdateWithoutDoctorsInputSchema),
        ]),
    });

export const expedientsUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsUpdateWithoutDoctorsInput> =
    z.strictObject({
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        weekdays: z
            .lazy(() => weekdaysUpdateManyWithoutExpedientsNestedInputSchema)
            .optional(),
    });

export const expedientsUncheckedUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.expedientsUncheckedUpdateWithoutDoctorsInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        weekdays: z
            .lazy(
                () =>
                    weekdaysUncheckedUpdateManyWithoutExpedientsNestedInputSchema
            )
            .optional(),
    });

export const doctorsCreateWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsCreateWithoutExpedientsInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutDoctorsInputSchema)
            .optional(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutDoctorsInputSchema
        ),
        fields: z.lazy(() => fieldsCreateNestedOneWithoutDoctorsInputSchema),
        hospitals: z.lazy(
            () => hospitalsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateWithoutExpedientsInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema
            )
            .optional(),
    });

export const doctorsCreateOrConnectWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsCreateOrConnectWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutExpedientsInputSchema),
        ]),
    });

export const doctorsCreateManyExpedientsInputEnvelopeSchema: z.ZodType<Prisma.doctorsCreateManyExpedientsInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => doctorsCreateManyExpedientsInputSchema),
            z.lazy(() => doctorsCreateManyExpedientsInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const weekdaysCreateWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysCreateWithoutExpedientsInput> =
    z.strictObject({
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
    });

export const weekdaysUncheckedCreateWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUncheckedCreateWithoutExpedientsInput> =
    z.strictObject({
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
    });

export const weekdaysCreateOrConnectWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysCreateOrConnectWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => weekdaysWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
            z.lazy(() => weekdaysUncheckedCreateWithoutExpedientsInputSchema),
        ]),
    });

export const weekdaysCreateManyExpedientsInputEnvelopeSchema: z.ZodType<Prisma.weekdaysCreateManyExpedientsInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => weekdaysCreateManyExpedientsInputSchema),
            z.lazy(() => weekdaysCreateManyExpedientsInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const doctorsUpsertWithWhereUniqueWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUpsertWithWhereUniqueWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => doctorsUpdateWithoutExpedientsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutExpedientsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutExpedientsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutExpedientsInputSchema),
        ]),
    });

export const doctorsUpdateWithWhereUniqueWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUpdateWithWhereUniqueWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateWithoutExpedientsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutExpedientsInputSchema),
        ]),
    });

export const doctorsUpdateManyWithWhereWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithWhereWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateManyMutationInputSchema),
            z.lazy(
                () => doctorsUncheckedUpdateManyWithoutExpedientsInputSchema
            ),
        ]),
    });

export const doctorsScalarWhereInputSchema: z.ZodType<Prisma.doctorsScalarWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => doctorsScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => doctorsScalarWhereInputSchema),
                z.lazy(() => doctorsScalarWhereInputSchema).array(),
            ])
            .optional(),
        email: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        id_field: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        id_hospital: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        first_day: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
    });

export const weekdaysUpsertWithWhereUniqueWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUpsertWithWhereUniqueWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => weekdaysWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => weekdaysUpdateWithoutExpedientsInputSchema),
            z.lazy(() => weekdaysUncheckedUpdateWithoutExpedientsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => weekdaysCreateWithoutExpedientsInputSchema),
            z.lazy(() => weekdaysUncheckedCreateWithoutExpedientsInputSchema),
        ]),
    });

export const weekdaysUpdateWithWhereUniqueWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUpdateWithWhereUniqueWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => weekdaysWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => weekdaysUpdateWithoutExpedientsInputSchema),
            z.lazy(() => weekdaysUncheckedUpdateWithoutExpedientsInputSchema),
        ]),
    });

export const weekdaysUpdateManyWithWhereWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUpdateManyWithWhereWithoutExpedientsInput> =
    z.strictObject({
        where: z.lazy(() => weekdaysScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => weekdaysUpdateManyMutationInputSchema),
            z.lazy(
                () => weekdaysUncheckedUpdateManyWithoutExpedientsInputSchema
            ),
        ]),
    });

export const weekdaysScalarWhereInputSchema: z.ZodType<Prisma.weekdaysScalarWhereInput> =
    z.strictObject({
        AND: z
            .union([
                z.lazy(() => weekdaysScalarWhereInputSchema),
                z.lazy(() => weekdaysScalarWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => weekdaysScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => weekdaysScalarWhereInputSchema),
                z.lazy(() => weekdaysScalarWhereInputSchema).array(),
            ])
            .optional(),
        id_expedient: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        weekday: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        week: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        break: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
    });

export const doctorsCreateWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsCreateWithoutFieldsInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutDoctorsInputSchema)
            .optional(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutDoctorsInputSchema
        ),
        hospitals: z.lazy(
            () => hospitalsCreateNestedOneWithoutDoctorsInputSchema
        ),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateWithoutFieldsInput> =
    z.strictObject({
        email: z.string(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema
            )
            .optional(),
    });

export const doctorsCreateOrConnectWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsCreateOrConnectWithoutFieldsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
        ]),
    });

export const doctorsCreateManyFieldsInputEnvelopeSchema: z.ZodType<Prisma.doctorsCreateManyFieldsInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => doctorsCreateManyFieldsInputSchema),
            z.lazy(() => doctorsCreateManyFieldsInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const doctorsUpsertWithWhereUniqueWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUpsertWithWhereUniqueWithoutFieldsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => doctorsUpdateWithoutFieldsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutFieldsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutFieldsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutFieldsInputSchema),
        ]),
    });

export const doctorsUpdateWithWhereUniqueWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUpdateWithWhereUniqueWithoutFieldsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateWithoutFieldsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutFieldsInputSchema),
        ]),
    });

export const doctorsUpdateManyWithWhereWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithWhereWithoutFieldsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateManyMutationInputSchema),
            z.lazy(() => doctorsUncheckedUpdateManyWithoutFieldsInputSchema),
        ]),
    });

export const doctorsCreateWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsCreateWithoutHospitalsInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutDoctorsInputSchema)
            .optional(),
        registers: z.lazy(
            () => registersCreateNestedOneWithoutDoctorsInputSchema
        ),
        fields: z.lazy(() => fieldsCreateNestedOneWithoutDoctorsInputSchema),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateWithoutHospitalsInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema
            )
            .optional(),
    });

export const doctorsCreateOrConnectWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsCreateOrConnectWithoutHospitalsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
        ]),
    });

export const doctorsCreateManyHospitalsInputEnvelopeSchema: z.ZodType<Prisma.doctorsCreateManyHospitalsInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => doctorsCreateManyHospitalsInputSchema),
            z.lazy(() => doctorsCreateManyHospitalsInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const doctorsUpsertWithWhereUniqueWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUpsertWithWhereUniqueWithoutHospitalsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => doctorsUpdateWithoutHospitalsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutHospitalsInputSchema),
        ]),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutHospitalsInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutHospitalsInputSchema),
        ]),
    });

export const doctorsUpdateWithWhereUniqueWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUpdateWithWhereUniqueWithoutHospitalsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateWithoutHospitalsInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutHospitalsInputSchema),
        ]),
    });

export const doctorsUpdateManyWithWhereWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUpdateManyWithWhereWithoutHospitalsInput> =
    z.strictObject({
        where: z.lazy(() => doctorsScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => doctorsUpdateManyMutationInputSchema),
            z.lazy(() => doctorsUncheckedUpdateManyWithoutHospitalsInputSchema),
        ]),
    });

export const appointmentsCreateWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsCreateWithoutRegistersInput> =
    z.strictObject({
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
        doctors: z.lazy(
            () => doctorsCreateNestedOneWithoutAppointmentsInputSchema
        ),
    });

export const appointmentsUncheckedCreateWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUncheckedCreateWithoutRegistersInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_doctor: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsCreateOrConnectWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsCreateOrConnectWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
            z.lazy(
                () => appointmentsUncheckedCreateWithoutRegistersInputSchema
            ),
        ]),
    });

export const appointmentsCreateManyRegistersInputEnvelopeSchema: z.ZodType<Prisma.appointmentsCreateManyRegistersInputEnvelope> =
    z.strictObject({
        data: z.union([
            z.lazy(() => appointmentsCreateManyRegistersInputSchema),
            z.lazy(() => appointmentsCreateManyRegistersInputSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    });

export const doctorsCreateWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsCreateWithoutRegistersInput> =
    z.strictObject({
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(() => appointmentsCreateNestedManyWithoutDoctorsInputSchema)
            .optional(),
        fields: z.lazy(() => fieldsCreateNestedOneWithoutDoctorsInputSchema),
        hospitals: z.lazy(
            () => hospitalsCreateNestedOneWithoutDoctorsInputSchema
        ),
        expedients: z.lazy(
            () => expedientsCreateNestedOneWithoutDoctorsInputSchema
        ),
    });

export const doctorsUncheckedCreateWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUncheckedCreateWithoutRegistersInput> =
    z.strictObject({
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedCreateNestedManyWithoutDoctorsInputSchema
            )
            .optional(),
    });

export const doctorsCreateOrConnectWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsCreateOrConnectWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
        ]),
    });

export const appointmentsUpsertWithWhereUniqueWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUpsertWithWhereUniqueWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        update: z.union([
            z.lazy(() => appointmentsUpdateWithoutRegistersInputSchema),
            z.lazy(
                () => appointmentsUncheckedUpdateWithoutRegistersInputSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => appointmentsCreateWithoutRegistersInputSchema),
            z.lazy(
                () => appointmentsUncheckedCreateWithoutRegistersInputSchema
            ),
        ]),
    });

export const appointmentsUpdateWithWhereUniqueWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUpdateWithWhereUniqueWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsWhereUniqueInputSchema),
        data: z.union([
            z.lazy(() => appointmentsUpdateWithoutRegistersInputSchema),
            z.lazy(
                () => appointmentsUncheckedUpdateWithoutRegistersInputSchema
            ),
        ]),
    });

export const appointmentsUpdateManyWithWhereWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUpdateManyWithWhereWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => appointmentsScalarWhereInputSchema),
        data: z.union([
            z.lazy(() => appointmentsUpdateManyMutationInputSchema),
            z.lazy(
                () => appointmentsUncheckedUpdateManyWithoutRegistersInputSchema
            ),
        ]),
    });

export const doctorsUpsertWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUpsertWithoutRegistersInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => doctorsUpdateWithoutRegistersInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutRegistersInputSchema),
        ]),
        create: z.union([
            z.lazy(() => doctorsCreateWithoutRegistersInputSchema),
            z.lazy(() => doctorsUncheckedCreateWithoutRegistersInputSchema),
        ]),
        where: z.lazy(() => doctorsWhereInputSchema).optional(),
    });

export const doctorsUpdateToOneWithWhereWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUpdateToOneWithWhereWithoutRegistersInput> =
    z.strictObject({
        where: z.lazy(() => doctorsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => doctorsUpdateWithoutRegistersInputSchema),
            z.lazy(() => doctorsUncheckedUpdateWithoutRegistersInputSchema),
        ]),
    });

export const doctorsUpdateWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUpdateWithoutRegistersInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutDoctorsNestedInputSchema)
            .optional(),
        fields: z
            .lazy(() => fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema)
            .optional(),
        hospitals: z
            .lazy(
                () => hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        expedients: z
            .lazy(
                () => expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateWithoutRegistersInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateWithoutRegistersInput> =
    z.strictObject({
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const expedientsCreateWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsCreateWithoutWeekdaysInput> =
    z.strictObject({
        duration: z.coerce.date(),
        description: z.string(),
        doctors: z
            .lazy(() => doctorsCreateNestedManyWithoutExpedientsInputSchema)
            .optional(),
    });

export const expedientsUncheckedCreateWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsUncheckedCreateWithoutWeekdaysInput> =
    z.strictObject({
        id: z.number().int().optional(),
        duration: z.coerce.date(),
        description: z.string(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedCreateNestedManyWithoutExpedientsInputSchema
            )
            .optional(),
    });

export const expedientsCreateOrConnectWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsCreateOrConnectWithoutWeekdaysInput> =
    z.strictObject({
        where: z.lazy(() => expedientsWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => expedientsCreateWithoutWeekdaysInputSchema),
            z.lazy(() => expedientsUncheckedCreateWithoutWeekdaysInputSchema),
        ]),
    });

export const expedientsUpsertWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsUpsertWithoutWeekdaysInput> =
    z.strictObject({
        update: z.union([
            z.lazy(() => expedientsUpdateWithoutWeekdaysInputSchema),
            z.lazy(() => expedientsUncheckedUpdateWithoutWeekdaysInputSchema),
        ]),
        create: z.union([
            z.lazy(() => expedientsCreateWithoutWeekdaysInputSchema),
            z.lazy(() => expedientsUncheckedCreateWithoutWeekdaysInputSchema),
        ]),
        where: z.lazy(() => expedientsWhereInputSchema).optional(),
    });

export const expedientsUpdateToOneWithWhereWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsUpdateToOneWithWhereWithoutWeekdaysInput> =
    z.strictObject({
        where: z.lazy(() => expedientsWhereInputSchema).optional(),
        data: z.union([
            z.lazy(() => expedientsUpdateWithoutWeekdaysInputSchema),
            z.lazy(() => expedientsUncheckedUpdateWithoutWeekdaysInputSchema),
        ]),
    });

export const expedientsUpdateWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsUpdateWithoutWeekdaysInput> =
    z.strictObject({
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(() => doctorsUpdateManyWithoutExpedientsNestedInputSchema)
            .optional(),
    });

export const expedientsUncheckedUpdateWithoutWeekdaysInputSchema: z.ZodType<Prisma.expedientsUncheckedUpdateWithoutWeekdaysInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        duration: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        doctors: z
            .lazy(
                () =>
                    doctorsUncheckedUpdateManyWithoutExpedientsNestedInputSchema
            )
            .optional(),
    });

export const appointmentsCreateManyDoctorsInputSchema: z.ZodType<Prisma.appointmentsCreateManyDoctorsInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_patient: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUpdateWithoutDoctorsInput> =
    z.strictObject({
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        registers: z
            .lazy(
                () =>
                    registersUpdateOneRequiredWithoutAppointmentsNestedInputSchema
            )
            .optional(),
    });

export const appointmentsUncheckedUpdateWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateWithoutDoctorsInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_patient: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const appointmentsUncheckedUpdateManyWithoutDoctorsInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateManyWithoutDoctorsInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_patient: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const doctorsCreateManyExpedientsInputSchema: z.ZodType<Prisma.doctorsCreateManyExpedientsInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_hospital: z.number().int(),
        first_day: z.coerce.date().optional(),
    });

export const weekdaysCreateManyExpedientsInputSchema: z.ZodType<Prisma.weekdaysCreateManyExpedientsInput> =
    z.strictObject({
        weekday: z.string(),
        week: z.number().int().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        break: z.coerce.date().optional().nullable(),
        time_break: z.coerce.date().optional().nullable(),
    });

export const doctorsUpdateWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUpdateWithoutExpedientsInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutDoctorsNestedInputSchema)
            .optional(),
        registers: z
            .lazy(
                () => registersUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        fields: z
            .lazy(() => fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema)
            .optional(),
        hospitals: z
            .lazy(
                () => hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateWithoutExpedientsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutExpedientsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutExpedientsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const weekdaysUpdateWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUpdateWithoutExpedientsInput> =
    z.strictObject({
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const weekdaysUncheckedUpdateWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUncheckedUpdateWithoutExpedientsInput> =
    z.strictObject({
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const weekdaysUncheckedUpdateManyWithoutExpedientsInputSchema: z.ZodType<Prisma.weekdaysUncheckedUpdateManyWithoutExpedientsInput> =
    z.strictObject({
        weekday: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        week: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        time_break: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const doctorsCreateManyFieldsInputSchema: z.ZodType<Prisma.doctorsCreateManyFieldsInput> =
    z.strictObject({
        email: z.string(),
        id_hospital: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
    });

export const doctorsUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUpdateWithoutFieldsInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutDoctorsNestedInputSchema)
            .optional(),
        registers: z
            .lazy(
                () => registersUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        hospitals: z
            .lazy(
                () => hospitalsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        expedients: z
            .lazy(
                () => expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateWithoutFieldsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutFieldsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutFieldsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_hospital: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const doctorsCreateManyHospitalsInputSchema: z.ZodType<Prisma.doctorsCreateManyHospitalsInput> =
    z.strictObject({
        email: z.string(),
        id_field: z.number().int(),
        id_expedient: z.number().int(),
        first_day: z.coerce.date().optional(),
    });

export const doctorsUpdateWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUpdateWithoutHospitalsInput> =
    z.strictObject({
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(() => appointmentsUpdateManyWithoutDoctorsNestedInputSchema)
            .optional(),
        registers: z
            .lazy(
                () => registersUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
        fields: z
            .lazy(() => fieldsUpdateOneRequiredWithoutDoctorsNestedInputSchema)
            .optional(),
        expedients: z
            .lazy(
                () => expedientsUpdateOneRequiredWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateWithoutHospitalsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        appointments: z
            .lazy(
                () =>
                    appointmentsUncheckedUpdateManyWithoutDoctorsNestedInputSchema
            )
            .optional(),
    });

export const doctorsUncheckedUpdateManyWithoutHospitalsInputSchema: z.ZodType<Prisma.doctorsUncheckedUpdateManyWithoutHospitalsInput> =
    z.strictObject({
        email: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_field: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        id_expedient: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        first_day: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
    });

export const appointmentsCreateManyRegistersInputSchema: z.ZodType<Prisma.appointmentsCreateManyRegistersInput> =
    z.strictObject({
        id: z.number().int().optional(),
        email_doctor: z.string(),
        date: z.coerce.date(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        registered: z.coerce.date().optional().nullable(),
    });

export const appointmentsUpdateWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUpdateWithoutRegistersInput> =
    z.strictObject({
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        doctors: z
            .lazy(
                () =>
                    doctorsUpdateOneRequiredWithoutAppointmentsNestedInputSchema
            )
            .optional(),
    });

export const appointmentsUncheckedUpdateWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateWithoutRegistersInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_doctor: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

export const appointmentsUncheckedUpdateManyWithoutRegistersInputSchema: z.ZodType<Prisma.appointmentsUncheckedUpdateManyWithoutRegistersInput> =
    z.strictObject({
        id: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        email_doctor: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        date: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        start: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        end: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        registered: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
    });

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const appointmentsFindFirstArgsSchema: z.ZodType<Prisma.appointmentsFindFirstArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    appointmentsOrderByWithRelationInputSchema.array(),
                    appointmentsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: appointmentsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    AppointmentsScalarFieldEnumSchema,
                    AppointmentsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const appointmentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.appointmentsFindFirstOrThrowArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    appointmentsOrderByWithRelationInputSchema.array(),
                    appointmentsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: appointmentsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    AppointmentsScalarFieldEnumSchema,
                    AppointmentsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const appointmentsFindManyArgsSchema: z.ZodType<Prisma.appointmentsFindManyArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    appointmentsOrderByWithRelationInputSchema.array(),
                    appointmentsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: appointmentsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    AppointmentsScalarFieldEnumSchema,
                    AppointmentsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const appointmentsAggregateArgsSchema: z.ZodType<Prisma.appointmentsAggregateArgs> =
    z
        .object({
            where: appointmentsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    appointmentsOrderByWithRelationInputSchema.array(),
                    appointmentsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: appointmentsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const appointmentsGroupByArgsSchema: z.ZodType<Prisma.appointmentsGroupByArgs> =
    z
        .object({
            where: appointmentsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    appointmentsOrderByWithAggregationInputSchema.array(),
                    appointmentsOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: AppointmentsScalarFieldEnumSchema.array(),
            having: appointmentsScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const appointmentsFindUniqueArgsSchema: z.ZodType<Prisma.appointmentsFindUniqueArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereUniqueInputSchema,
        })
        .strict();

export const appointmentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.appointmentsFindUniqueOrThrowArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereUniqueInputSchema,
        })
        .strict();

export const doctorsFindFirstArgsSchema: z.ZodType<Prisma.doctorsFindFirstArgs> =
    z
        .object({
            select: doctorsSelectSchema.optional(),
            include: doctorsIncludeSchema.optional(),
            where: doctorsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    doctorsOrderByWithRelationInputSchema.array(),
                    doctorsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: doctorsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    DoctorsScalarFieldEnumSchema,
                    DoctorsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const doctorsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.doctorsFindFirstOrThrowArgs> =
    z
        .object({
            select: doctorsSelectSchema.optional(),
            include: doctorsIncludeSchema.optional(),
            where: doctorsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    doctorsOrderByWithRelationInputSchema.array(),
                    doctorsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: doctorsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    DoctorsScalarFieldEnumSchema,
                    DoctorsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const doctorsFindManyArgsSchema: z.ZodType<Prisma.doctorsFindManyArgs> =
    z
        .object({
            select: doctorsSelectSchema.optional(),
            include: doctorsIncludeSchema.optional(),
            where: doctorsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    doctorsOrderByWithRelationInputSchema.array(),
                    doctorsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: doctorsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    DoctorsScalarFieldEnumSchema,
                    DoctorsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const doctorsAggregateArgsSchema: z.ZodType<Prisma.doctorsAggregateArgs> =
    z
        .object({
            where: doctorsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    doctorsOrderByWithRelationInputSchema.array(),
                    doctorsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: doctorsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const doctorsGroupByArgsSchema: z.ZodType<Prisma.doctorsGroupByArgs> = z
    .object({
        where: doctorsWhereInputSchema.optional(),
        orderBy: z
            .union([
                doctorsOrderByWithAggregationInputSchema.array(),
                doctorsOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: DoctorsScalarFieldEnumSchema.array(),
        having: doctorsScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const doctorsFindUniqueArgsSchema: z.ZodType<Prisma.doctorsFindUniqueArgs> =
    z
        .object({
            select: doctorsSelectSchema.optional(),
            include: doctorsIncludeSchema.optional(),
            where: doctorsWhereUniqueInputSchema,
        })
        .strict();

export const doctorsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.doctorsFindUniqueOrThrowArgs> =
    z
        .object({
            select: doctorsSelectSchema.optional(),
            include: doctorsIncludeSchema.optional(),
            where: doctorsWhereUniqueInputSchema,
        })
        .strict();

export const expedientsFindFirstArgsSchema: z.ZodType<Prisma.expedientsFindFirstArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    expedientsOrderByWithRelationInputSchema.array(),
                    expedientsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: expedientsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ExpedientsScalarFieldEnumSchema,
                    ExpedientsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const expedientsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.expedientsFindFirstOrThrowArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    expedientsOrderByWithRelationInputSchema.array(),
                    expedientsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: expedientsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ExpedientsScalarFieldEnumSchema,
                    ExpedientsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const expedientsFindManyArgsSchema: z.ZodType<Prisma.expedientsFindManyArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    expedientsOrderByWithRelationInputSchema.array(),
                    expedientsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: expedientsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ExpedientsScalarFieldEnumSchema,
                    ExpedientsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const expedientsAggregateArgsSchema: z.ZodType<Prisma.expedientsAggregateArgs> =
    z
        .object({
            where: expedientsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    expedientsOrderByWithRelationInputSchema.array(),
                    expedientsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: expedientsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const expedientsGroupByArgsSchema: z.ZodType<Prisma.expedientsGroupByArgs> =
    z
        .object({
            where: expedientsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    expedientsOrderByWithAggregationInputSchema.array(),
                    expedientsOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: ExpedientsScalarFieldEnumSchema.array(),
            having: expedientsScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const expedientsFindUniqueArgsSchema: z.ZodType<Prisma.expedientsFindUniqueArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereUniqueInputSchema,
        })
        .strict();

export const expedientsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.expedientsFindUniqueOrThrowArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereUniqueInputSchema,
        })
        .strict();

export const fieldsFindFirstArgsSchema: z.ZodType<Prisma.fieldsFindFirstArgs> =
    z
        .object({
            select: fieldsSelectSchema.optional(),
            include: fieldsIncludeSchema.optional(),
            where: fieldsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    fieldsOrderByWithRelationInputSchema.array(),
                    fieldsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: fieldsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    FieldsScalarFieldEnumSchema,
                    FieldsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const fieldsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.fieldsFindFirstOrThrowArgs> =
    z
        .object({
            select: fieldsSelectSchema.optional(),
            include: fieldsIncludeSchema.optional(),
            where: fieldsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    fieldsOrderByWithRelationInputSchema.array(),
                    fieldsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: fieldsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    FieldsScalarFieldEnumSchema,
                    FieldsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const fieldsFindManyArgsSchema: z.ZodType<Prisma.fieldsFindManyArgs> = z
    .object({
        select: fieldsSelectSchema.optional(),
        include: fieldsIncludeSchema.optional(),
        where: fieldsWhereInputSchema.optional(),
        orderBy: z
            .union([
                fieldsOrderByWithRelationInputSchema.array(),
                fieldsOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: fieldsWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                FieldsScalarFieldEnumSchema,
                FieldsScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict();

export const fieldsAggregateArgsSchema: z.ZodType<Prisma.fieldsAggregateArgs> =
    z
        .object({
            where: fieldsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    fieldsOrderByWithRelationInputSchema.array(),
                    fieldsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: fieldsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const fieldsGroupByArgsSchema: z.ZodType<Prisma.fieldsGroupByArgs> = z
    .object({
        where: fieldsWhereInputSchema.optional(),
        orderBy: z
            .union([
                fieldsOrderByWithAggregationInputSchema.array(),
                fieldsOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: FieldsScalarFieldEnumSchema.array(),
        having: fieldsScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const fieldsFindUniqueArgsSchema: z.ZodType<Prisma.fieldsFindUniqueArgs> =
    z
        .object({
            select: fieldsSelectSchema.optional(),
            include: fieldsIncludeSchema.optional(),
            where: fieldsWhereUniqueInputSchema,
        })
        .strict();

export const fieldsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.fieldsFindUniqueOrThrowArgs> =
    z
        .object({
            select: fieldsSelectSchema.optional(),
            include: fieldsIncludeSchema.optional(),
            where: fieldsWhereUniqueInputSchema,
        })
        .strict();

export const hospitalsFindFirstArgsSchema: z.ZodType<Prisma.hospitalsFindFirstArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    hospitalsOrderByWithRelationInputSchema.array(),
                    hospitalsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: hospitalsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    HospitalsScalarFieldEnumSchema,
                    HospitalsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const hospitalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.hospitalsFindFirstOrThrowArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    hospitalsOrderByWithRelationInputSchema.array(),
                    hospitalsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: hospitalsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    HospitalsScalarFieldEnumSchema,
                    HospitalsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const hospitalsFindManyArgsSchema: z.ZodType<Prisma.hospitalsFindManyArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    hospitalsOrderByWithRelationInputSchema.array(),
                    hospitalsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: hospitalsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    HospitalsScalarFieldEnumSchema,
                    HospitalsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const hospitalsAggregateArgsSchema: z.ZodType<Prisma.hospitalsAggregateArgs> =
    z
        .object({
            where: hospitalsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    hospitalsOrderByWithRelationInputSchema.array(),
                    hospitalsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: hospitalsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const hospitalsGroupByArgsSchema: z.ZodType<Prisma.hospitalsGroupByArgs> =
    z
        .object({
            where: hospitalsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    hospitalsOrderByWithAggregationInputSchema.array(),
                    hospitalsOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: HospitalsScalarFieldEnumSchema.array(),
            having: hospitalsScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const hospitalsFindUniqueArgsSchema: z.ZodType<Prisma.hospitalsFindUniqueArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereUniqueInputSchema,
        })
        .strict();

export const hospitalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.hospitalsFindUniqueOrThrowArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereUniqueInputSchema,
        })
        .strict();

export const registersFindFirstArgsSchema: z.ZodType<Prisma.registersFindFirstArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    registersOrderByWithRelationInputSchema.array(),
                    registersOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: registersWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    RegistersScalarFieldEnumSchema,
                    RegistersScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const registersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.registersFindFirstOrThrowArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    registersOrderByWithRelationInputSchema.array(),
                    registersOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: registersWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    RegistersScalarFieldEnumSchema,
                    RegistersScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const registersFindManyArgsSchema: z.ZodType<Prisma.registersFindManyArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    registersOrderByWithRelationInputSchema.array(),
                    registersOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: registersWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    RegistersScalarFieldEnumSchema,
                    RegistersScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const registersAggregateArgsSchema: z.ZodType<Prisma.registersAggregateArgs> =
    z
        .object({
            where: registersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    registersOrderByWithRelationInputSchema.array(),
                    registersOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: registersWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const registersGroupByArgsSchema: z.ZodType<Prisma.registersGroupByArgs> =
    z
        .object({
            where: registersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    registersOrderByWithAggregationInputSchema.array(),
                    registersOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: RegistersScalarFieldEnumSchema.array(),
            having: registersScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const registersFindUniqueArgsSchema: z.ZodType<Prisma.registersFindUniqueArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereUniqueInputSchema,
        })
        .strict();

export const registersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.registersFindUniqueOrThrowArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereUniqueInputSchema,
        })
        .strict();

export const weekdaysFindFirstArgsSchema: z.ZodType<Prisma.weekdaysFindFirstArgs> =
    z
        .object({
            select: weekdaysSelectSchema.optional(),
            include: weekdaysIncludeSchema.optional(),
            where: weekdaysWhereInputSchema.optional(),
            orderBy: z
                .union([
                    weekdaysOrderByWithRelationInputSchema.array(),
                    weekdaysOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: weekdaysWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    WeekdaysScalarFieldEnumSchema,
                    WeekdaysScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const weekdaysFindFirstOrThrowArgsSchema: z.ZodType<Prisma.weekdaysFindFirstOrThrowArgs> =
    z
        .object({
            select: weekdaysSelectSchema.optional(),
            include: weekdaysIncludeSchema.optional(),
            where: weekdaysWhereInputSchema.optional(),
            orderBy: z
                .union([
                    weekdaysOrderByWithRelationInputSchema.array(),
                    weekdaysOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: weekdaysWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    WeekdaysScalarFieldEnumSchema,
                    WeekdaysScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const weekdaysFindManyArgsSchema: z.ZodType<Prisma.weekdaysFindManyArgs> =
    z
        .object({
            select: weekdaysSelectSchema.optional(),
            include: weekdaysIncludeSchema.optional(),
            where: weekdaysWhereInputSchema.optional(),
            orderBy: z
                .union([
                    weekdaysOrderByWithRelationInputSchema.array(),
                    weekdaysOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: weekdaysWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    WeekdaysScalarFieldEnumSchema,
                    WeekdaysScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const weekdaysAggregateArgsSchema: z.ZodType<Prisma.weekdaysAggregateArgs> =
    z
        .object({
            where: weekdaysWhereInputSchema.optional(),
            orderBy: z
                .union([
                    weekdaysOrderByWithRelationInputSchema.array(),
                    weekdaysOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: weekdaysWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const weekdaysGroupByArgsSchema: z.ZodType<Prisma.weekdaysGroupByArgs> =
    z
        .object({
            where: weekdaysWhereInputSchema.optional(),
            orderBy: z
                .union([
                    weekdaysOrderByWithAggregationInputSchema.array(),
                    weekdaysOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: WeekdaysScalarFieldEnumSchema.array(),
            having: weekdaysScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const weekdaysFindUniqueArgsSchema: z.ZodType<Prisma.weekdaysFindUniqueArgs> =
    z
        .object({
            select: weekdaysSelectSchema.optional(),
            include: weekdaysIncludeSchema.optional(),
            where: weekdaysWhereUniqueInputSchema,
        })
        .strict();

export const weekdaysFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.weekdaysFindUniqueOrThrowArgs> =
    z
        .object({
            select: weekdaysSelectSchema.optional(),
            include: weekdaysIncludeSchema.optional(),
            where: weekdaysWhereUniqueInputSchema,
        })
        .strict();

export const appointmentsCreateArgsSchema: z.ZodType<Prisma.appointmentsCreateArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            data: z.union([
                appointmentsCreateInputSchema,
                appointmentsUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const appointmentsUpsertArgsSchema: z.ZodType<Prisma.appointmentsUpsertArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereUniqueInputSchema,
            create: z.union([
                appointmentsCreateInputSchema,
                appointmentsUncheckedCreateInputSchema,
            ]),
            update: z.union([
                appointmentsUpdateInputSchema,
                appointmentsUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const appointmentsCreateManyArgsSchema: z.ZodType<Prisma.appointmentsCreateManyArgs> =
    z
        .object({
            data: z.union([
                appointmentsCreateManyInputSchema,
                appointmentsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const appointmentsDeleteArgsSchema: z.ZodType<Prisma.appointmentsDeleteArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            where: appointmentsWhereUniqueInputSchema,
        })
        .strict();

export const appointmentsUpdateArgsSchema: z.ZodType<Prisma.appointmentsUpdateArgs> =
    z
        .object({
            select: appointmentsSelectSchema.optional(),
            include: appointmentsIncludeSchema.optional(),
            data: z.union([
                appointmentsUpdateInputSchema,
                appointmentsUncheckedUpdateInputSchema,
            ]),
            where: appointmentsWhereUniqueInputSchema,
        })
        .strict();

export const appointmentsUpdateManyArgsSchema: z.ZodType<Prisma.appointmentsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                appointmentsUpdateManyMutationInputSchema,
                appointmentsUncheckedUpdateManyInputSchema,
            ]),
            where: appointmentsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const appointmentsDeleteManyArgsSchema: z.ZodType<Prisma.appointmentsDeleteManyArgs> =
    z
        .object({
            where: appointmentsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const doctorsCreateArgsSchema: z.ZodType<Prisma.doctorsCreateArgs> = z
    .object({
        select: doctorsSelectSchema.optional(),
        include: doctorsIncludeSchema.optional(),
        data: z.union([
            doctorsCreateInputSchema,
            doctorsUncheckedCreateInputSchema,
        ]),
    })
    .strict();

export const doctorsUpsertArgsSchema: z.ZodType<Prisma.doctorsUpsertArgs> = z
    .object({
        select: doctorsSelectSchema.optional(),
        include: doctorsIncludeSchema.optional(),
        where: doctorsWhereUniqueInputSchema,
        create: z.union([
            doctorsCreateInputSchema,
            doctorsUncheckedCreateInputSchema,
        ]),
        update: z.union([
            doctorsUpdateInputSchema,
            doctorsUncheckedUpdateInputSchema,
        ]),
    })
    .strict();

export const doctorsCreateManyArgsSchema: z.ZodType<Prisma.doctorsCreateManyArgs> =
    z
        .object({
            data: z.union([
                doctorsCreateManyInputSchema,
                doctorsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const doctorsDeleteArgsSchema: z.ZodType<Prisma.doctorsDeleteArgs> = z
    .object({
        select: doctorsSelectSchema.optional(),
        include: doctorsIncludeSchema.optional(),
        where: doctorsWhereUniqueInputSchema,
    })
    .strict();

export const doctorsUpdateArgsSchema: z.ZodType<Prisma.doctorsUpdateArgs> = z
    .object({
        select: doctorsSelectSchema.optional(),
        include: doctorsIncludeSchema.optional(),
        data: z.union([
            doctorsUpdateInputSchema,
            doctorsUncheckedUpdateInputSchema,
        ]),
        where: doctorsWhereUniqueInputSchema,
    })
    .strict();

export const doctorsUpdateManyArgsSchema: z.ZodType<Prisma.doctorsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                doctorsUpdateManyMutationInputSchema,
                doctorsUncheckedUpdateManyInputSchema,
            ]),
            where: doctorsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const doctorsDeleteManyArgsSchema: z.ZodType<Prisma.doctorsDeleteManyArgs> =
    z
        .object({
            where: doctorsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const expedientsCreateArgsSchema: z.ZodType<Prisma.expedientsCreateArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            data: z.union([
                expedientsCreateInputSchema,
                expedientsUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const expedientsUpsertArgsSchema: z.ZodType<Prisma.expedientsUpsertArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereUniqueInputSchema,
            create: z.union([
                expedientsCreateInputSchema,
                expedientsUncheckedCreateInputSchema,
            ]),
            update: z.union([
                expedientsUpdateInputSchema,
                expedientsUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const expedientsCreateManyArgsSchema: z.ZodType<Prisma.expedientsCreateManyArgs> =
    z
        .object({
            data: z.union([
                expedientsCreateManyInputSchema,
                expedientsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const expedientsDeleteArgsSchema: z.ZodType<Prisma.expedientsDeleteArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            where: expedientsWhereUniqueInputSchema,
        })
        .strict();

export const expedientsUpdateArgsSchema: z.ZodType<Prisma.expedientsUpdateArgs> =
    z
        .object({
            select: expedientsSelectSchema.optional(),
            include: expedientsIncludeSchema.optional(),
            data: z.union([
                expedientsUpdateInputSchema,
                expedientsUncheckedUpdateInputSchema,
            ]),
            where: expedientsWhereUniqueInputSchema,
        })
        .strict();

export const expedientsUpdateManyArgsSchema: z.ZodType<Prisma.expedientsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                expedientsUpdateManyMutationInputSchema,
                expedientsUncheckedUpdateManyInputSchema,
            ]),
            where: expedientsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const expedientsDeleteManyArgsSchema: z.ZodType<Prisma.expedientsDeleteManyArgs> =
    z
        .object({
            where: expedientsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const fieldsCreateArgsSchema: z.ZodType<Prisma.fieldsCreateArgs> = z
    .object({
        select: fieldsSelectSchema.optional(),
        include: fieldsIncludeSchema.optional(),
        data: z.union([
            fieldsCreateInputSchema,
            fieldsUncheckedCreateInputSchema,
        ]),
    })
    .strict();

export const fieldsUpsertArgsSchema: z.ZodType<Prisma.fieldsUpsertArgs> = z
    .object({
        select: fieldsSelectSchema.optional(),
        include: fieldsIncludeSchema.optional(),
        where: fieldsWhereUniqueInputSchema,
        create: z.union([
            fieldsCreateInputSchema,
            fieldsUncheckedCreateInputSchema,
        ]),
        update: z.union([
            fieldsUpdateInputSchema,
            fieldsUncheckedUpdateInputSchema,
        ]),
    })
    .strict();

export const fieldsCreateManyArgsSchema: z.ZodType<Prisma.fieldsCreateManyArgs> =
    z
        .object({
            data: z.union([
                fieldsCreateManyInputSchema,
                fieldsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const fieldsDeleteArgsSchema: z.ZodType<Prisma.fieldsDeleteArgs> = z
    .object({
        select: fieldsSelectSchema.optional(),
        include: fieldsIncludeSchema.optional(),
        where: fieldsWhereUniqueInputSchema,
    })
    .strict();

export const fieldsUpdateArgsSchema: z.ZodType<Prisma.fieldsUpdateArgs> = z
    .object({
        select: fieldsSelectSchema.optional(),
        include: fieldsIncludeSchema.optional(),
        data: z.union([
            fieldsUpdateInputSchema,
            fieldsUncheckedUpdateInputSchema,
        ]),
        where: fieldsWhereUniqueInputSchema,
    })
    .strict();

export const fieldsUpdateManyArgsSchema: z.ZodType<Prisma.fieldsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                fieldsUpdateManyMutationInputSchema,
                fieldsUncheckedUpdateManyInputSchema,
            ]),
            where: fieldsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const fieldsDeleteManyArgsSchema: z.ZodType<Prisma.fieldsDeleteManyArgs> =
    z
        .object({
            where: fieldsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const hospitalsCreateArgsSchema: z.ZodType<Prisma.hospitalsCreateArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            data: z.union([
                hospitalsCreateInputSchema,
                hospitalsUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const hospitalsUpsertArgsSchema: z.ZodType<Prisma.hospitalsUpsertArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereUniqueInputSchema,
            create: z.union([
                hospitalsCreateInputSchema,
                hospitalsUncheckedCreateInputSchema,
            ]),
            update: z.union([
                hospitalsUpdateInputSchema,
                hospitalsUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const hospitalsCreateManyArgsSchema: z.ZodType<Prisma.hospitalsCreateManyArgs> =
    z
        .object({
            data: z.union([
                hospitalsCreateManyInputSchema,
                hospitalsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const hospitalsDeleteArgsSchema: z.ZodType<Prisma.hospitalsDeleteArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            where: hospitalsWhereUniqueInputSchema,
        })
        .strict();

export const hospitalsUpdateArgsSchema: z.ZodType<Prisma.hospitalsUpdateArgs> =
    z
        .object({
            select: hospitalsSelectSchema.optional(),
            include: hospitalsIncludeSchema.optional(),
            data: z.union([
                hospitalsUpdateInputSchema,
                hospitalsUncheckedUpdateInputSchema,
            ]),
            where: hospitalsWhereUniqueInputSchema,
        })
        .strict();

export const hospitalsUpdateManyArgsSchema: z.ZodType<Prisma.hospitalsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                hospitalsUpdateManyMutationInputSchema,
                hospitalsUncheckedUpdateManyInputSchema,
            ]),
            where: hospitalsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const hospitalsDeleteManyArgsSchema: z.ZodType<Prisma.hospitalsDeleteManyArgs> =
    z
        .object({
            where: hospitalsWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const registersCreateArgsSchema: z.ZodType<Prisma.registersCreateArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            data: z.union([
                registersCreateInputSchema,
                registersUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const registersUpsertArgsSchema: z.ZodType<Prisma.registersUpsertArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereUniqueInputSchema,
            create: z.union([
                registersCreateInputSchema,
                registersUncheckedCreateInputSchema,
            ]),
            update: z.union([
                registersUpdateInputSchema,
                registersUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const registersCreateManyArgsSchema: z.ZodType<Prisma.registersCreateManyArgs> =
    z
        .object({
            data: z.union([
                registersCreateManyInputSchema,
                registersCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const registersDeleteArgsSchema: z.ZodType<Prisma.registersDeleteArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            where: registersWhereUniqueInputSchema,
        })
        .strict();

export const registersUpdateArgsSchema: z.ZodType<Prisma.registersUpdateArgs> =
    z
        .object({
            select: registersSelectSchema.optional(),
            include: registersIncludeSchema.optional(),
            data: z.union([
                registersUpdateInputSchema,
                registersUncheckedUpdateInputSchema,
            ]),
            where: registersWhereUniqueInputSchema,
        })
        .strict();

export const registersUpdateManyArgsSchema: z.ZodType<Prisma.registersUpdateManyArgs> =
    z
        .object({
            data: z.union([
                registersUpdateManyMutationInputSchema,
                registersUncheckedUpdateManyInputSchema,
            ]),
            where: registersWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const registersDeleteManyArgsSchema: z.ZodType<Prisma.registersDeleteManyArgs> =
    z
        .object({
            where: registersWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const weekdaysCreateArgsSchema: z.ZodType<Prisma.weekdaysCreateArgs> = z
    .object({
        select: weekdaysSelectSchema.optional(),
        include: weekdaysIncludeSchema.optional(),
        data: z.union([
            weekdaysCreateInputSchema,
            weekdaysUncheckedCreateInputSchema,
        ]),
    })
    .strict();

export const weekdaysUpsertArgsSchema: z.ZodType<Prisma.weekdaysUpsertArgs> = z
    .object({
        select: weekdaysSelectSchema.optional(),
        include: weekdaysIncludeSchema.optional(),
        where: weekdaysWhereUniqueInputSchema,
        create: z.union([
            weekdaysCreateInputSchema,
            weekdaysUncheckedCreateInputSchema,
        ]),
        update: z.union([
            weekdaysUpdateInputSchema,
            weekdaysUncheckedUpdateInputSchema,
        ]),
    })
    .strict();

export const weekdaysCreateManyArgsSchema: z.ZodType<Prisma.weekdaysCreateManyArgs> =
    z
        .object({
            data: z.union([
                weekdaysCreateManyInputSchema,
                weekdaysCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const weekdaysDeleteArgsSchema: z.ZodType<Prisma.weekdaysDeleteArgs> = z
    .object({
        select: weekdaysSelectSchema.optional(),
        include: weekdaysIncludeSchema.optional(),
        where: weekdaysWhereUniqueInputSchema,
    })
    .strict();

export const weekdaysUpdateArgsSchema: z.ZodType<Prisma.weekdaysUpdateArgs> = z
    .object({
        select: weekdaysSelectSchema.optional(),
        include: weekdaysIncludeSchema.optional(),
        data: z.union([
            weekdaysUpdateInputSchema,
            weekdaysUncheckedUpdateInputSchema,
        ]),
        where: weekdaysWhereUniqueInputSchema,
    })
    .strict();

export const weekdaysUpdateManyArgsSchema: z.ZodType<Prisma.weekdaysUpdateManyArgs> =
    z
        .object({
            data: z.union([
                weekdaysUpdateManyMutationInputSchema,
                weekdaysUncheckedUpdateManyInputSchema,
            ]),
            where: weekdaysWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();

export const weekdaysDeleteManyArgsSchema: z.ZodType<Prisma.weekdaysDeleteManyArgs> =
    z
        .object({
            where: weekdaysWhereInputSchema.optional(),
            limit: z.number().optional(),
        })
        .strict();
