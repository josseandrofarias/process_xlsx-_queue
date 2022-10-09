module.exports = {
    roots: ['<rootDir>/tests'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    collectCoverageFrom: ['**/src/**/*.js'],
    preset: '@shelf/jest-mongodb',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    moduleNameMapper: {
        '@/tests/(.*)': '<rootDir>/tests/$1',
        '@/(.*)': '<rootDir>/src/$1',
    },
};
