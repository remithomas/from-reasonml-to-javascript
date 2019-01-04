const fs = require('fs');
const thunkify = require('thunkify');
const co = require('co');

const read = thunkify(fs.readFile);
const write = thunkify(fs.writeFile);
const readdir = thunkify(fs.readdir);

const LINE_SEPARATOR = '\n';
const PARAGRAPH_SEPARATOR = LINE_SEPARATOR + LINE_SEPARATOR;
const BASE_DIRECTORY = './src';
const REASON_CODE_EXTENSION = 'reason';
const REASON_FILE_EXTENSION = 're';
const JS_CODE_EXTENSION = 'js';
const JS_FILE_EXTENSION = 'bs.js';
const MARKDOWN_FILE_EXTENSION = 'md';
const SPACE_DELIMITER = ' ';
const DASH_DELIMITER = '-';
const UNDERSCORE_DELIMITER = '_';

function deserializeTitle(serializedTitle, replace = SPACE_DELIMITER) {
  const index = serializedTitle.indexOf(UNDERSCORE_DELIMITER);
  return serializedTitle
    .substr(index + 1)
    .replace(/_/gi, replace);
}

function generateTOC(directories) {
  return directories.map(directory => {
    const title = deserializeTitle(directory, SPACE_DELIMITER);
    const link = deserializeTitle(directory.toLowerCase(), DASH_DELIMITER);
    return `* [${title}](#${link})`;
  });
}

function printCode(content, type) {
  return (
    '```' + type +
    LINE_SEPARATOR +
    content +
    '```'
  );
}

function isTypeFile(file, extension) {
  return file.substr(-1 * (extension.length)) === extension;
}

function isMarkdownFile(file) {
  return isTypeFile(file, MARKDOWN_FILE_EXTENSION);
}

function isReasonFile(file) {
  return isTypeFile(file, REASON_FILE_EXTENSION);
}

function isJsFile(file) {
  return isTypeFile(file, JS_FILE_EXTENSION);
}

function *printInfoFile(baseDir, file) {
  const fileUri = baseDir + '/' + file;
  const content = yield read(fileUri);
  return content.toString();
}

function *printCodeFile(baseDir, file) {
  const codeExtension = isReasonFile(file)
    ? REASON_CODE_EXTENSION
    : JS_CODE_EXTENSION;

  const header = isReasonFile(file)
    ? 'Reason Input'
    : 'Javascript Output'

  const separator = isReasonFile(file)
    ? '***' + LINE_SEPARATOR
    : LINE_SEPARATOR;

  const fileUri = baseDir + '/' + file;
  const content = yield read(fileUri);
  const stringifiedContent = content.toString();

  return (
    separator +
    `**${header}** : ` +
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
    .filter((file) => isMarkdownFile(file))
    .map(function * (file) {
        return yield printInfoFile(dir, file);
    });

  const codes = yield genereatedSampleFiles
    .filter((file) => isReasonFile(file) || isJsFile(file))
    .reverse()
    .map(function * (file) {
        return yield printCodeFile(dir, file);
    });

  const INFO = !mdInfos.length 
    ? ''
    : mdInfos.join(PARAGRAPH_SEPARATOR) + PARAGRAPH_SEPARATOR;

  return (
    `### ${deserializeTitle(sampleDirectoryName, SPACE_DELIMITER)}` +
    PARAGRAPH_SEPARATOR +
    INFO +
    codes.join(PARAGRAPH_SEPARATOR) +
    PARAGRAPH_SEPARATOR
  );
}

function *writeREADME() {
  try {
    const sampleDirectories = yield listDirectories(BASE_DIRECTORY);

    const templateTopContent = yield read('./README.template.top.md');
    const TEMPLATE_TOP = templateTopContent.toString();

    // TOC
    const TOC = generateTOC(sampleDirectories);
    
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
