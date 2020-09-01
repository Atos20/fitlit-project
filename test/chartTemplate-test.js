const chai = require('chai');
const expect = chai.expect;
const ChartTemplate = require('../src/chartTemplate')

describe('User', () => {

  let chartTemplate1;
  let chartTemplate2;
  beforeEach(() => {
    chartTemplate1 = new ChartTemplate('bar', ['one', 'two'], 'this is a bar chart', [])
    chartTemplate2 = new ChartTemplate('line', ['three', 'four'], 'this is a line chart', [])
  })
  it('it should be a function', () => {
    expect(ChartTemplate).to.be.a('function');
  });
  it('should be an instance of the charTemplate class', () => {
    expect(chartTemplate1).to.be.an.instanceOf(ChartTemplate);
  });
  it('should be able to create a bar chart',() => {
    expect(chartTemplate1.type).to.deep.equal('bar');
  });
  it('should be able to create a line chart', () => {
    expect(chartTemplate2.type).to.equal('line');
  });
})
