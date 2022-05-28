import chalk from 'chalk';
import * as app from './index.js';
import * as http from './http-validation.js';

const route = process.argv;

async function processText(routeFile) {
    const result = await app.catchFile(routeFile[2]);
    if (route[3] == 'validar') {
        console.log(chalk.yellowBright('links validados:'), await http.validateURLs(result));
    } else {
        console.log(chalk.yellow('lista de links:'), result);
    }
}

processText(route)
