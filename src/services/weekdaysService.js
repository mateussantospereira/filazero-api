import prisma from "../utils/prisma.js";

class weekdaysService {
    async create(data) {
        return await prisma.weekdays.create({ data });
    }

    async findMany() {
        return await prisma.weekdays.findMany();
    }

    async findUnique(email) {
        return await prisma.weekdays.findUnique({ where: { email } });
    }

    async update(email, data) {
        return await prisma.weekdays.update({ where: { email }, data });
    }

    async delete(email) {
        return await prisma.weekdays.delete({ where: { email } });
    }
}

export default new weekdaysService();
