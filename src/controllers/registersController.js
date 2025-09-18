const registersModel = require("../models/registersModel");

function responseModel(model) {
    return model
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

class registersController {
    async list(req, res) {
        const model = await registersModel.list();
        return res.json({ message: "Model" });
    }
}

module.exports = new registersController();
