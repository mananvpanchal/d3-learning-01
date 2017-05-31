import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, max, scaleBand, axisLeft, axisBottom, select } from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class SVG extends React.Component {
  render() {
    let dataSet = new Array(25).fill(undefined).map(d => {
      return {
        x: parseInt(Math.random() * 100),
        y: parseInt(Math.random() * 100),
        r: parseInt(Math.random() * 30)
      }
    });

    console.log(dataSet);

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

    let x = (d, i) => {
      return xScale(d.x);
    };

    let y = (d, i) => {
      return yScale(d.y);
    };

    let height = (d, i) => {
      return h - yScale(d);
    };

    let r = (d, i) => {
      return d.r;
    }

    let circles = dataSet.map((d, i) => {
      return (
        <g key={i}>
          <circle key={i} style={{ fill: "teal" }} className={'bubble'} cx={x(d, i)} cy={y(d, i)} r={r(d, i)} />
          <text fontSize={8} x={x(d, i)} y={y(d, i)} textAnchor="middle" dy=".3em">x: {d.x}, y: {d.y}, r: {d.r}</text>
        </g>
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
          {circles}
        </g>
      </svg>
    );
  }
}

ReactDOM.render(<SVG />, document.getElementById('app'));
