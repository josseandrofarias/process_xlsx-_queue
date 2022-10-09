const path = require('path');
const sut = require('@/lib/xlsx');
const datFile = require('../mocks/planilha_alunos_data.json');

describe('Logger', () => {
    describe('When getDataFile', () => {
        test('Should returns the valid contents of the file', async () => {
            const resul = await sut.getDataFile(path.resolve('tests', 'mocks', 'planilha_alunos.xlsx'));
            expect(resul).toEqual(datFile);
        });
    });
});
