// Assignment Two (02.526 Interactive Data Visualisation)


// console.log("Hello")


let data = [
    { student: "7 Y.O. to 19 Y.O.", score: 18.07 },
    { student: "19 Y.O. to 21 Y.O.", score: 69.20 },
    { student: "Above 21 Y.O.",score: 12.63 },
];

let data2 = [
    {student: "Cheating & Related", score: 62.25},
    {student: "Murder", score: 0.15},
    {student: "Outrage of Modesty", score: 21.79},
    {student: "Rape", score: 2.96},
    {student: "Rioting", score: 3.00},
    {student: "Robbery", score: 2.39},
    {student: "Serious Hurt", score: 5.70},
    {student: "Snatch Theft", score: 1.76},

];

let data3 = [
    {student: "Year 2011", score: 7.71},
    {student: "Year 2012", score: 7.01},
    {student: "Year 2013", score: 7.29},
    {student: "Year 2014", score: 9.29},
    {student: "Year 2015", score: 12.39},
    {student: "Year 2016", score: 12.04},
    {student: "Year 2017", score: 12.46},
    {student: "Year 2018", score: 13.82},
    {student: "Year 2019", score: 18.00},
];

let margin = {top: 10, right: 50, bottom: 20, left: 50}
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let chart = d3.select("#chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add scales
let xScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.student; }))
    .rangeRound([0, width])
    .padding(0.1);

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([height, 0]);

// Add x-axis
chart.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

// Add y-axis
chart.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(yScale).ticks(50)); //steps of 5
    
//Sample enter, update and exit loop
function drawChart(dataSet) {
    //xScale domain needs to change based on data set
    xScale.domain(dataSet.map(function(d) { return d.student; }));
    chart.select("g .axis-x")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(xScale));

    chart.selectAll("rect")
        .data(dataSet)
        .join(
        enter => enter
            .append("rect")
            .attr("x", d => xScale(d.student))
            .attr("y", d => yScale(d.score))
            .attr("width", 0)
            .attr("height", 0)
            .attr("class", "svgRect")
          .call(enter => enter.transition()
            .duration(1000)
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.score))
           ),
        update => update 
          .call(update => update.transition()
            .duration(1000)
            .attr("x", d => xScale(d.student))
            .attr("y", d => yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.score))
           ),
        exit => exit
          .call(exit => exit.transition()
            .duration(1000)
            .attr("width", 0)
            .attr("height", 0)
            .remove()
           )
        );
}

d3.select("#bt1").on("click", function() {
    drawChart(data);
});

d3.select("#bt2").on("click", function() {
    drawChart(data2);
});

d3.select("#bt3").on("click", function() {
    drawChart(data3);
});

drawChart(data);