const express = require('express');
const codeRouter = express.Router();
const codeController = require('../controllers/codeController');

codeRouter.post("/", codeController.addCode)
codeRouter.get("/delete", codeController.deleteCode)
codeRouter.get("/:extid", codeController.getExtensionCodes);

module.exports = codeRouter;