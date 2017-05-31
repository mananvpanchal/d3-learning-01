import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, max, scaleBand, axisLeft, axisBottom, select } from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class SVG extends React.Component {
  render() {
    let dataSet = new Array(25).fill(undefined).map(d => {
      return parseInt(Math.random() * 100);
    });

    let margin = { top: 30, left: 30, bottom: 30, right: 30 };

    let w = 800 - margin.left - margin.right; let h = 400 - margin.top - margin.bottom;

    let yScale = scaleLinear()
    .domain([0, max(dataSet)])
    .range([h, 0]);

    let yAxis = axisLeft()
    .scale(yScale);

    let xScale = scaleBand()
    .domain(dataSet)
    .range([0, w], 0.2);

    let xAxis = axisBottom()
    .scale(xScale);

    let x = (d, i) => {
      return xScale(d);
    };

    let y = (d, i) => {
      return yScale(d);
    };

    let height = (d, i) => {
      return h - yScale(d);
    };

    let rects = dataSet.map((d, i) => {
      return (
        <rect key={i} style={{ fill: "teal" }} x={x(d, i)} y={y(d, i)}
          width={xScale.bandwidth() * 0.9} height={height(d, i)} />
        );
    });

    let yg = ReactFauxDOM.createElement('g');
    yg.setAttribute('key', 'y')
    yg.setAttribute('class', 'y axis');
    yg = select(yg);
    yg.call(yAxis);

    let xg = ReactFauxDOM.createElement('g');
    xg.setAttribute('key', 'x');
    xg.setAttribute('class', 'x axis');
    xg.setAttribute('transform', 'translate(0, '+ h +')')
    xg = select(xg);
    xg.call(xAxis);

    return (
      <svg
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
        style={{ backgroundColor: "lightGray" }}>
        <g transform={'translate('+margin.left+', '+margin.top+')'}>
          {yg.node().toReact()}
          {xg.node().toReact()}
          {rects}
        </g>
      </svg>
    );
  }
}

ReactDOM.render(<SVG />, document.getElementById('app'));


/*import * as d3 from 'd3';

let dataSet = new Array(10).fill(undefined).map(d => {
  return parseInt(Math.random() * 100);
});

console.log(dataSet);

let margin = { top: 30, left: 30, bottom: 30, right: 30 };

let w = 800 - margin.left - margin.right; let h = 400 - margin.top - margin.bottom;

let svg = d3.select('#app').append('svg')
.attr('width', w + margin.left + margin.right)
.attr('height', h + margin.top + margin.bottom)
.attr('style', 'background-color: lightGray;')
.append('g')
.attr('transform', 'translate('+margin.left+', '+margin.top+')');

let mult = 8;

let yScale = d3.scaleLinear()
.domain([0, d3.max(dataSet)])
.range([h, 0]);

let yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5);

let xScale = d3.scaleBand()
.domain(dataSet)
.range([0, w]);

let xAxis = d3.axisBottom()
.scale(xScale)
.ticks(30);

svg.append('g')
.attr('class', 'y axis')
.call(yAxis);

svg.append('g')
.attr('class', 'x axis')
.attr('transform', 'translate(0, '+h+')')
.call(xAxis);

svg.selectAll('rect')
.data(dataSet)
.enter()
.append('rect')
.attr('style', 'fill: teal')
.attr('x', (d, i) => {
  return 10 + xScale(i);
})
.attr('y', (d, i) => {
  return yScale(d);
})
.attr('width', xScale.bandwidth() * 0.9)
.attr('height', (d, i) => {
  return h - yScale(d);
});*/
