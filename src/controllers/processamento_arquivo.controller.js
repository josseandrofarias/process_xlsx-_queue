const config = require('config');
const model = require('../models/processamento_arquivos.models');
const modelAlunos = require('../models/alunos.models');
const queue = require('../lib/queue');
const xlsx = require('../lib/xlsx');

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


const processFile = async function processFile(data) {
    const { id, file: { path } } = data;

    changeStatusProcess(id, 'processando');
    const dataFile = xlsx.getDataFile(path);

    dataFile.map(async item => {
        await modelAlunos.insert({
            nome_completo: item.__EMPTY,
            estado_civil: item.__EMPTY_1,
            email: item.__EMPTY_2,
            cpf: item.__EMPTY_3,
            rg: item.__EMPTY_4,
            data_nascimento: item.__EMPTY_5,
            sexo: item.__EMPTY_6,
        });
    });

    await model.updateOne(id, { status: 'processado' });
    changeStatusProcess(id, 'processado');

    return {
        code: 200,
        status: 'processado',
    };

};

const changeStatusProcess = async function changeStatusProcess(id, status) {
    return await model.updateOne(id, { status });
};

module.exports = {
    addSheetToQueue,
    getByIdArquivo,
    processFile,
};
