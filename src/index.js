import axios from 'axios';
import parse from './parser';
const awsEnv = 'http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html';

axios.get(awsEnv)
  .then(({ data }) => {
    log(parse(data));
  });

function log(...args) {
  console.log(...args); // eslint-disable-line no-console
}
