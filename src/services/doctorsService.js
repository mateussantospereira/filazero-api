import prisma from "../utils/prisma.js";

class doctorsService {
    async create(data) {
        return await prisma.doctors.create({ data });
    }

    async findMany() {
        return await prisma.doctors.findMany();
    }

    async findUnique(email) {
        return await prisma.doctors.findUnique({ where: { email } });
    }

    async update(email, data) {
        return await prisma.doctors.update({ where: { email }, data });
    }

    async delete(email) {
        return await prisma.doctors.delete({ where: { email } });
    }
}

export default new doctorsService();
