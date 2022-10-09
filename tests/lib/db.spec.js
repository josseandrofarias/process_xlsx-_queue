const sut = require('@/lib/db');

describe('DB', () => {
    beforeAll(async () => {
        await sut.connect(
            sut.mountConnectionUrl(),
            sut.connectionOptions(),
        );
    });

    afterAll(async () => {
        await sut.disconnect();
    });

    test('Should reconnect when get() [collection] is invoked and client is disconnected', async () => {
        await sut.disconnect();
        const resul = await sut.get('users');
        expect(resul).toBeTruthy();
    });

    test('Should call client success', async () => {
        await sut.disconnect();
        const resul = await sut.get();
        expect(resul).toBeTruthy();
    });

    test('Should check client state is valid', async () => {
        const resul = await sut.client();
        expect(resul).toBeTruthy();
    });

    test('Should check client connect', async () => {
        await sut.disconnect();
        const resul = await sut.connect(sut.mountConnectionUrl(), sut.connectionOptions());
        expect(resul).toBeTruthy();
    });


    test('Should disconnect client success', async () => {
        const resul = await sut.disconnect();
        expect(resul).toBeFalsy();
    });


    test('Should avoid throw if try disconnect two time in a row', async () => {
        await sut.disconnect();
        const result = await sut.disconnect();
        expect(result).toBeNull();
    });

    test('Should return random mongo ObjectID value', async () => {
        const newObjectID = await sut.ObjectId();
        expect(newObjectID).toBeTruthy();
    });

    test('Should return options mongo', async () => {
        const result = await sut.connectionOptions();
        expect(result).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
    });
});
