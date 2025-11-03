import prisma from "../utils/prisma.js";

class appointmentsService {
    async create(data) {
        return await prisma.appointments.create({ data });
    }

    async findMany() {
        return await prisma.appointments.findMany();
    }

    async findUnique(id) {
        return await prisma.appointments.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.appointments.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.appointments.delete({ where: { id } });
    }
}

export default new appointmentsService();
