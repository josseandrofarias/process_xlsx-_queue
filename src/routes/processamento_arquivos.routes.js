const express = require('express');
const controller = require('../controllers/processamento_arquivo.controller');
const makeExpressCallback = require('../middlewares/express-callback');
const multerPlanilha = require('../config/multer');

const router = express.Router();

router.route('/arquivos/planilhas/alunos')
    .post(multerPlanilha.single('file'), makeExpressCallback(controller.addSheetToQueue));

router.route('/arquivos/planilhas/alunos/:id/status')
    .get(makeExpressCallback(controller.getByIdArquivo));

module.exports =  router;
