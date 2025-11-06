import prisma from "../utils/prisma.js";

class weekdaysService {
    async createMany(data) {
        return await prisma.weekdays.createMany({ data });
    }

    async findMany() {
        return await prisma.weekdays.findMany();
    }

    async findManyByExpedient(id_expedient) {
        return await prisma.weekdays.findMany({ where: { id_expedient } });
    }

    async findUnique({ id_expedient, weekday, week }, data) {
        return await prisma.weekdays.findUnique({
            where: {
                id_expedient_weekday_week: {
                    id_expedient,
                    weekday,
                    week,
                },
            },
        });
    }

    async update({ id_expedient, weekday, week }, data) {
        return await prisma.weekdays.update({
            where: {
                id_expedient_weekday_week: {
                    id_expedient,
                    weekday,
                    week,
                },
            },
            data,
        });
    }

    async deleteByExpedient(id_expedient) {
        return await prisma.weekdays.deleteMany({
            where: {
                id_expedient,
            },
        });
    }

    async delete({ id_expedient, weekday, week }) {
        return await prisma.weekdays.delete({
            where: {
                id_expedient_weekday_week: {
                    id_expedient,
                    weekday,
                    week,
                },
            },
        });
    }
}

export default new weekdaysService();
