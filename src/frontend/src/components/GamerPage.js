import React, { useEffect, useState } from 'react';
import "./GamerPage.css";
import * as d3 from "d3";
import GamesHighlights from './GamesHighlights';


const GamerPage = () => {
    const [gameslist, setGameslist] = useState(null);
    const [loading, setLoading] = useState(true);

    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games/');
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                setGameslist(result);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //if (loading) return <div>Loading...</div>;
    //if (error) return <div>{error}</div>;

    useEffect(() => {
        const fetchAchievements = async () => {
            const appId = '1599340'; // Reemplaza con el ID del juego que deseas consultar

            try {
                const response = await fetch(
                    'http://localhost:5000/steam-achievements'
                );
                console.log('respuesta', response);
                const data = await response.json();
                console.log('data:', data);
                if (data && data.playerstats && data.playerstats.achievements) {
                    setAchievements(data.playerstats.achievements);
                } else {
                    setError('No se encontraron logros.');
                }
            } catch (err) {
                setError('Hubo un error al obtener los logros.');
                console.error(err);
            }
        };

        fetchAchievements();
    }, []);

    useEffect(() => {
        // Constants for margin and dimensions
        const margin = { top: 20, right: 10, bottom: 10, left: 10 };
        const width_base = 800;
        const height_base = 600;
        const width = width_base - margin.left - margin.right;
        const height = height_base - margin.top - margin.bottom;

        // Define futuristic colors for genres
        const genreColors = {
            Action: "#00FFFF", // Cyan
            RPG: "#39FF14",    // Green neon
            Adventure: "#FF1493", // Pink neon
            Shooter: "#8A2BE2" // Purple neon
        };

        // Load data from JSON file
        d3.json("/data/gamesData.json").then((data) => {

            // Agrupar por género y plataforma utilizando d3.group()
            const groupedData = d3.group(data, d => d.genre, d => d.platform);

            // Compute the root hierarchy using genres, platforms, and time played
            const hierarchyData = Array.from(groupedData, ([genre, platforms]) => ({
                name: genre,
                children: Array.from(platforms, ([platform, games]) => ({
                    name: platform,
                    children: games
                }))
            }));

            const root = d3.hierarchy({ name: "root", children: hierarchyData })
                .sum(d => d.timePlayed) // Usar el tiempo jugado como valor
                .sort((a, b) => b.value - a.value);

            const leaves = root.leaves();

            /*leaves.forEach((leaf, i) => {
                console.log(`Leaf ${i}:`, leaf.data); // Inspeccionar cada nodo hoja
                console.log(`  Name: ${leaf.data.name}`);
                console.log(`  Platform: ${leaf.data.platform}`);
                console.log(`  Genre: ${leaf.data.genre}`);
                console.log(`  Time Played: ${leaf.data.timePlayed}`);
            });*/

            // Apply the squarify treemap layout
            d3.treemap()
                .size([width, height])
                .padding(2)
                .round(true)(root);

            // Clear any existing SVG content before rendering new treemap
            d3.select("#treemap-chart").selectAll("*").remove();

            // Create SVG container inside the 'treemap-chart' div
            const svg = d3.select("#treemap-chart")
                .append("svg")
                .attr("nameClass", "treemap-svg")
                .attr("viewBox", `0 0 ${width_base * 1.14} ${height_base * 1.14}`)
                //.attr("width", width_base)
                //.attr("height", height_base)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            //.attr("transform", "scale(0.9)");

            // Append rectangles for each node
            const nodes = svg.selectAll("g")
                .data(leaves)
                .enter().append("g")
                .attr("transform", d => `translate(${d.x0},${d.y0})`);

            /*nodes.each((d, i) => {
                console.log(`Node ${i} data:`, d.data); // Inspeccionar datos en cada nodo
            });*/

            // Draw rectangles for each game
            nodes.append("rect")
                .attr("id", d => d.data?.name || `unknown-${d.index}`)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", d => genreColors[d.data?.genre || "Unknown"])
                .attr("stroke", "#FFFFFF");

            // Add tooltips for details on hover
            nodes.append("title")
                .text(d => {
                    return `Game: ${d.data?.name || "Unknown"}
Platform: ${d.data?.platform || "Unknown"}
Genre: ${d.data?.genre || "Unknown"}
Time Played: ${d.data?.timePlayed || 0} hrs`;
                });
            // Append labels inside rectangles
            nodes.append("text")
                .attr("x", 5)
                .attr("y", 15)
                .attr("pointer-events", "none")
                .attr("dy", ".35em") // Adjust vertical alignment
                //.attr("text-anchor", "middle") // Center the text
                .style("fill", "#FFFFFF") // White text color
                .style("font-family", "Arial, sans-serif") // Modern font
                .style("font-size", "14px") // Font size
                .style("font-weight", "bold") // Bold text
                .style("text-shadow", "0px 0px 10px rgba(0, 255, 255, 0.8)") // Neon glow effect
                .each(function (d) {
                    const rectWidth = d.x1 - d.x0; // Calculate the rectangle's width
                    const maxLineLength = Math.floor(rectWidth / 7); // Estimate max characters per line
                    const words = d.data?.name.split(" ") || ["Unknown"]; // Split text into words
                    let line = "";
                    let lines = [];

                    words.forEach(word => {
                        if ((line + word).length <= maxLineLength) {
                            line += `${word} `;
                        } else {
                            lines.push(line.trim());
                            line = `${word} `;
                        }
                    });
                    lines.push(line.trim()); // Add the last line

                    // Append lines as individual tspan elements
                    const textElement = d3.select(this);
                    lines.forEach((line, i) => {
                        textElement.append("tspan")
                            .attr("x", 5) // Align to rectangle
                            .attr("y", 15 + i * 20) // Adjust vertical space for each line
                            .text(line);
                    });
                });

            // Add a legend for genres
            const legend = svg.append("g")
                .attr("transform", `translate(${width + 20}, 20)`);

            // Add legend items
            const legendItems = legend.selectAll("g")
                .data(Object.keys(genreColors))
                .enter().append("g")
                .attr("transform", (d, i) => `translate(0, ${i * 25})`);

            // Add colored rectangles for each genre
            legendItems.append("rect")
                .attr("width", 20)
                .attr("height", 20)
                .attr("stroke", "#FFFFFF")
                .attr("fill", d => genreColors[d]);

            // Add text labels for each genre
            legendItems.append("text")
                .attr("x", 25)
                .attr("y", 15)
                .text(d => d)
                .attr("font-size", "14px")
                .style("font-family", "Arial, sans-serif") // Modern font
                .attr("fill", "#fff");

        }).catch(error => {
            console.error("Error loading or processing data:", error);
        });
    }, []);
    return (
        <div className='gamer-container'>
            {/*<h1>Engineer</h1>*/}
            <div id='treemap-chart'></div>
            <div>
                <h2>Logros de Steam</h2>
                {error && <p>{error}</p>}
                <ul>
                    {achievements.map((achievement) => (
                        <li key={achievement.name}>
                            <p>{achievement.name}</p>
                            <p>{achievement.achieved ? 'Desbloqueado' : 'No Desbloqueado'}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
            <h1>Highlights</h1>
            {gameslist && <GamesHighlights data={gameslist} />}
        </div>
        </div>

    );
};

export default GamerPage;