import doctorsService from "../services/doctorsService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";

class doctorsController {
    async create(req, res) {
        try {
            const data = req.body;
            await doctorsService.create(data);
            return response(res, 201, "Médico criado com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const doctors = await doctorsService.findMany();
            return response(res, 200, "Médicos listados.", doctors);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { email } = req.params;
            const doctor = await doctorsService.findUnique(email);
            if (!doctor)
                return response(res, 400, "Médico não encontrado.");
            return response(res, 200, "Médico encontrado.", doctor);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { email } = req.params;
            await doctorsService.update(email, data);
            return response(res, 200, "Médico alterado.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { email } = req.params;
            await doctorsService.delete(email);
            return response(res, 200, "Médico deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new doctorsController();
