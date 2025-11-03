import prisma from "../utils/prisma.js";

class registersService {
    async create(data) {
        return await prisma.registers.create({ data });
    }

    async findMany() {
        return await prisma.registers.findMany();
    }

    async findUnique(email) {
        return await prisma.registers.findUnique({ where: { email } });
    }

    async update(email, data) {
        return await prisma.registers.update({ where: { email }, data });
    }

    async delete(email) {
        return await prisma.registers.delete({ where: { email } });
    }
}

export default new registersService();
