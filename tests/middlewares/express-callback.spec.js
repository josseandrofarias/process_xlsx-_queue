const sut = require('@/middlewares/express-callback');

describe('Logger', () => {
    const req = {
        get: () => {},
    };
    const res = {
        status: (_) => {
            return {
                send: (value) => value,
                json: (value) => value,
            };
        },
    };
    test('Should returns valid status', async () => {
        const result = await sut((() => ({
            code: 200,
            body: { status : true },
        })))(req, res);
        expect(result.status).toBeTruthy();
    });

    test('Should returns invalid status', async () => {
        const result = await sut((() => {
            throw new Error('Error Generic');
        }))(req, res);
        expect(result).toBeFalsy();
    });
});
