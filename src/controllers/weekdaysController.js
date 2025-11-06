import weekdaysService from "../services/weekdaysService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";
import weekdaysFormatTime from "../utils/weekdaysFormatTime.js";
import weekdayNumberParams from "../utils/weekdayNumberParams.js";

class weekdaysController {
    async createMany(req, res) {
        try {
            const data = weekdaysFormatTime(req.body);
            await weekdaysService.createMany(data);
            return response(res, 201, "Dias da semana criados com sucesso.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const weekdays = await weekdaysService.findMany();
            return response(res, 200, "Dias da semana listados.", weekdays);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findManyByExpedient(req, res) {
        try {
            const { id_expedient } = req.params;
            const weekday = await weekdaysService.findManyByExpedient(
                Number(id_expedient)
            );
            if (!weekday[0])
                return response(res, 400, "Dias da semana não encontrados.");
            return response(res, 200, "Dias da semana encontrados.", weekday);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const params = weekdayNumberParams(req.params);
            const data = await weekdaysService.findUnique(params);
            if (!data)
                return response(res, 400, "Dia da semana não encontrado.");
            return response(res, 200, "Dia da semana encontrado.", data);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = weekdaysFormatTime(req.body);
            for (const weekday of data) {
                await weekdaysService.update(weekday, weekday);
            }
            return response(res, 200, "Dias da semana alterados.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async deleteByExpedient(req, res) {
        try {
            const { id_expedient } = req.params;
            await weekdaysService.deleteByExpedient(Number(id_expedient));
            return response(res, 200, "Dias da semana deletados com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const params = weekdayNumberParams(req.params);
            await weekdaysService.delete(params);
            return response(res, 200, "Dia da semana deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new weekdaysController();
