import expedientsService from "../services/expedientsService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";
import timeToDate from "../utils/timeToDate.js";

class expedientsController {
    async create(req, res) {
        try {
            const data = req.body;
            data.duration = timeToDate(data.duration);
            await expedientsService.create(data);
            return response(res, 201, "Expediente criado com sucesso.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const expedients = await expedientsService.findMany();
            return response(res, 200, "Expedientes listados.", expedients);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id } = req.params;
            const expedient = await expedientsService.findUnique(Number(id));
            if (!expedient)
                return response(res, 400, "Expediente não encontrado.");
            return response(res, 200, "Expediente encontrado.", expedient);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            data.duration = timeToDate(data.duration);
            const { id } = req.params;
            await expedientsService.update(Number(id), data);
            return response(res, 200, "Expediente alterado.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await expedientsService.delete(Number(id));
            return response(res, 200, "Expediente deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new expedientsController();
