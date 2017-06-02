import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, max, scaleBand, axisLeft,
  axisBottom, select, area, curveBasis, line } from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class SVG extends React.Component {
  render() {
    let dataSet = new Array(21).fill(undefined).map((d, i) => {
      return {
        x: i * 5,
        y: parseInt(Math.random() * 100)
      };
    });

    let margin = { top: 30, left: 30, bottom: 30, right: 30 };

    let w = 800 - margin.left - margin.right; let h = 400 - margin.top - margin.bottom;

    let yScale = scaleLinear()
    .domain([0, 100])
    .range([h, 0]);

    let yAxis = axisLeft()
    .scale(yScale);

    let xScale = scaleLinear()
    .domain([0, 100])
    .range([0, w]);

    let xAxis = axisBottom()
    .scale(xScale);

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

    let ln = line()
    .curve(curveBasis)
    .x((d) => {
      return xScale(d.x);
    })
    //.y0((d) => {
    //  return yScale(0);
    //})
    .y((d) => {
      return yScale(d.y);
    });

    let path = ReactFauxDOM.createElement('path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'blue');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', ln(dataSet));

    return (
      <svg
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
        style={{ backgroundColor: "lightGray" }}>
        <g transform={'translate('+margin.left+', '+margin.top+')'}>
          {yg.node().toReact()}
          {xg.node().toReact()}
          {path.toReact()}
        </g>
      </svg>
    );
  }
}

ReactDOM.render(<SVG />, document.getElementById('app'));

/*import * as d3 from 'd3';

let dataSet = new Array(21).fill(undefined).map((d, i) => {
  return {
    x: i * 5,
    y: parseInt(Math.random() * 100)
  };
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

let path = svg.append('path')
.attr('stroke', 'black')
.attr('stroke-width', '1')
.attr('fill', 'none');

let yScale = d3.scaleLinear()
.domain([0, 100])
.range([h, 0]);

let yAxis = d3.axisLeft()
.scale(yScale);

let xScale = d3.scaleLinear()
.domain([0, 100])
.range([0, w]);

let xAxis = d3.axisBottom()
.scale(xScale);

svg.append('g')
.attr('class', 'y axis')
.call(yAxis);

svg.append('g')
.attr('class', 'x axis')
.attr('transform', 'translate(0, '+h+')')
.call(xAxis);

let line = d3.line()
.curve(d3.curveBasis)
.x((d) => {
  return xScale(d.x);
})
//.y0((d) => {
  //return yScale(0);
//})
.y((d) => {
  return yScale(d.y);
});

path.datum(dataSet)
.attr('d', line);*/
