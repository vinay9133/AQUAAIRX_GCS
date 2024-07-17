import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as d3 from 'd3';


const socket = io('http://localhost:3001');


const SonarView = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    socket.on('sonarData', (newData) => {
      console.log('Data received:', newData);
      setData(newData);
      drawSonarRadar(newData);
    });

    return () => {
      socket.off('sonarData');
    };
  }, []);

  const drawSonarRadar = (data) => {
    const width = 150;
    const height = 150;
    const svg = d3.select('#sonarRadar')
                  .attr('width', width)
                  .attr('height', height);

    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2;
    const g = svg.append('g')
                 .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Green background
    g.append('circle')
     .attr('r', radius)
     .style('fill', 'green');

    // Grid lines
    for (let i = 1; i <= 4; i++) {
      g.append('circle')
       .attr('r', (radius / 4) * i)
       .style('stroke', 'lightgreen')
       .style('fill', 'none');
    }

    const directions = ['N', 'E', 'S', 'W'];
    directions.forEach((dir, i) => {
      const angle = (i * Math.PI) / 2;
      g.append('text')
       .attr('x', (radius + 20) * Math.cos(angle))
       .attr('y', (radius + 20) * Math.sin(angle))
       .attr('text-anchor', 'middle')
       .attr('alignment-baseline', 'middle')
       .style('fill', 'white')
       .style('font-size', '16px')
       .text(dir);
    });

    const sweepLine = g.append('line')
                       .attr('x1', 0)
                       .attr('y1', 0)
                       .attr('x2', 0)
                       .attr('y2', -radius)
                       .style('stroke', 'lightgreen')
                       .style('stroke-width', 2);
    const sweepDuration = 2000;
    function animateSweep() {
      sweepLine.transition()
               .duration(sweepDuration)
               .ease(d3.easeLinear)
               .attrTween('transform', () => {
                 return (t) => `rotate(${720 * t})`;
               })
               .on('end', animateSweep);
    }
    animateSweep();

    g.selectAll('.pulse')
     .data(data.pulses)
     .enter()
     .append('circle')
     .attr('class', 'pulse')
     .attr('r', 3)
     .attr('cx', d => rScale(d.distance) * Math.cos((d.angle * Math.PI) / 180 - Math.PI / 2))
     .attr('cy', d => rScale(d.distance) * Math.sin((d.angle * Math.PI) / 180 - Math.PI / 2))
     .style('fill', 'red');
  };

  const rScale = d3.scaleLinear()
                   .range([0, Math.min(150,150) / 2])
                   .domain([0, 100]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
   
      <svg id="sonarRadar"></svg>
    </div>
  );
};

export default SonarView;
