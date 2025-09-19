const registersClient = require("../clients/registersClient");
const returnResponse = require("../helpers/returnResponse");

class registersController {
    async list(req, res) {
        const client = await registersClient.list();
        return returnResponse(res, client);
    }
}

module.exports = new registersController();
