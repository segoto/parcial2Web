import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const width = 900;
const height = 500;
const margin = { top: 10, left: 50, bottom: 40, right: 10 };
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

const Chart = (props) => {
  
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const svg = d3.select(ref.current);
    svg.attr("width", width);
    svg.attr("height", height);
    draw();
    setLoading(false);
    
  }, [props.pokemons]);
  const draw = () => {
    let max = 0;
    props.pokemons.forEach(element => {
      max = Math.max(max, element.height);
    });
    const svg = d3.select(ref.current);
    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, max]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(props.pokemons.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(props.pokemons);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("height", (d) => iheight - y(d.height))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  };
  return loading? <div>Loading</div> : (
    <div id="chart">
      <svg ref={ref}></svg>
    </div>
  );
};
export default Chart;