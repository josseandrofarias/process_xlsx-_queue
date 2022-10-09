const sut = require('@/lib/logger');

describe('Logger', () => {
    describe('When log', () => {
        test('Should returns log string', async () => {
            const resul = await sut.log('app', 'teste');
            expect(resul).toBe('app : teste');
        });
    });
});
