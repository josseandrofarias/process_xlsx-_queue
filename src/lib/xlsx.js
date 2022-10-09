const reader = require("xlsx");

const getDataFile = function getDataFile(path) {
    const file = reader.readFile(path);
    let dataFile = [];

    const sheets = file.SheetNames;

    for(let i = 0; i < sheets.length; i++)
    {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

        temp.forEach((res) => {
            dataFile.push(res);
        });
    }

    return dataFile;
};

module.exports = {
    getDataFile,
};
