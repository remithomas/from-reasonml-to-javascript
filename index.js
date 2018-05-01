const fs = require('fs');
const thunkify = require('thunkify');
const co = require('co');

const read = thunkify(fs.readFile);
const write = thunkify(fs.writeFile);
const readdir = thunkify(fs.readdir);

const LINE_SEPARATOR = '\n';
const PARAGRAPH_SEPARATOR = LINE_SEPARATOR + LINE_SEPARATOR;
const BASE_DIRECTORY = './src';
const REASON_CODE_EXTENSION = 're';
const JS_CODE_EXTENSION = 'js';

function printCode(content, type) {
    return (
        '```' + type +
        LINE_SEPARATOR +
        content +
        '```'
    );
}

function *listDirectories(baseDirectory) {
    return yield readdir(baseDirectory);
}

function *readSampleDirectory(sampleDirectoryName) {
    const dir = BASE_DIRECTORY + '/' + sampleDirectoryName;
    const genereatedSampleFiles = yield listDirectories(dir);

    const reasonContentFile = dir + '/' + genereatedSampleFiles[1];
    const reasonContent = yield read(reasonContentFile);
    const stringifiedReasonContent = reasonContent.toString();

    const jsContentFile = dir + '/' + genereatedSampleFiles[0];
    const jsContent = yield read(jsContentFile);
    const stringifiedJsContent = jsContent.toString();

    return (
        `### ${sampleDirectoryName}` +
        PARAGRAPH_SEPARATOR +
        printCode(stringifiedReasonContent, REASON_CODE_EXTENSION) +
        PARAGRAPH_SEPARATOR +
        printCode(stringifiedJsContent, JS_CODE_EXTENSION)
    );
}

function *writeREADME() {
    try {
        const sampleDirectories = yield listDirectories(BASE_DIRECTORY);

        const templateTopContent = yield read('./README.template.top.md');
        const TEMPLATE_TOP = templateTopContent.toString();

        // TOC
        const TOC = sampleDirectories.map(directory => `* [${directory}](${directory})`);
        
        // Content
        const CONTENT = yield sampleDirectories.map(function * (directory) {
            return yield readSampleDirectory(directory);
        });

        const README = 
            TEMPLATE_TOP + 
            LINE_SEPARATOR + 
            TOC.join(LINE_SEPARATOR) +
            PARAGRAPH_SEPARATOR +
            CONTENT.join(PARAGRAPH_SEPARATOR);

        yield write('README.md', README);
    } catch(error) {
        console.log('error', error);
    }
}

// write README
co(writeREADME)
    .then(() => console.log('Success !'))
    .catch((error) => console.log('error', error));
