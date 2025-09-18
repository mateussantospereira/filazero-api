const registersModel = require("../models/registersModel");

class registersClient {
    async list() {
        const model = await registersModel.list();
        return model
            .then((registers) => {
                if (registers[0]) {
                    return response(res)
                }
            })
    }
}
