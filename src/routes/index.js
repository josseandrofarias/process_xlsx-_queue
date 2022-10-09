const express = require('express');
const alunos = require('./alunos.routes');
const processamentoArquivo = require('./processamento_arquivos.routes');

const router = express.Router();

router.use(alunos);
router.use(processamentoArquivo);

module.exports = router;
