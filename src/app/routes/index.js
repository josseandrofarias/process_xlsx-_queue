const express = require('express');
const alunos = require('./alunos.routes');

const router = express.Router();

router.use(alunos);

module.exports = router;
