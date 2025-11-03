import appointmentsService from "../services/appointmentsService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class appointmentsController {
    async create(req, res) {
        try {
            const data = req.body;
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
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id } = req.params;
            const appointment = await appointmentsService.findUnique(id);
            if (!appointment)
                return response(res, 400, "Agenda não encontrada.");
            return response(res, 200, "Agenda encontrada.", appointment);
        } catch (error) {
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
