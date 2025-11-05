import weekdaysService from "../services/weekdaysService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class weekdaysController {
    async create(req, res) {
        try {
            const data = req.body;
            await weekdaysService.create(data);
            return response(res, 201, "Dia da semana criado com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const weekdays = await weekdaysService.findMany();
            return response(res, 200, "Dias da semana listados.", weekdays);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id_expedient } = req.params;
            const weekday = await weekdaysService.findUnique(id_expedient);
            if (!weekday)
                return response(res, 400, "Dias da semana não encontrado.");
            return response(res, 200, "Dias da semana encontrado.", weekday);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { id_expedient } = req.params;
            await weekdaysService.update(id_expedient, data);
            return response(res, 200, "Dia da semana alterado.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id_expedient } = req.params;
            await weekdaysService.delete(id_expedient);
            return response(res, 200, "Dia da semana deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new weekdaysController();
