import weekdaysService from "../services/weekdaysService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";
import weekdaysFormatTime from "../utils/weekdaysFormatTime.js";

class weekdaysController {
    async createMany(req, res) {
        try {
            const data = weekdaysFormatTime(req.body);
            await weekdaysService.createMany(data);
            return response(res, 201, "Dias da semana criado com sucesso.");
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

    async findManyByExpedient(req, res) {
        try {
            const { id_expedient } = req.params;
            const weekday = await weekdaysService.findManyByExpedient(
                Number(id_expedient)
            );
            if (!weekday)
                return response(res, 400, "Dias da semana não encontrado.");
            return response(res, 200, "Dias da semana encontrado.", weekday);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id_expedient, weekday, week } = req.params;
            const data = await weekdaysService.findUnique(
                Number(id_expedient),
                Number(weekday),
                Number(week)
            );
            if (!data)
                return response(res, 400, "Dia da semana não encontrado.");
            return response(res, 200, "Dia da semana encontrado.", data);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id_expedient, weekday, week } = req.params;
            await weekdaysService.delete(
                Number(id_expedient),
                Number(weekday),
                Number(week)
            );
            return response(res, 200, "Dia da semana deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new weekdaysController();
