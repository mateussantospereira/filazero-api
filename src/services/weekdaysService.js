import prisma from "../utils/prisma.js";

class weekdaysService {
    async create(data) {
        return await prisma.weekdays.create({ data });
    }

    async findMany() {
        return await prisma.weekdays.findMany();
    }

    async findUnique(id_expedient) {
        return await prisma.weekdays.findUnique({ where: { id_expedient } });
    }

    async update(id_expedient, data) {
        return await prisma.weekdays.update({ where: { id_expedient }, data });
    }

    async delete(id_expedient) {
        return await prisma.weekdays.delete({ where: { id_expedient } });
    }
}

export default new weekdaysService();
