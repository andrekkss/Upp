const brain = require('brain.js');
const file = require('../../utility/utility');
const fs = require('fs');
const data = require('./config/data.json');

const network = new brain.recurrent.LSTM();
const path = "./src/controller/ia/config/network.json";

const exec = (comando) => {
    fs.open(path, 'r', (err) => {
        if (err) {
        if (err.code === 'ENOENT') {
            const trainingData = data.map(item => ({
                input: item.text,
                output: item.category
            }));
            network.train(trainingData, { iterations: 500, log: true  });
            fs.writeFile(path,  JSON.stringify(network.toJSON()), function(err) {
            if(err) return console.log(err);
                console.log("training save!")
              });
            const output = network.run(comando);
            console.log(`Resposta: ${output}`);
            return output;
            }
        }
    });
    const obj = file.readFile(path);
    network.fromJSON(obj);
    const output = network.run(comando);
    console.log(`Resposta: ${output}`);
    return output;
}

module.exports.exec = exec;