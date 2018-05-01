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
const REASON_FILE_EXTENSION = 're';
const JS_CODE_EXTENSION = 'js';
const JS_FILE_EXTENSION = 'bs.js';
const MARKDOWN_FILE_EXTENSION = 'md';

function deserializeTitle(serializedTitle) {
    const index = serializedTitle.lastIndexOf('_');

    return serializedTitle
        .substr(0, index)
        .replace(/_/gi, ' ');
}

function printCode(content, type) {
    return (
        '```' + type +
        LINE_SEPARATOR +
        content +
        '```'
    );
}

function *printInfoFile(baseDir, file) {
    const fileUri = baseDir + '/' + file;
    const content = yield read(fileUri);
    return content.toString();
}

function *printCodeFile(baseDir, file, codeExtension) {
    const fileUri = baseDir + '/' + file;
    const content = yield read(fileUri);
    const stringifiedContent = content.toString();

    return (
        LINE_SEPARATOR +
        `[${file}](${fileUri})` +
        LINE_SEPARATOR +
        printCode(stringifiedContent, codeExtension)
    );
}

function *listDirectories(baseDirectory) {
    return yield readdir(baseDirectory);
}

function *readSampleDirectory(sampleDirectoryName) {
    const dir = BASE_DIRECTORY + '/' + sampleDirectoryName;
    const genereatedSampleFiles = yield listDirectories(dir);

    const mdInfos = yield genereatedSampleFiles
        .filter((file) => file.substr(-1 * (MARKDOWN_FILE_EXTENSION.length)) === MARKDOWN_FILE_EXTENSION)
        .map(function * (file) {
            return yield printInfoFile(dir, file);
        });

    const reasonCodes = yield genereatedSampleFiles
        .filter((file) => file.substr(-1 * (REASON_FILE_EXTENSION.length)) === REASON_FILE_EXTENSION)
        .map(function * (file) {
            return yield printCodeFile(dir, file, REASON_CODE_EXTENSION);
        });

    const jsCodes = yield genereatedSampleFiles
        .filter((file) => file.substr(-1 * (JS_FILE_EXTENSION.length)) === JS_FILE_EXTENSION)
        .map(function * (file) {
            return yield printCodeFile(dir, file, JS_CODE_EXTENSION);
        });

    const INFO = !mdInfos.length 
        ? ''
        : mdInfos.join(PARAGRAPH_SEPARATOR) + PARAGRAPH_SEPARATOR;

    return (
        `### ${deserializeTitle(sampleDirectoryName)}` +
        PARAGRAPH_SEPARATOR +
        INFO +
        '**Reason Input**' + 
        LINE_SEPARATOR +
        reasonCodes.join(PARAGRAPH_SEPARATOR) +
        PARAGRAPH_SEPARATOR +
        '**Javascript output**' + 
        LINE_SEPARATOR +
        jsCodes.join(PARAGRAPH_SEPARATOR)
    );
}

function *writeREADME() {
    try {
        const sampleDirectories = yield listDirectories(BASE_DIRECTORY);

        const templateTopContent = yield read('./README.template.top.md');
        const TEMPLATE_TOP = templateTopContent.toString();

        // TOC
        const TOC = sampleDirectories.map(directory => `* [${deserializeTitle(directory)}](#${directory.toLowerCase()})`);
        
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
