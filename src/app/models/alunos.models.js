const { extend, isPlainObject } = require('lodash');
const moment = require('moment');
const { get, ObjectId } = require('../lib/db');
const Alunos = get().collection('sanitizations');

const insert = async function insert(aluno) {
    if (!isPlainObject(aluno)) {
        throw new Error('[aluno] deve ser um objeto!');
    }

    if (Object.keys(aluno).length === 0) {
        throw new Error('[aluno] não pode ser vazio!');
    }
    const date = moment.utc().toDate();

    aluno.created_at = date;
    aluno.updated_at = date;
    aluno.deleted_at = null;

    const result = await Alunos.insertOne(aluno);
    return result.insertedId;
};

const getAll = async function getAll() {
    const result = await Alunos.find().toArray();
    return result;
};

const getById = async function getById(id) {
    const criteria = { _id: ObjectId(id) };

    const result = await Alunos.findOne(criteria);
    return result;
};

const updateOne = async function updateOne(id, data) {
    const criteria = { _id: ObjectId(id, company) };
    const update = {
        $set: extend(data, { updated_at : moment.utc().toDate() }),
    };

    const result = await Alunos.updateOne(criteria, update);
    return result.modifiedCount === 1;
};

const deleteOne = async function deleteOne(id) {
    const filter = { _id: ObjectId(id) };
    const result = await Alunos.deleteOne(filter);
    return result.deletedCount === 1;
};

module.exports = {
    insert,
    getAll,
    getById,
    updateOne,
    deleteOne,
};

