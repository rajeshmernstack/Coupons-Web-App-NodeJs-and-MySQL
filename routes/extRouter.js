const express = require('express');
const extRouter = express.Router();
const extController = require('../controllers/extController');

extRouter.get("/", extController.getAllExtensions);
extRouter.post("/", extController.addExtension);
extRouter.get("/delete", extController.deleteExtension)

module.exports = extRouter;