import React, { useEffect, useState } from 'react';
import "./GamerPage.css";
import * as d3 from "d3";
import GamesHighlights from './GamesHighlights';


const GamerPage = () => {
    const [gameslist, setGameslist] = useState(null);
    const [totalGameList, settotalGameList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games/');
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                setGameslist(result);
                settotalGameList(result.gamesList);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Constants for margin and dimensions
        const margin = { top: 20, right: 10, bottom: 10, left: 10 };
        const width_base = 800;
        const height_base = 600;
        const width = width_base - margin.left - margin.right - 80;
        const height = height_base - margin.top - margin.bottom;

        function sanitizeID(name) {
            return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
        }

        // Function to normalize genre names
        function normalizeGenre(genre) {
            return genre.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "_");
        }

        // Function to get the color of a game with multiple genres
        function getGenreColor(genres) {
            const genreList = genres.split(",").map(g => normalizeGenre(g.trim())); // Divide and normalize
            for (const genre of genreList) {
                if (genreColors[genre]) {
                    return genreColors[genre]; // Returns the color of the first known gender
                }
            }
            return "#CCCCCC";
        }

        // Function to format the legend text
        function formatLegendText(text) {
            return text
                .replace(/_/g, " ") // Replace "_" with spaces
                .replace(/\band\b/g, "&") // Replace "and" with "&"
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Convert the first letter of each word to uppercase
        }

        // Define futuristic colors for genres
        const genreColors = {
            action: "#00BFFF", // Deep sky blue
            adventure: "#FF6347", // Tomato red
            arcade: "#FF4500", // Orange red
            card_game: "#8A2BE2", // Blue violet
            casino: "#32CD32", // Lime green
            drama: "#B22222", // Firebrick red
            driving: "#FFD700", // Gold
            fight: "#C71585", // Medium violet red
            flight: "#D3D3D3",
            fps: "#1E90FF", // Dodger blue
            graphic: "#A52A2A", // Brown
            hack_and_slash: "#FF1493", // Deep pink
            horror: "#8B0000", // Dark red
            metroidvania: "#7FFF00", // Chartreuse
            mmorpg: "#00FA9A", // Medium spring green
            moba: "#9400D3", // Dark violet
            open_world: "#00FF7F", // Spring green
            party: "#FF1493", // Neon pink
            pinball: "#ADFF2F", // Green yellow
            platformer: "#FF69B4", // Hot pink
            puzzle: "#FF4500", // Orange red
            racing: "#7CFC00", // Lawn green
            real_time: "#8B008B", // Dark magenta
            rhythm: "#32CD32", // Lime green
            rpg: "#00FF00",    // Neon green
            run_and_gun: "#8B0000", // Dark red
            sandbox: "#C0C0C0", // Silver
            shooter: "#FF00FF", // Magenta
            simulation: "#F4A300", // Dark orange
            sports: "#00FFFF", // Aqua
            stealth: "#696969", // Dim gray
            strategy: "#B0E0E6", // Powder blue
            survival: "#D2691E", // Chocolate
            text: "#C71585", // Medium violet red
            third_person: "#9932CC", // Dark orchid
            tower_defense: "#FF6347", // Tomato red
            turn_based: "#DC143C", // Crimson
            visual_novel: "#7FFF00" // Chartreuse
        };

        const itemsPerColumn = 22;
        /*const itemsPerRow = 7;
        const legendStartY = height + 20; // Space between treemap and legend
        const legendStartX = 20; // Left margin*/
        const totalGameList2 = totalGameList.map(game => {
            // Take only the first gender (the first value in the gender list)
            const firstGenre = game.genre.split(",")[0].trim();

            // Return the game with the first normalized gender
            return {
                ...game,
                genre: normalizeGenre(firstGenre)  // Normalize the first gender
            };
        });

        // Load data from JSON file
        d3.json("/data/gamesData.json").then((data) => {

            // Group by gender and platform using d3.group()
            const groupedData = d3.group(totalGameList2, d => d.genre, d => d.platform);

            // Compute the root hierarchy using genres, platforms, and time played
            const hierarchyData = Array.from(groupedData, ([genre, platforms]) => ({
                name: genre,
                children: Array.from(platforms, ([platform, games]) => ({
                    name: platform,
                    children: games
                }))
            }));

            const root = d3.hierarchy({ name: "root", children: hierarchyData })
                .sum(d => d.timePlayed) // Use the time played as a value
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

            nodes.append("clipPath")
                .attr("id", d => `clip-${sanitizeID(d.data?.name || `unknown-${d.index}`)}`)
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);

            /*nodes.each((d, i) => {
                console.log(`Node ${i} data:`, d.data); // Inspeccionar datos en cada nodo
            });*/

            // Draw rectangles for each game
            nodes.append("rect")
                .attr("id", d => sanitizeID(d.data?.name || `unknown-${d.index}`))
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", d => {
                    const genres = d.data?.genre || "unknown";
                    return getGenreColor(genres);
                })
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
                .attr("x", 4)
                .attr("y", 10)
                .attr("pointer-events", "none")
                .attr("dy", ".35em") // Adjust vertical alignment
                //.attr("text-anchor", "middle") // Center the text
                .style("fill", "#FFFFFF")
                .style("font-family", "Arial, sans-serif")
                .style("font-size", "10px")
                .style("font-weight", "bold")
                .style("text-shadow", "0px 0px 10px rgba(0, 255, 255, 0.8)")
                .attr("clip-path", d => `url(#clip-${sanitizeID(d.data?.name || `unknown-${d.index}`)})`)
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
                            if (line.trim().length > 0) { // Avoid adding empty lines
                                lines.push(line.trim());
                            }
                            line = `${word} `;
                        }
                    });
                    /*if (line.trim().length > 0) { // Add the last line if it is not empty
                        lines.push(line.trim());
                    }*/
                    lines.push(line.trim()); // Add the last line

                    // Append lines as individual tspan elements
                    const textElement = d3.select(this);
                    lines.forEach((line, i) => {
                        textElement.append("tspan")
                            .attr("x", 4) // Align to rectangle
                            .attr("y", 10 + i * 15) // Adjust vertical space for each line
                            .text(line);
                    });
                });

            // Add a legend for genres
            const legend = svg.append("g")
                .attr("transform", `translate(${width + 20}, 20)`);//`translate(${legendStartX}, ${legendStartY})`);//`translate(${width + 20}, 20)`);

            // Add legend items
            const legendItems = legend.selectAll("g")
                .data(Object.keys(genreColors))
                .enter().append("g")
                .attr("transform", (d, i) => {
                    const column = Math.floor(i / itemsPerColumn); // Calculate the column
                    const row = i % itemsPerColumn; // Calculate the row within the column
                    return `translate(${column * 90}, ${row * 25})`; // Adjust the space between columns
                });//`translate(0, ${i * 25})`);

            // Add colored rectangles for each genre
            legendItems.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("stroke", "#FFFFFF")
                .attr("fill", d => genreColors[d]);

            // Add text labels for each genre
            legendItems.append("text")
                .attr("x", 25)
                .attr("y", 12)
                .text(d => formatLegendText(d))
                .attr("font-size", "10px")
                .style("font-family", "Arial, sans-serif")
                .attr("fill", "#fff");

        }).catch(error => {
            console.error("Error loading or processing data:", error);
        });
    }, [totalGameList]);
    return (
        <div className='gamer-container'>
            <div id='treemap-chart'></div>
            <div className="gamer-highlights">
                <h1>Highlights</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {gameslist && <GamesHighlights data={gameslist} />}
            </div>
        </div>

    );
};

export default GamerPage;