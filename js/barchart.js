/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your bar charts in this file


// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;


// TODO: What does this code do?
// add an svg to build within using deminsions set above
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

d3.csv("data/barchart.csv").then((data) => {

// finds the max score from data1
let maxY2 = d3.max(data2, function(d) { return d.score; });

// The scale functions map data values (domain) to pixel values (range)
// linear because we have linear data
// This is mapping the score to pixel values
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]);

// The scale band function splits the range into n bands where n is the
// the number values in the domain array
// scale band since there are categorical values
let xScale2 = d3.scaleBand()
            .domain(d3.range(data2.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

// adds y axis to svg1 and move axis inside of left margin
// axisLeft is a built in function to create left axis given a scale function
// (vertical axis scale)
// fint size is 20px
svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale2))
    .attr("font-size", '20px');

    // adds x axis to svg1 and move axis to bottom of svg
    // axisBotton is a built in function to create bottom axis given a scale function (bottom axis scale)
    // at each tick pull iut the name and use that to label the bar
    // fint size is 20px
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale2)
                .tickFormat(i => data2[i].name))
        .attr("font-size", '20px');

    /*

      Tooltip Set-up

    */

    // TODO: What does each line of this code do?
    // selecting hard codded bad appending a div and giving it the id tooltip
    // setting the opacity to 0 and class to tooltip
    const tooltip2 = d3.select("#csv-bar")
                    .append("div")
                    .attr('id', "tooltip2")
                    .style("opacity", 0)
                    .attr("class", "tooltip");

    // TODO: What does each line of this code do?
    // takes tool tip we just created
    // set the innerhtml to be name and name of data were hovering over socre and the score of socre we're hovering over
    // changes the opcacity from 0 to 1
    const mouseover2 = function(event, d) {
      tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
              .style("opacity", 1);
    }

    // TODO: What does each line of this code do?
    // set the position to be equal to event x(where our mouse is)
    // and event y (where our mouse is) + a little bit of an offset
    const mousemove2 = function(event, d) {
      tooltip2.style("left", (event.x)+"px")
              .style("top", (event.y + yTooltipOffset) +"px");
    }

    // TODO: What does this code do?
    // when the mouse leaves a bar it's not on top of it anymore
    // and sets the opacity to 0
    const mouseleave2 = function(event, d) {
      tooltip2.style("opacity", 0);
    }

    /*

      Bars

    */

    // TODO: What does each line of this code do?

    svg2.selectAll(".bar") // look at svg1 and select anything with the class bar
        .data(data2) // finds our data
        .enter() // makes a placeholder
        .append("rect") // appends a rectangle for svg1 for each of those place holders
          .attr("class", "bar") // adds the bar class
          .attr("x", (d,i) => xScale2(i)) // scales all the x-values
          .attr("y", (d) => yScale2(d.score)) // scales all the y-values
          .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) // set height and width for bars
          .attr("width", xScale2.bandwidth()) // automatically sets the thickness of the bars
          .on("mouseover", mouseover2) // adds event listener to each bar corresponding event handler
          .on("mousemove", mousemove2) // adds event listener to each bar corresponding event handler
          .on("mouseleave", mouseleave2); // adds event listener to each bar corresponding event handler

});

/*

  Axes

*/

// TODO: What does this code do?
// finds the max score from data1
let maxY1 = d3.max(data1, function(d) { return d.score; });


// TODO: What does each line of this code do?
// The scale functions map data values (domain) to pixel values (range)
// linear because we have linear data
// This is mapping the score to pixel values
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]);

// TODO: What does each line of this code do?
// The scale band function splits the range into n bands where n is the
// the number values in the domain array
// scale band since there are categorical values
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

// TODO: What does each line of this code do?
// adds y axis to svg1 and move axis inside of left margin
// axisLeft is a built in function to create left axis given a scale function
// (vertical axis scale)
// fint size is 20px
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1))
   .attr("font-size", '20px');

// TODO: What does each line of this code do?
// adds x axis to svg1 and move axis to bottom of svg
// axisBotton is a built in function to create bottom axis given a scale function (bottom axis scale)
// at each tick pull iut the name and use that to label the bar
// fint size is 20px
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1)
            .tickFormat(i => data1[i].name))
    .attr("font-size", '20px');

/*

  Tooltip Set-up

*/

// TODO: What does each line of this code do?
// selecting hard codded bad appending a div and giving it the id tooltip
// setting the opacity to 0 and class to tooltip
const tooltip1 = d3.select("#hard-coded-bar")
                .append("div")
                .attr('id', "tooltip1")
                .style("opacity", 0)
                .attr("class", "tooltip");

// TODO: What does each line of this code do?
// takes tool tip we just created
// set the innerhtml to be name and name of data were hovering over socre and the score of socre we're hovering over
// changes the opcacity from 0 to 1
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1);
}

// TODO: What does each line of this code do?
// set the position to be equal to event x(where our mouse is)
// and event y (where our mouse is) + a little bit of an offset
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px")
          .style("top", (event.y + yTooltipOffset) +"px");
}

// TODO: What does this code do?
// when the mouse leaves a bar it's not on top of it anymore
// and sets the opacity to 0
const mouseleave1 = function(event, d) {
  tooltip1.style("opacity", 0);
}

/*

  Bars

*/

// TODO: What does each line of this code do?

svg1.selectAll(".bar") // look at svg1 and select anything with the class bar
   .data(data1) // finds our data
   .enter() // makes a placeholder
   .append("rect") // appends a rectangle for svg1 for each of those place holders
     .attr("class", "bar") // adds the bar class
     .attr("x", (d,i) => xScale1(i)) // scales all the x-values
     .attr("y", (d) => yScale1(d.score)) // scales all the y-values
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // set height and width for bars
     .attr("width", xScale1.bandwidth()) // automatically sets the thickness of the bars
     .on("mouseover", mouseover1) // adds event listener to each bar corresponding event handler
     .on("mousemove", mousemove1) // adds event listener to each bar corresponding event handler
     .on("mouseleave", mouseleave1); // adds event listener to each bar corresponding event handler
