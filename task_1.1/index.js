const { openStdin, stdout } = require('process');
const {pipeline, Transform} = require('stream');

class RevertStringTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = chunk.toString().split('').reverse().join('');
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

const revertInputString = new RevertStringTransformStream()

pipeline(
  openStdin(),
  revertInputString,
  stdout,
  (error) => console.log(error)
)
