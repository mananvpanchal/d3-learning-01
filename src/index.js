import * as d3 from 'd3';

let dataSet = new Array(15).fill(undefined).map(d => {
  return Math.random() * 100;
});

let w = 400; let h = 300;

let svg = d3.select('#app').append('svg')
.attr('width', w)
.attr('height', h);

let mult = 8;

let yScale = d3.scaleLinear()
.domain([0, d3.max(dataSet) * 1.1])
.range([0, h]);

let xScale = d3.scaleBand()
.domain(dataSet)
.range([0, w], 0.2);

svg.selectAll('rect')
.data(dataSet)
.enter()
.append('rect')
.attr('style', 'fill: teal')
.attr('x', (d, i) => {
  return xScale(d);
})
.attr('y', (d, i) => {
  return h - yScale(d);
})
.attr('width', xScale.bandwidth() * 0.9)
.attr('height', (d, i) => {
  return yScale(d);
});
