const path = require('path');
const DBConnector = require('@/lib/db');
const FilesController = require('@/controllers/processamento_arquivos.controller');
const FileMock = require('../mocks/processamento_arquivos_mock');
const model = require('@/models/processamento_arquivos.models');
let repository, mock;
const makeSut = () => {
    return FilesController;
};

describe('Processamento Arquivos controller', () => {
    beforeAll(async () => {
        await DBConnector.connect(
            DBConnector.mountConnectionUrl(),
            DBConnector.connectionOptions(),
        );
        repository = await DBConnector.get('processamento_arquivos');
    });

    beforeEach(async () => {
        mock = FileMock();
        await repository.deleteMany();
    });

    afterAll(async () => {
        await DBConnector.disconnect();
    });

    describe('When addSheetToQueue', () => {
        test('Should return an status of upload file', async () => {
            const sut = makeSut();
            const result = await sut.addSheetToQueue({ file: mock });
            expect(result.code).toEqual(200);
            expect(result.body.message).toEqual('Arquivo adicionado a fila para o processamento. Url para consulta: /arquivos/planilhas/alunos/:id/status');
        });
    });

    describe('When getByIdArquivo', () => {
        test('Should return a single item being obj', async () => {
            const sut = makeSut();
            const insetedFile = await model.insert(mock);
            const result = await sut.getByIdArquivo({ params: { id: insetedFile } });
            expect(result.code).toBe(200);
            expect(result.body.data.status).toBe(mock.status);
            expect(result.body.data.nome_arquivo).toBe(mock.originalname);

        });

        test('Should return error if parameter id is passed', async () => {
            const sut = makeSut();
            try {
                await sut.getByIdArquivo({ params: {} });
            } catch (error) {
                const errorExpect = new Error('[id] é obrigatório!');
                expect(error.message).toBe(errorExpect.message);
            }
        });
    });

    describe('When processFile', () => {
        test('Should return a data after process file', async () => {
            const sut = makeSut();
            const insetedFile = await model.insert(mock);
            const result = await sut.processFile({ id: insetedFile, file: { path: path.resolve('tests', 'mocks', 'planilha_alunos.xlsx') } });
            const expected = {
                code: 200,
                status: 'processado',
            };
            expect(result).toEqual(expected);
        });
    });

    describe('When changeStatusProcess', () => {
        test('Should return a status of update', async () => {
            const sut = makeSut();
            const insetedFile = await model.insert(mock);
            const result = await sut.changeStatusProcess(insetedFile, 'processando');
            expect(result).toBeTruthy();
        });
    });
});

