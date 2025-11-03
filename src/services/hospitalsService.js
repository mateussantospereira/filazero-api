import prisma from "../utils/prisma.js";

class hospitalsService {
    async create(data) {
        return await prisma.hospitals.create({ data });
    }

    async findMany() {
        return await prisma.hospitals.findMany();
    }

    async findUnique(id) {
        return await prisma.hospitals.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.hospitals.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.hospitals.delete({ where: { id } });
    }
}

export default new hospitalsService();
