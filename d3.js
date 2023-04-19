const xSize = 500;
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

const data = [];
for (let i = 0; i < 100; i++) {
  data.push([Math.random() * xMax, Math.random() * yMax]);
}



const svg = d3.select("#randomP")
  .append("svg")
  .append("g")
  .attr("transform","translate(" + margin + "," + margin + ")");


const x = d3.scaleLinear()
  .domain([0, 500])
  .range([0, xMax]);
svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));



const y = d3.scaleLinear()
  .domain([0, 500])
  .range([ yMax, 0]);
svg.append("g")
  .call(d3.axisLeft(y));


svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d[0] } )
  .attr("cy", function (d) { return d[1] } )
  .attr("r", 4)
  .style("fill", "green");








d3.csv("titanic.csv").then(function(data) {
  var AgeD = d3.range(0, 81, 10).map(function(d) {
    return {
      AgeR: d + "-" + (d + 9),
      count: 0
    };
  });


  data.forEach(function(d) {
    var age = +d.Age;
    AgeD.forEach(function(a) {
      var ageR = a.AgeR.split("-").map(Number);
      if (age >= ageR[0] && age < ageR[1]) {
        a.count++;
      }
    });
  });
  

	var r = Math.min(700, 700) / 2;


	var pie = d3.pie()
	  .value(function(d) { 
	  	return d.count; 
	  });

	// Create SVG element
	var svg = d3.select("#pie")

	var pieC = svg.append("g")
	  .attr("transform", "translate(" + (700 / 2) + "," + (700 / 2) + ")");

	var arc = d3.arc()
	  .innerRadius(0)
	  .outerRadius(r);


	// Draw pie slices and labels
	var Slices = pieC.selectAll(".pieSlice")
	    .data(pie(AgeD))
	    .enter()
	    .append("g")
	    .attr("class", "pieSlice");

	  // Define color scale
	var colorArray = ["green", "red", "yellow", "blue", "pink", "orange", "violet", "grey", "brown", "black"];
	var color = d3.scaleOrdinal()
	   .domain(d3.range(0, 10))
	   .range(colorArray);  



	Slices.append("path")
	    .attr("d", arc)
	    .attr("fill", function(d, i) { return color(i); });

	Slices.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    .text(function(d) { return d.data.AgeR + " (" + d.data.count + ")"; });

});

