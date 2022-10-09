const faker = require('faker');

const mock = () => ({
    nome_completo: `${faker.name.firstName()} ${faker.name.lastName()}`,
    estado_civil: faker.random.arrayElement(['Casado (a)', 'Solteiro (a)']),
    email: faker.internet.email(),
    cpf: faker.random.arrayElement([
        '90161723004',
        '32769120077',
        '67496491063',
    ])
    ,
    rg: faker.random.arrayElement([
        '9016172',
        '3276912',
        '6749649',
    ])
    ,
    data_nascimento: faker.date.past(),
    sexo: faker.random.arrayElement(['Masculino', 'Feminino']),
});
module.exports = mock;

