import prisma from "../utils/prisma.js";

class expedientsService {
    async create(data) {
        return await prisma.expedients.create({ data });
    }

    async findMany() {
        return await prisma.expedients.findMany();
    }

    async findUnique(id) {
        return await prisma.expedients.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.expedients.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.expedients.delete({ where: { id } });
    }
}

export default new expedientsService();
