import appointmentsService from "../services/appointmentsService.js";
import doctorsServices from "../services/doctorsService.js";
import localDate from "../supports/doctorsSupports/localDate.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class appointmentsController {
    async create(req, res) {
        try {
            const data = req.body;
            const date = new Date(data.date);
            const available = await doctorsServices.availability(
                data.email_doctor
            );
            if (!available) return response(res, 400, "Médico não encontrado.");
            if (available == [])
                return response(res, 400, "Erro ao buscar horários.");
            let findedDate = false;
            for (const day of available) {
                for (const time of day) {
                    if (new Date(time).getTime() == date.getTime()) {
                        findedDate = true;
                        break;
                    }
                }
                if (findedDate) break;
            }
            if (!findedDate)
                return response(res, 400, "Horário não disponível.");
            await appointmentsService.create(data);
            return response(res, 201, "Agenda criada com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const appointments = await appointmentsService.findMany();
            return response(res, 200, "Agendas listadas.", appointments);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id } = req.params;
            const appointment = await appointmentsService.findUnique(
                Number(id)
            );
            if (!appointment)
                return response(res, 400, "Agenda não encontrada.");
            return response(res, 200, "Agenda encontrada.", appointment);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findByDoctor(req, res) {
        try {
            const { email } = req.params;
            const appointments = await appointmentsService.findByDoctor(email);
            if (!appointments)
                return response(res, 400, "Agendas não encontradas.");
            return response(res, 200, "Agendas encontradas.", appointments);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { id } = req.params;
            await appointmentsService.update(id, data);
            return response(res, 200, "Agenda alterada.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await appointmentsService.delete(id);
            return response(res, 200, "Agenda deletada com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new appointmentsController();
