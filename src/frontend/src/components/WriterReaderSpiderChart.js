import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';

const SpiderChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2 - 50;
    const levels = 5; // Number of levels in the web

    // Calculate the maximum value of books in a genre
    const maxValue = d3.max(data, (d) => d.value);
    const levelMax = Math.ceil(maxValue / 10) * 10; // Set the maximum value to the nearest multiple of 10

    const angleSlice = (2 * Math.PI) / data.length;

    //Radio scale set to maximum value
    const rScale = d3.scaleLinear().domain([0, levelMax]).range([0, radius]);

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height);

    const g = svg.selectAll('g').data([data]).join('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Add the tooltip to the DOM
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('font-size', '12px');

    // Draw the levels (concentric polygons)
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius / levels) * level;

      const points = data.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return [
          levelRadius * Math.cos(angle),
          levelRadius * Math.sin(angle),
        ];
      });

      g.append('polygon')
        .attr('points', points.map((d) => d.join(',')).join(' '))
        .attr('fill', 'none')
        .attr('stroke', '#1e3a5f') 
        .attr('stroke-width', 2) // increased the thickness of the level lines
        .attr('stroke-dasharray', level === levels ? '' : '4 4'); // Solid line for the outer border
    }

    // Level labels (numbers from 1 to levels)
    for (let level = 1; level <= levels; level++) {
      g.append('text')
        .attr('x', 0)
        .attr('y', -(radius / levels) * level)
        .attr('dy', '-0.3em')
        .attr('text-anchor', 'middle')
        .text((level * (levelMax / levels)).toFixed(0)) // Labels adjusted to actual values
        .style('fill', '#00FFDD')
        .style('font-size', '12px');
    }

    // Radial lines
    g.selectAll('.radial-line').data(data).join('line')
      .attr('class', 'radial-line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (_, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', '#00FFDD') 
      .attr('stroke-width', 1);

    // Genre tags
    g.selectAll('.genre-label').data(data).join('text')
      .attr('class', 'genre-label')
      .attr('x', (_, i) => (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_, i) => (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('text-anchor', (d, i) => {
        const angle = angleSlice * i;
        if (angle === 0 || angle === Math.PI) return 'middle';
        return angle < Math.PI ? 'start' : 'end';
      })
      .text((d) => d.genre)
      .style('font-size', '14px')
      .style('fill', '#FF00FF'); 

    // Draw the data polygon
    const radarLine = d3.line()
      .x((d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .y((d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));

    g.selectAll('.data-polygon').data([data]).join('path')
      .attr('class', 'data-polygon')
      .attr('d', radarLine)
      .attr('fill', 'rgba(0, 150, 255, 0.4)') 
      .attr('stroke', '#00FFFF') // Radar Edge
      .attr('stroke-width', 2);

    // Draw points at the vertices
    g.selectAll('.data-point').data(data).join('circle')
      .attr('class', 'data-point')
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('r', 4)
      .attr('fill', '#FF00FF') 
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .text(`${d.genre}: ${d.value} books`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY + 5) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  }, [data]);

  return <svg ref={svgRef} />;
};

export default SpiderChart;
