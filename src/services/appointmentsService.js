import prisma from "../utils/prisma.js";

class appointmentsService {
    async create(data) {
        return await prisma.appointments.create({ data });
    }

    async findMany() {
        return await prisma.appointments.findMany({
            include: {
                doctors: {
                    hospitals: true,
                    fields: true,
                    expedients: true,
                },
                registers: {
                    omit: {
                        password: true,
                    },
                },
            },
        });
    }

    async findUnique(id) {
        return await prisma.appointments.findUnique({
            where: { id },
            include: {
                doctors: {
                    hospitals: true,
                    fields: true,
                    expedients: true,
                },
                registers: {
                    omit: {
                        password: true,
                    },
                },
            },
        });
    }

    async findByDoctor(email_doctor) {
        return await prisma.appointments.findMany({
            where: { email_doctor },
            include: {
                doctors: {
                    hospitals: true,
                    fields: true,
                    expedients: true,
                },
                registers: {
                    omit: {
                        password: true,
                    },
                },
            },
        });
    }

    async update(id, data) {
        return await prisma.appointments.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.appointments.delete({ where: { id } });
    }
}

export default new appointmentsService();
