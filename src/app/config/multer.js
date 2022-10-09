const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const moment = require('moment');

const mes = moment().format('MM');
const ano = moment().format('YYYY');

const storage = multer.diskStorage({
    destination: path.resolve('tmp', 'planilhas', ano, mes),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, raw) => {
            if (err) {
                return cb(err);
            }

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    },
});

const imageFilter = function imageFilter(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(xlsx)$/)) {
        req.fileValidationError = 'Apenas arquivos [xlsx] são permitidos!';
        return cb(new Error('Apenas arquivos [xlsx] são permitidos!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload;
