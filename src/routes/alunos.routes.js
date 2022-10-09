const express = require('express');
const controller = require('../controllers/alunos.controller');
const makeExpressCallback = require('../middlewares/express-callback');

const router = express.Router();

router.route('/alunos')
    .get(makeExpressCallback(controller.getAllAluno));

router.route('/alunos/:id')
    .get(makeExpressCallback(controller.getByIdAluno))
    .put(makeExpressCallback(controller.updateAluno))
    .delete(makeExpressCallback(controller.deleteAluno));

module.exports =  router;
