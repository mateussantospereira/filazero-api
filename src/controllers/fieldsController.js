import fieldsService from "../services/fieldsService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class fieldsController {
    async create(req, res) {
        try {
            const data = req.body;
            await fieldsService.create(data);
            return response(res, 201, "Área Médica criada com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const fields = await fieldsService.findMany();
            return response(res, 200, "Área Médicas listadas.", fields);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { id } = req.params;
            const field = await fieldsService.findUnique(id);
            if (!field)
                return response(res, 400, "Área Médica não encontrada.");
            return response(res, 200, "Área Médica encontrada.", field);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { id } = req.params;
            await fieldsService.update(id, data);
            return response(res, 200, "Área Médica alterada.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await fieldsService.delete(id);
            return response(res, 200, "Área Médica deletada com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new fieldsController();
