import expect from 'expect';
import parser from '../../src/parser';
import fs from 'fs';
import path from 'path';

const sampleDom = fs.readFileSync(path.resolve(__dirname, '..', 'fixture.html'));

describe('parser', function() {
  it('is a function', () => {
    expect(parser).toBeA('function');
  });

  it('returns an object', () => {
    const result = parser(sampleDom);
    expect(result).toIncludeKey('nodejs');
    expect(result).toIncludeKey('awsSdk');
  });

  it('parses the correct sdk version', () => {
    const result = parser(sampleDom);
    expect(result).toInclude({ awsSdk: '2.45.0' });
  });

  it('parses the correct nodejs versions', () => {
    const result = parser(sampleDom);
    expect(result).toInclude({ nodejs: [ '4.3.2', '6.10' ] });
  });
});
