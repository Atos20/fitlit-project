const chai = require('chai');
const expect = chai.expect;
const ChartTemplate = require('../src/chartTemplate')

describe('User', () => {

  let chart;

  beforeEach(() => {
    chart = new ChartTemplate()
  })
  it('it should be a function', () => {
    expect(ChartTemplate).to.be.a('function');
  });
  it('should be an instance of the charTemplate class', () => {
    expect(chart).to.be.an.instanceOf(ChartTemplate);
  })
})