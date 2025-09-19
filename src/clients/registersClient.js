const registersModel = require("../models/registersModel");
const response = require("../helpers/response");

class registersClient {
    async list() {
        const model = registersModel.list();
        return model
            .then((registers) => {
                if (registers[0]) {
                    return response(
                        200,
                        false,
                        "Registros listados com êxito",
                        registers
                    );
                } else {
                    return response(204);
                }
            })
            .catch((error) => {
                return response(500, true, "Erro interno");
            });
    }
}

module.exports = new registersClient();
