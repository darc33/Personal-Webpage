import React, { useEffect } from 'react';
import "./EngineerPage.css";
import * as d3 from 'd3'
import CredlyBadgeCard from './CredlyBadgeCard';

const EngineerPage = () => {
    useEffect(() => {
        //Data for the chart
        const data = [
            { skill: 'Python', value: 20 },
            { skill: 'C#', value: 15 },
            { skill: 'C++', value: 8 },
            { skill: 'Assembler', value: 5 },
            { skill: 'HTML', value: 15 },
            { skill: 'Ruby', value: 10 },
            { skill: 'React', value: 16 },
            { skill: 'Node.js', value: 11 },
            { skill: 'JavaScript', value: 10 },
            { skill: 'Ruby on Rails', value: 10 },
            { skill: 'PHP', value: 8 },
            { skill: 'Laravel', value: 8 }
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
        const totalValue = data.reduce((sum, d) => sum + d.value, 0);
        const width = 700; //Width SVG container
        const height = 700; //Height SVG container
        const radius = Math.min(width, height) / 2 - 100 //Radius of the pie chart 
        const innerRadius = radius - 130;

        d3.select('#chart').html('')

        //SVG container
        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`); //center the chart

        //Color scale for the chart segments
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.skill))
            .range(colors);

        // Define the arc generator to create the chart slices
        const arc = d3.arc()
            .outerRadius(radius)  // Outer radius of the pie chart
            .innerRadius(innerRadius);  // Inner radius (for doughnut effect)

        // Define the pie chart generator
        const pie = d3.pie()
            .sort(null)  // Don't sort the data
            .value(d => d.value);  // Use the 'value' property for each skill

        // Create the arcs (pie slices) for the chart
        const arcs = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        console.log(arcs);

        // Add the pie chart slices (paths)
        arcs.append('path')
            .attr('d', arc)  // Generate the slice paths
            .attr('fill', d => color(d.data.skill))  // Color each slice based on the skill
            .attr('stroke', 'white')  // Add a white border around each slice
            .attr('stroke-width', 1)  // Set the stroke width
            .style('transition', 'all 0.3s ease')  // Add smooth transition for hover effects
            .each(function (d, i) {
                if (['React', 'Python'].includes(d.data.skill)) {
                    const dist = 15;
                    const [x, y] = arc.centroid(d)
                    d3.select(this).attr('transform', `translate(${x * dist / radius}, ${y * dist / radius})`);

                }
            })
            //add hover effects for interactivity
            .on('mouseover', function (event, d) {
                const [x, y] = arc.centroid(d);
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('transform', 'scale(1.1)');  // Slightly scale up the slice on hover

                const percentage = ((d.data.value / totalValue) * 100).toFixed(1);

                svg.append('line')
                    .attr('class', 'hover-line')
                    .attr('x1', x)
                    .attr('y1', y)
                    .attr('x2', x * 1.5)
                    .attr('y2', y * 1.5)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 1);

                svg.append('text')
                    .attr('class', 'hover-text')
                    .attr('x', x * 1.6)
                    .attr('y', y * 1.6)
                    .attr('text-anchor', x > 0 ? 'start' : 'end')
                    .style('font-size', '12px')
                    .style('fill', 'white') // Set text color
                    .text(`${percentage}`);
            })
            .on('mouseout', function () {
                d3.select(this).transition().duration(200)
                    .attr('transform', 'translate(0,0)');

                svg.select('.hover-line').remove();
                svg.select('.hover-text').remove();
            });

        // Add text labels for each slice
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)  // Position labels at the center of each slice
            .attr('dy', '.35em')  // Vertical alignment for the labels
            .text(d => d.data.skill)  // Display the skill name on each slice
            .attr('text-anchor', 'middle')  // Center the text
            .style('font-size', '12px')
            .style('fill', 'white');  // Set text color


    }, []);

    const badges = [
        {
            url: "https://www.credly.com/badges/c1380fe2-50fd-42e2-a07e-3d99d196a2e7",
            title: "AWS Educate Getting Started with Storage",
            issuer: "Amazon Web Services Training and Certification",
            dateIssued: "7/19/23",
            imageUrl: "https://images.credly.com/size/340x340/images/0a014772-f2a9-4a94-bb56-2035d0cfdb2c/image.png",
        },
        {
            url: "https://www.credly.com/badges/687dfd1b-e36c-419a-9dde-0e68f048ac2e",
            title: "AWS Educate Introduction to Cloud 101",
            issuer: "Amazon Web Services Training and Certification",
            dateIssued: "7/19/23",
            imageUrl: "https://images.credly.com/size/340x340/images/sample-image-2.png",
        },
        {
            url: "https://www.credly.com/badges/a1a339c5-3c4b-40ab-8049-799a73b92525",
            title: "AWS Educate Getting Started with Networking",
            issuer: "Amazon Web Services Training and Certification",
            dateIssued: "7/25/23",
            imageUrl: "https://images.credly.com/size/340x340/images/sample-image-3.png",
        },
        {
            url: "https://www.credly.com/badges/99cb02f7-fdd8-4d91-aecc-79ab23b29dc6",
            title: "AWS Educate Getting Started with Compute",
            issuer: "Amazon Web Services Training and Certification",
            dateIssued: "7/25/23",
            imageUrl: "https://images.credly.com/size/340x340/images/sample-image-4.png",
        },
    ];

    return (
        <div className='engineer-container'>
            <div id='chart'></div>
            <div className="github-container">
                <img height={290} align="center" src='https://github-readme-stats.vercel.app/api?username=darc33&show_icons=true&rank_icon=github&include_all_commits=true&card_width=290&theme=radical' alt='Github stats' />
                <img align="center" src='https://github-readme-stats.vercel.app/api/top-langs/?username=darc33&size_weight=0.5&count_weight=0.5&langs_count=20&layout=compact&card_width=390&theme=radical' alt='Github top langs' />

            </div>
            <div className="badges-container">
                {badges.map((badge, index) => (
                    <CredlyBadgeCard
                        key={index}
                        url={badge.url}
                        title={badge.title}
                        issuer={badge.issuer}
                        dateIssued={badge.dateIssued}
                        imageUrl={badge.imageUrl}
                    />
                ))}
            </div>
        </div>

    );
};

export default EngineerPage;