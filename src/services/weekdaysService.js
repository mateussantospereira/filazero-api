import prisma from "../utils/prisma.js";

class weekdaysService {
    async create(data) {
        return await prisma.weekdays.create({ data });
    }

    async findMany() {
        return await prisma.weekdays.findMany();
    }

    async findManyByExpedient(id_expedient) {
        return await prisma.weekdays.findMany({ where: { id_expedient } });
    }

    async delete(id_expedient) {
        return await prisma.weekdays.delete({ where: { id_expedient } });
    }
}

export default new weekdaysService();
