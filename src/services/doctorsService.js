import prisma from "../utils/prisma.js";
import availability from "../supports/doctorsSupports/availability.js";

class doctorsService {
    async create(data) {
        return await prisma.doctors.create({ data });
    }

    async findMany() {
        return await prisma.doctors.findMany({
            include: {
                hospitals: true,
                fields: true,
                expedients: true,
            },
        });
    }

    async findUnique(email) {
        return await prisma.doctors.findUnique({
            where: { email },
            include: {
                hospitals: true,
                fields: true,
                expedients: true,
            },
        });
    }

    async availability(email) {
        const doctor = await prisma.doctors.findUnique({
            where: { email },
            include: {
                hospitals: true,
                fields: true,
                expedients: {
                    include: {
                        weekdays: true,
                    },
                },
            },
        });

        if (!doctor) return doctor;

        if (!doctor.expedients.weekdays[0]) {
            return [];
        }

        return availability(doctor);
    }

    async update(email, data) {
        return await prisma.doctors.update({ where: { email }, data });
    }

    async delete(email) {
        return await prisma.doctors.delete({ where: { email } });
    }
}

export default new doctorsService();
