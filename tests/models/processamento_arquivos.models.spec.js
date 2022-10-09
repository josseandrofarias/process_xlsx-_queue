const DBConnector = require('@/lib/db');
const AlunosModel = require('@/models/processamento_arquivos.models');
const AlunosMock = require('../mocks/processamento_arquivos_mock');
let repository, mock;
const makeSut = () => {
    return AlunosModel;
};

describe('Alunos models', () => {
    beforeAll(async () => {
        await DBConnector.connect(
            DBConnector.mountConnectionUrl(),
            DBConnector.connectionOptions(),
        );
        repository = await DBConnector.get('processamento_arquivos');
    });

    beforeEach(async () => {
        mock = AlunosMock();
        await repository.deleteMany();
    });

    afterAll(async () => {
        await DBConnector.disconnect();
    });

    describe('When save', () => {
        test('Should return id if inserted with correct parameters', async () => {
            const sut = makeSut();
            const result = await sut.insert(mock);
            await expect(result).toBeTruthy();
        });
    });

    describe('When getById', () => {
        test('Should return a single item being obj', async () => {
            const sut = makeSut();
            const insetedFile = await sut.insert(mock);
            const result = await sut.getById(insetedFile);
            expect(result.fieldname).toBe(mock.fieldname);
            expect(result.originalname).toBe(mock.originalname);
            expect(result.encoding).toBe(mock.encoding);

        });
    });

    describe('When updateOne', () => {
        test('Should return a status of update', async () => {
            const sut = makeSut();
            const insetedFile = await sut.insert(mock);
            const updateFile = await sut.updateOne(insetedFile, { status: 'processando' });
            const result = await sut.getById(insetedFile);

            expect(updateFile).toBeTruthy();
            expect(result.status).toBe('processando');

        });
    });
});

