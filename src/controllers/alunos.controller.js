const model = require('../models/alunos.models');
const queue = require('../lib/queue');
const config = require('config');

const addSheetToQueue =  async function addSheetToQueue(data) {
    const { file } = data;

    const id = file.filename.split('.')[0];
    queue.sendToQueue(config.get("queue.keySheets"), { file }, { consumerTag: id });

    return {
        code: 200,
        body: {
            message: 'Arquivo adicionado a fila para o processamento. Url para consulta: /alunos/planilhas/:id/status',
            id,
        },
    };
};

const getAllAluno = async function getAllAluno() {
    const result = model.getAll();
    return {
        code: 200,
        body: {
            status: true,
            data: result,
        },
    };
};

const getByIdAluno = async function getByIdAluno(data) {
    const { params } = data;
    if(!params.id) throw new Error('[id] é obrigatório!', { code: 404 });

    const result = model.getAll(params.id);
    return {
        code: 200,
        body: {
            status: true,
            data: result,
        },
    };
};

const updateAluno = async function updateAluno(data) {
    const { body, params } = data;
    if(!params.id) throw new Error('[id] é obrigatório!', { code: 404 });

    const result = model.update(body, params);
    return {
        code: 200,
        body: {
            status: true,
            data: result,
        },
    };
};

const deleteAluno = async function deleteAluno(data) {
    const { params } = data;
    if(!params.id) throw new Error('[id] é obrigatório!', { code: 404 });

    const result = model.deleteOne(params.id);
    return {
        code: 200,
        body: {
            status: true,
            data: result,
        },
    };
};


module.exports = {
    addSheetToQueue,
    getAllAluno,
    getByIdAluno,
    updateAluno,
    deleteAluno,
};
