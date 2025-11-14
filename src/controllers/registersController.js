import registersService from "../services/registersService.js";
import response from "../utils/response.js";
import handlePrismaError from "../utils/handlePrismaError.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../supports/registersSupports/tokenJWT.js";

class registersController {
    async create(req, res) {
        try {
            const data = req.body;
            data.password = await bcrypt.hash(data.password, 8);
            await registersService.create(data);
            return response(res, 201, "Registro criado com sucesso.");
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findMany(req, res) {
        try {
            const registers = await registersService.findMany();
            return response(res, 200, "Registros listados.", registers);
        } catch (error) {
            console.log(error);
            return handlePrismaError(res, error);
        }
    }

    async findUnique(req, res) {
        try {
            const { email } = req.params;
            const register = await registersService.findUnique(email);
            if (!register)
                return response(res, 400, "Registro não encontrado.");
            return response(res, 200, "Registro encontrado.", register);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async login(req, res) {
        try {
            const data = req.body;
            const register = await registersService.findUnique(data.email);
            if (!register)
                return response(res, 400, "E-mail ou senha incorretos.");
            let validePass = await bcrypt.compare(
                data.password,
                register.password
            );
            if (!validePass)
                return response(res, 400, "E-mail ou senha incorretos.");
            const token = createJWTToken(register);
            return response(res, 200, "Validação concluída.", token);
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { email } = req.params;
            await registersService.update(email, data);
            return response(res, 200, "Registro alterado.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }

    async delete(req, res) {
        try {
            const { email } = req.params;
            await registersService.delete(email);
            return response(res, 200, "Registro deletado com êxito.");
        } catch (error) {
            return handlePrismaError(res, error);
        }
    }
}

export default new registersController();
