import React, { useRef, useEffect } from 'react';
import "./DigitalAnimatorPage.css";
import PortfolioSlider from './PortfolioSlider';
import * as d3 from 'd3'
import CredlyBadgeCard from './CredlyBadgeCard';

const DigitalAnimatorPage = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const data = [
            { software: 'After Effects', value: 40 },
            { software: 'Illustrator', value: 30 },
            { software: 'Photoshop', value: 10 },
            { software: 'Premiere Pro', value: 15 },
            { software: 'Krita', value: 25 },
            { software: 'Inkscape', value: 20 }
        ];

        const colors = [
            '#00FFFF', // Cyan
            '#FF00FF', // Magenta
            '#00FF00', // Neon Green
            '#FF4500', // Bright Orange
            '#8A2BE2', // Violet Blue
            '#FFFF00', // Yellow
            '#1E90FF', // Neon Blue
            '#FF1493', // Hot Pink
            '#ADFF2F', // Bright Green
            '#FFD700', // Gold
            '#FF6347' // Bright Red
        ];

        //Extend palette if more skills are added
        if (data.length > colors.length) {
            for (let i = colors.length; i < data.length; i++) {
                colors.push(d3.interpolateTurbo(i / data.length));
            }
        }

        //Chart size and radius
        const margin = { top: 20, right: 20, bottom: 40, left: 150 };
        const width = 800 - margin.left - margin.right; //Width SVG container
        const height = 400 - margin.top - margin.bottom; //Height SVG container

        //d3.select('#chart').html('')
        svg.attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        //SVG container
        /*const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")"); //center the chart*/

        //Bars scale
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(data.map(d => d.software))
            .range([0, height])
            .padding(0.1);

        //Axis
        const xAxis = d3.axisBottom(x).ticks(5);
        const yAxis = d3.axisLeft(y);

        //Add bars
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.software))
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth());

        // Add X axis
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add Y axis
        g.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        /*//Color scale for the chart segments
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.skill))
            .range(colors);*/

    }, []);
    return (
        <div className='digitalanimator-container'>
            <section className="home-slider">
                <div className="portfolio-content">
                    <PortfolioSlider />
                </div>
            </section>
            {/*<div id='chart'></div>*/}
            <svg ref={svgRef} className='bar-chart-container'></svg>

            <div style={{ display: "flex", gap: "16px" }}>
                <CredlyBadgeCard
                    url="https://www.credly.com/badges/a82028cf-8799-43d0-8e46-d38a6a79576c/embedded"
                    title="Adobe Certified Professional in Visual Effects & Motion Graphics Using Adobe After Effects"
                    issuer="Adobe"
                    dateIssued="9/6/24"
                    imageUrl="https://images.credly.com/size/340x340/images/0a014772-f2a9-4a94-bb56-2035d0cfdb2c/image.png"
                />
            </div>

        </div>

    );
};

export default DigitalAnimatorPage;