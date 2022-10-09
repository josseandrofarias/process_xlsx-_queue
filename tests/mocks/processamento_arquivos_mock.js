const faker = require('faker');

const mock = () => ({
    fieldname: faker.random.words(),
    originalname: faker.random.words(),
    encoding: faker.random.words(),
    mimetype: faker.random.words(),
    destination: faker.system.directoryPath(),
    filename: faker.random.words(),
    path: faker.system.directoryPath(),
    size: faker.datatype.number(),
    status: faker.random.arrayElement(['processando', 'processado', 'aguardando']),
});

module.exports = mock;
