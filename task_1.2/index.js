import readLine from 'node:readline'
import {createReadStream, createWriteStream} from 'fs'
import csv from 'csvtojson'
import path from 'path'

const getReadableStreamFromFile = () => {
  try {
    const readableStream = createReadStream(path.resolve(__dirname, 'csv', 'nodejs-hw1-ex1.csv'));
    return readableStream;
  } catch(error) {
    process.stderr.write(`Error with input file. ${error.message}\n`)
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

const getWritableStreamToFile = () => {
  try {
    const writableStream = createWriteStream((path.join(__dirname, 'output.txt')));
    return writableStream;
  } catch(error) {
    process.stderr.write(`Error with output file. ${error.message}\n`)
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

const readableStream = getReadableStreamFromFile();
const writableStreamToFile = getWritableStreamToFile();
const rl = readLine.createInterface({
  input: readableStream.pipe(csv()),
  output: writableStreamToFile,
  crlfDelay: Infinity
});

rl.on('line', (line) => {writableStreamToFile.write(`${line}\n`)})