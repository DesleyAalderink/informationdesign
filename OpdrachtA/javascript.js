var margin = {top: 20, right: 100, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// laad de data in.
d3.json("data.json", function(error1, dataset) {
  d3.json("line.json", function(error2, datasetLine) {

var barOuterPad = .2 // spacing start en einde van xscale.
var barPad = .2 // spacing tussen de bars.
var xScale = d3.scaleBand().range([0, width], barPad, barOuterPad)
  .domain(dataset.map(function (d) {
      return d.x;
  }));

// alle assen worden aangemaakt, zowel links als rechts.
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){ return d.y; })])
    .range([height, 0])

var yScale0 = d3.scaleLinear()
    .domain([20, d3.max(datasetLine, function(d){ return d.y; })])
    .range([height, 0]);

var ordinal = d3.scaleBand()
    .domain([1,2,3,4,5,6])
    .range([0, d3.max(dataset, function(d) { return d.y })])

var ordinal0 = d3.scaleBand()
    .domain([1,2,3,4,5,6])
    .range([0, d3.max(datasetLine, function(d) { return d.y })])

var xAxis = d3.axisBottom(xScale)
    .tickSizeInner(-height)
    .tickSizeOuter(0)
    .tickPadding(10)

var yAxis = d3.axisLeft(yScale)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(10)
    .tickValues([0.0,0.37,0.74,1.11,1.48,1.87]);


var yAxis0 = d3.axisRight(yScale0)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(10)
    .tickValues([0,7,14,21,28,35.50]);

// de lijn wordt hier
var line = d3.line()
    .x(function(d) { return xScale(d.x) + xScale.bandwidth()/2; })
    .y(function(d) { return yScale0(d.y); });


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right + 70)
    .attr("height", height + margin.top + margin.bottom + 70)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Per 1000 duizend inwoners");

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + " ,0)")
      .call(yAxis0)


var line = svg.append("path")
      .data([datasetLine])
      .attr("class", "line")
	     .attr("id", "gescheidenAxis")
      .attr("d", line);


// Zet de tekst erin om de gescheiden lijn weg te halen.
svg.append("text")
	.attr("x", 0)
	.attr("y", height + margin.top + 20)
	.attr("class", "legend")
	.on("click", function(){
		// Determine if current line is visible
		var active   = gescheidenAxis.active ? false : true,
		  newOpacity = active ? 0 : 1;
		// Hide or show the elements
		d3.select("#line").style("opacity", newOpacity);
		d3.select("#gescheidenAxis").style("opacity", newOpacity);
		// Update whether or not the elements are active
		gescheidenAxis.active = active;
	})
	.text("Gescheiden lijn weghalen/toevoegen")
	.attr("y", height + margin.bottom + 30)


// bars worden aangemaakt
var bar = svg.selectAll('rect')
    .data(dataset)
    .enter()

  var barRect = bar.append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return xScale(d.x) + 8;
    })

    .attr('y', function (d) {
      return yScale(d.y);
    })
    .attr('width', xScale.bandwidth())
        .style("width", "50px")
    .attr('height', function(d) {
      return height - yScale(d.y)
    })

  // animatie van de laatste grafiek zowel de bars als de lijn
  function initAnimation() {

    var duration = 2000;
    var delay = function(d, i) { return i * 50; };
    var totalLength = line.node().getTotalLength();

    barRect.attr('height', 0)
           .attr('y', height);

    barRect.transition()
    .delay(delay)
    .duration(duration /2)
    .attr('height', function(d) {
      return height - yScale(d.y);
    })
    .attr('y', function (d) {
      return yScale(d.y);
    });

   line
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
  }
  initAnimation();

});
});

// variabele en assen worden aangemaakt voor de grouped bars

var svg1 = d3.select("#geslacht"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg1.attr("width") - margin.left - margin.right,
    height = +svg1.attr("height") - margin.top - margin.bottom,
    g = svg1.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("data.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x0.domain(data.map(function(d) { return d.jaar; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.jaar) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      // er wordt een tooltip toegevoegd om de waarden te kunnen zien van de bars
      .on("mouseover", function(d) {
        var xpos = event.clientX;
        var ypos = event.clientY;
				var tooltip = d3.select("#tooltip")
						.style("left", xpos + "px")
						.style("top", ypos + "px")

            console.log( d );

        tooltip.select("#name")
            .text(d.key)

				tooltip.select("#value")
						.text(d.value)


					d3.select("#tooltip").classed("hidden", false);
			   })
			   .on("mouseout", function() {
				  d3.select("#tooltip").classed("hidden", true);
        })
          d3.select("#tooltip")
            .select("#tekst")
            .text(function(d){return d;});

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Per 1000 duizend inwoners");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});

// De tweede grouped bar wordt hier aangemaakt.

var svg2 = d3.select("#leeftijd"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg2.attr("width") - margin.left - margin.right,
    height = +svg2.attr("height") - margin.top - margin.bottom,
    g2 = svg2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x3 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x2 = d3.scaleBand()
    .padding(0.05);

var y2 = d3.scaleLinear()
    .rangeRound([height, 0]);

var z2 = d3.scaleOrdinal()
    .range(["#C6D2E2", "#98abc5", "#6981A3", "#425F87", "#28456E", "#102C52", "#677FA2"]);

d3.csv("leeftijden.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, dataleeftijd) {
  if (error) throw error;

  var keys = dataleeftijd.columns.slice(1);

  x3.domain(dataleeftijd.map(function(d) { return d.jaar; }));
  x2.domain(keys).rangeRound([0, x0.bandwidth()]);
  y2.domain([0, d3.max(dataleeftijd, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g2.append("g")
    .selectAll("g")
    .data(dataleeftijd)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x3(d.jaar) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x2(d.key); })
      .attr("y", function(d) { return y2(d.value); })
      .attr("width", x2.bandwidth())
      .attr("height", function(d) { return height - y2(d.value); })
      .attr("fill", function(d) { return z2(d.key); })
      .on("mouseover", function(d) {
        var xpos = event.clientX;
        var ypos = event.clientY;
        var tooltip = d3.select("#tooltip")
            .style("left", xpos + "px")
            .style("top", ypos + "px")

            console.log( d );

        tooltip.select("#name")
            .text(d.key)

        tooltip.select("#value")
            .text(d.value)


          d3.select("#tooltip").classed("hidden", false);
         })
         .on("mouseout", function() {
          d3.select("#tooltip").classed("hidden", true);
        })
          d3.select("#tooltip")
            .select("#tekst")
            .text(function(d){return d;});

  g2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x3));

  g2.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y2).ticks(null, "s"))
    .append("text")
      .attr("x3", 2)
      .attr("y2", y2(y2.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Per 1000 duizend inwoners");

  var legend2 = g2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend2.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z2);

  legend2.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
