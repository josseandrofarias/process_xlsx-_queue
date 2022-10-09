const DBConnector = require('@/lib/db');
const AlunosModel = require('@/models/alunos.models');
const AlunosMock = require('../mocks/alunos_mock');
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
        repository = await DBConnector.get('alunos');
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

        test('Should return error if parameter is not an obj', async () => {
            const sut = makeSut();
            try {
                await sut.insert('');
            } catch (error) {
                const errorExpect = new Error('[aluno] deve ser um objeto!');
                expect(error.message).toBe(errorExpect.message);
            }
        });

        test('Should return error if parameter is empty', async () => {
            const sut = makeSut();
            try {
                await sut.insert({});
            } catch (error) {
                const errorExpect = new Error('[aluno] não pode ser vazio!');
                expect(error.message).toBe(errorExpect.message);
            }
        });
    });

    describe('When getAll', () => {
        test('Should return an array of objects', async () => {
            const sut = makeSut();
            const insetedAluno = await sut.insert(mock);
            const getAluno = await sut.getById(insetedAluno);
            const result = await sut.getAll();
            expect(result).toEqual([getAluno]);
        });
    });

    describe('When getById', () => {
        test('Should return a single item being obj', async () => {
            const sut = makeSut();
            const insetedAluno = await sut.insert(mock);
            const result = await sut.getById(insetedAluno);
            expect(result.nome_completo).toBe(mock.nome_completo);
            expect(result.email).toBe(mock.email);
            expect(result.cpf).toBe(mock.cpf);

        });
    });

    describe('When updateOne', () => {
        test('Should return a status of update', async () => {
            const sut = makeSut();
            const insetedAluno = await sut.insert(mock);
            const updateAluno = await sut.updateOne(insetedAluno, { nome_completo: 'diff_name' });
            const result = await sut.getById(insetedAluno);

            expect(updateAluno).toBeTruthy();
            expect(result.nome_completo).toBe('diff_name');

        });
    });

    describe('When deleteOne', () => {
        test('Should return a status of delete', async () => {
            const sut = makeSut();
            const insetedAluno = await sut.insert(mock);
            const deleteAluno = await sut.deleteOne(insetedAluno);
            const result = await sut.getById(insetedAluno);

            expect(deleteAluno).toBeTruthy();
            expect(result).toBeNull();

        });
    });
});

