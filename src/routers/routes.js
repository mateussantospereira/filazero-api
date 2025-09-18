const { Router } = require("express");
const router = Router();
const registersController = require("../controllers/registersController");

router.get("/register/list", registersController.list);

module.exports = router;
