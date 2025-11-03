import prisma from "../utils/prisma.js";

class fieldsService {
    async create(data) {
        return await prisma.fields.create({ data });
    }

    async findMany() {
        return await prisma.fields.findMany();
    }

    async findUnique(id) {
        return await prisma.fields.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.fields.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.fields.delete({ where: { id } });
    }
}

export default new fieldsService();
