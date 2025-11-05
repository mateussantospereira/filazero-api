import hospitalsService from "../services/hospitalsService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class hospitalsController {
    async create(req, res) {
        try {
            const data = req.body;
            await hospitalsService.create(data);
            return response(res, 201, "Hospital criado com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const hospitals = await hospitalsService.findMany();
            return response(res, 200, "Hospitais listados.", hospitals);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id } = req.params;
            const hospital = await hospitalsService.findUnique(Number(id));
            if (!hospital)
                return response(res, 400, "Hospital não encontrado.");
            return response(res, 200, "Hospital encontrado.", hospital);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { id } = req.params;
            await hospitalsService.update(Number(id), data);
            return response(res, 200, "Hospital alterado.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await hospitalsService.delete(Number(id));
            return response(res, 200, "Hospital deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new hospitalsController();
