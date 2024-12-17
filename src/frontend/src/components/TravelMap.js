import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import "./TravelMap.css";

const TravelMap = () => {
  const svgRef = useRef();
  const [travelData, setTravelData] = useState([]);

  useEffect(() => {
    // Fetch the travel data from the backend
    fetch('http://localhost:5000/api/travels')
      .then((res) => res.json())
      .then((data) => {
        if (data.countries && Array.isArray(data.countries)) {
            setTravelData(data.countries); // Just save the array of countries
          } else {
            console.error('Unexpected data format:', data);
            setTravelData([]); // Fallback if the format is not correct
          }
      })
      .catch((error) => console.error('Error fetching travel data:', error));
  }, []);

  useEffect(() => {
    if (travelData.length === 0) return;

    // Load and render the world map with D3
    const renderMap = async () => {
      const width = 800;
      const height = 600;

      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Clear previous render
      svg.selectAll('*').remove();

      // Projection and path generator
      const projection = d3.geoMercator().scale(100).translate([width / 2, height / 1.5]);
      const pathGenerator = d3.geoPath().projection(projection);

      // Load GeoJSON for the world map
      const geojson = await d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
      const countries = topojson.feature(geojson, geojson.objects.countries).features;

      // Function to get status for each country
      const getCountryStatus = (countryName) => {
        if (!travelData) return null; // Prevent errors if countries does not exist yet
        const country = travelData.find((c) => c.country === countryName);
        return country ? country.status : null;
      };

      // Colors for visited and to visit
      const getColor = (status) => {
        switch (status) {
          case 'visited':
            return '#FF5E00'; 
          case 'to visit':
            return '#FF00FF'; 
          default:
            return '#808080'; 
        }
      };

      // Draw the countries
      svg
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', (d) => {
          const status = getCountryStatus(d.properties.name);
          return getColor(status);
        })
        .attr('stroke', '#000')
        .on('mouseover', (event, d) => {
          const countryData = travelData.find((c) => c.country === d.properties.name);
          if (countryData) {
            const tooltip = d3.select('#tooltip');
            tooltip
              .style('display', 'block')
              .html(
                `<strong>${countryData.country}</strong><br>
                Status: ${countryData.status}<br>
                Date: ${countryData.date}<br>
                Cities: ${countryData.cities.join(', ')}`
              );
          }
        })
        .on('mousemove', (event) => {
          const tooltip = d3.select('#tooltip');
        
          // Mouse coordinates
          const mouseX = event.pageX;
          const mouseY = event.pageY;
        
          // Window and tooltip size
          const tooltipWidth = 200; 
          const tooltipHeight = 80;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
        
          // Adjust position to prevent tooltip from going off screen
          const posX = mouseX + tooltipWidth > windowWidth
            ? mouseX - tooltipWidth - 10
            : mouseX + 10;
        
          const posY = mouseY + tooltipHeight > windowHeight
            ? mouseY - tooltipHeight - 10
            : mouseY + 10;
        
          tooltip
            .style('left', `${posX}px`)
            .style('top', `${posY}px`);
        })
        .on('mouseout', () => {
          d3.select('#tooltip').style('display', 'none');
        });
    };

    renderMap();
  }, [travelData]);

  return (
    <div className='map-container'>
      <h1 className="map-title">My Travel Map</h1>
      <svg ref={svgRef} className='map-travel'></svg>
      {/* Tooltip */}
      <div id="tooltip" className='tooltip'></div>
    </div>
  );
};

export default TravelMap;
