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

        const available = availability(doctor);

        const appointments = await prisma.appointments.findMany({
            where: { email_doctor: email },
        });

        if (appointments.length == 0) {
            return available;
        }

        const dates = [];

        appointments.forEach((a) => {
            dates.push(new Date(a.date).getTime());
        });

        for (let day in available) {
            for (let time in available[day]) {
                if (dates.includes(new Date(available[day][time]).getTime())) {
                    available[day].splice(time, 1);
                }
            }
        }

        return available;
    }

    async update(email, data) {
        return await prisma.doctors.update({ where: { email }, data });
    }

    async delete(email) {
        return await prisma.doctors.delete({ where: { email } });
    }
}

export default new doctorsService();
