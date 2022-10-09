const DBConnector = require('@/lib/db');
const AlunosController = require('@/controllers/alunos.controller');
const AlunosMock = require('../mocks/alunos_mock');
const model = require('@/models/alunos.models');
let repository, mock;
const makeSut = () => {
    return AlunosController;
};

describe('Alunos controller', () => {
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

    describe('When getAllAluno', () => {
        test('Should return an array of objects', async () => {
            const sut = makeSut();
            const insetedAluno = await model.insert(mock);
            const getAluno = await model.getById(insetedAluno);
            const result = await sut.getAllAluno(mock);
            const expected = {
                code: 200,
                body: {
                    status: true,
                    data: [getAluno],
                },
            };
            expect(result).toEqual(expected);
        });
    });

    describe('When getByIdAluno', () => {
        test('Should return a single item being obj', async () => {
            const sut = makeSut();
            const insetedAluno = await model.insert(mock);
            const result = await sut.getByIdAluno({ params: { id: insetedAluno } });
            expect(result.body.data.nome_completo).toBe(mock.nome_completo);
            expect(result.body.data.email).toBe(mock.email);
            expect(result.body.data.cpf).toBe(mock.cpf);

        });

        test('Should return error if parameter id is passed', async () => {
            const sut = makeSut();
            try {
                await sut.getByIdAluno({ params: {} });
            } catch (error) {
                const errorExpect = new Error('[id] é obrigatório!');
                expect(error.message).toBe(errorExpect.message);
            }
        });
    });


    describe('When updateAluno', () => {
        test('Should return a status of update', async () => {
            const sut = makeSut();
            const insetedAluno = await model.insert(mock);
            const result = await sut.updateAluno({ params: { id: insetedAluno }, body: { nome_completo: 'diff_name' } });
            const expected = {
                code: 200,
                body: {
                    status: true,
                    data: {
                        statusUpdate: true,
                    },
                },
            };
            expect(result).toEqual(expected);
        });

        test('Should return error if parameter id is passed', async () => {
            const sut = makeSut();
            try {
                await sut.updateAluno({ params: {}, body: { nome_completo: 'diff_name' } });
            } catch (error) {
                const errorExpect = new Error('[id] é obrigatório!');
                expect(error.message).toBe(errorExpect.message);
            }
        });

        test('Should return error if parameter id is passed', async () => {
            const sut = makeSut();
            try {
                await sut.updateAluno({ params: { id: 'id'}, body: {}});
            } catch (error) {
                const errorExpect = new Error('[body] é obrigatório!');
                expect(error.message).toBe(errorExpect.message);
            }
        });
    });

    describe('When deleteAluno', () => {
        test('Should return a status of delete', async () => {
            const sut = makeSut();
            const insetedAluno = await model.insert(mock);
            const deleteAluno = await sut.deleteAluno({ params: { id: insetedAluno } });
            const result = await model.getById(insetedAluno);
            const expected = {
                code: 200,
                body: {
                    status: true,
                    data: {
                        statusDelete: true,
                    },
                },
            };

            expect(deleteAluno).toEqual(expected);
            expect(result).toBeNull();
        });

        test('Should return error if parameter id is passed', async () => {
            const sut = makeSut();
            try {
                await sut.deleteAluno({ params: {} });
            } catch (error) {
                const errorExpect = new Error('[id] é obrigatório!');
                expect(error.message).toBe(errorExpect.message);
            }
        });
    });
});

