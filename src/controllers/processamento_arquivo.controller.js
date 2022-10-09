const model = require('../models/processamento_arquivos.models');
const queue = require('../lib/queue');
const config = require('config');

const addSheetToQueue =  async function addSheetToQueue(data) {
    const { file } = data;

    const id = await model.insert({ ...file, status: 'aguardando' });
    queue.sendToQueue(config.get("queue.keySheets"), { id, file });

    return {
        code: 200,
        body: {
            id,
            message: 'Arquivo adicionado a fila para o processamento. Url para consulta: /arquivos/planilhas/alunos/:id/status',
            url: `/arquivos/planilhas/alunos/${id}/status`,
        },
    };
};

const getByIdArquivo = async function getByIdArquivo(data) {
    const { params } = data;
    if(!params.id) throw new Error('[id] é obrigatório!', { code: 404 });

    const result = await model.getById(params.id);
    return {
        code: 200,
        body: {
            status: true,
            data: {
                status: result.status,
                nome_arquivo: result.originalname,
                created_at: result.created_at,
                updated_at: result.updated_at,
            },
        },
    };
};


const processaArquivo = async function processaArquivo(data) {
    const { id } = data;
    await model.updateOne(id, { status: 'processando' });
    await model.updateOne(id, { status: 'processado' });
    return {
        code: 200,
    };

};

module.exports = {
    addSheetToQueue,
    getByIdArquivo,
    processaArquivo,
};
