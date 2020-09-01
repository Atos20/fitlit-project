const chai = require('chai');
const expect = chai.expect;
const chartTemplate = require('..src/chartTemplate.js')

describe('User', () => {

  let chart;

  beforeEach(() => {
    chart = new Chart(type, label, title, data)
  })
  it('it should be a function', () => {
      console.log(chart)
  })
})