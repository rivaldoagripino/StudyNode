import chalk from 'chalk';
import fs from 'fs';


const text = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)';

function extractText(contentText) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResult = [];
    let temp;
    while ((temp = regex.exec(contentText)) !== null) {
        arrayResult.push({
            [temp[1]]: temp[2]
        })
    }
    return arrayResult.length === 0 ? 'Não há links' : arrayResult;
}

function handleError(error) {
    throw Error(chalk.red(error.code, 'Arquivo não encontrado'));
}

export async function catchFile(routeFile) {
    try {
        const content = await fs.promises.readFile(routeFile, 'utf-8')        
        return extractText(content);
    } catch (error) {
        return handleError(error);
    } 
}
