const fs = require('fs');

const readFile = (path) => {
    const obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    return obj;
}

const writeFile = (path, network) => {
    fs.writeFile(path,  JSON.stringify(network.toJSON()), function(err) {
        if(err) return console.log(err);
        console.log("O arquivo foi salvo!")
    });
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
}