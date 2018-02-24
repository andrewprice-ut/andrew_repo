// Step 0: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append an SVG group
var chart = svg.append("g");

// Append a div to the bodyj to create tooltips, assign it a class
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(err, healthData) {
  if (err) throw err;

  healthData.forEach(function(data) {
    data.disabled = +data.disabled;
    data.healthcare = +data.healthcare;
    data.veterans = +data.veterans;
    data.unemployed_percent = +data.unemployed_percent;
    data.binge = +data.binge;
    data.stroke = +data.stroke;
  });

  // Create scale functions
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  var xLinearScale = d3.scaleLinear().range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // These variables store the minimum and maximum values in a column in data.csv
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  // This function identifies the minimum and maximum values in a column in data.csv
  // and assign them to xMin and xMax variables, which will define the axis domain
  function findMinAndMax(dataColumnX) {
    xMin = d3.min(healthData, function(data) {
      return +data[dataColumnX] * -0.01;
    });

    xMax = d3.max(healthData, function(data) {
      return +data[dataColumnX] * 1.1;
    });

    yMin = d3.min(healthData, function(data) {
      return +data[currentAxisLabelY] * -0.01;
    });

    yMax = d3.max(healthData, function(data) {
      return +data[currentAxisLabelY] * 1.1;
    });
  }

  // The default x-axis is 'hair_length'
  // Another axis can be assigned to the variable during an onclick event.
  // This variable is key to the ability to change axis/data column
  var currentAxisLabelX = "disabled";
  var currentAxisLabelY = "healthcare";

  // Call findMinAndMax() with 'hair_length' as default
  findMinAndMax(currentAxisLabelX);
  
  

  // Set the domain of an axis to extend from the min to the max value of the data column
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);

  // Initialize tooltip
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    // Define position
    .offset([80, -60])
    // The html() method allows us to mix JavaScript with HTML in the callback function
    .html(function(data) {
      
      var abbr = data.abbr;
      var health = +data[currentAxisLabelY];
      var healthString;
      var census = +data[currentAxisLabelX];
      var censusString;
      // Tooltip text depends on which axis is active/has been clicked
      if (currentAxisLabelX === "disabled") {
        censusString = "Disabled: ";
      }
      else if (currentAxisLabelX === "veterans") {
        censusString = "Veterans: ";
      }
      else if (currentAxisLabelX === "unemployed_percent") {
        censusString = "Unemployment %: ";
      }
      if (currentAxisLabelY === "healthcare") {
        healthString = "Can't Afford Healthcare: ";
      }
      else if (currentAxisLabelY === "binge") {
        healthString = "Binge Drinkers: ";
      }
      else if (currentAxisLabelY === "stroke") {
        healthString = "Strokes: ";
        
      
    } 
      // else {
      //   bandString = "Had a Stroke: ";
      // }
      return abbr +
        "<br>" +
        censusString + 
        census + "<br>" +
        healthString +
        health;
    });

  // Create tooltip
  chart.call(toolTip);

  chart
    .selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      return xLinearScale(+data[currentAxisLabelX]);
    })
    .attr("cy", function(data, index) {
      return yLinearScale(+data[currentAxisLabelY]);
    })
    .attr("r", "15")
    .attr("fill", "#1E90FF")
    // display tooltip on click
    .on("mouseover", function(data) {
      toolTip.show(data);
    })
    // hide tooltip on mouseout
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  chart
    .selectAll("text") // Note "text", not "circle" or "rect"
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", function(data, index) {
      return xLinearScale(+data[currentAxisLabelX]);
    })
    .attr("y", function(data, index) {
      return yLinearScale(data[currentAxisLabelY]);
    })
    .text(function(data, index) {
      return data.abbr;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    ;
  


  // Append an SVG group for the x-axis, then display the x-axis
  chart
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    // The class name assigned here will be used for transition effects
    .attr("class", "x-axis")
    .call(bottomAxis);

  // Append a group for y-axis, then display it
  chart
    .append("g")
    // .attr("transform", "translate(0," + height + ")")
    // The class name assigned here will be used for transition effects
    .attr("class", "y-axis")
    .call(leftAxis);

  // Append y-axis label
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "y-axis-text inactive")
    .attr("data-axis-name", "healthcare")
    .text("Can't Afford Healthcare");


  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "y-axis-text inactive")
    .attr("data-axis-name", "binge")
    .text("Binge Drinkers");

  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    // This axis label is inactive by default
    .attr("class", "y-axis-text inactive")
    .attr("data-axis-name", "stroke")
    .text("Strokes");

  // Append x-axis labels
  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    // This axis label is active by default
    .attr("class", "x-axis-text inactive")
    .attr("data-axis-name", "disabled")
    .text("Total Disabled");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
    )
    // This axis label is inactive by default
    .attr("class", "x-axis-text inactive")
    .attr("data-axis-name", "veterans")
    .text("Total Veterans");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 60) + ")"
    )
    // This axis label is inactive by default
    .attr("class", "x-axis-text inactive")
    .attr("data-axis-name", "unemployed_percent")
    .text("Unemployed Percent");

  // Change an axis's status from inactive to active when clicked (if it was inactive)
  // Change the status of all active axes to inactive otherwise
  function labelChange(clickedAxisX) {
    d3
      .selectAll(".x-axis-text")
      .filter(".active")
      // An alternative to .attr("class", <className>) method. Used to toggle classes.
      .classed("active", false)
      .classed("inactive", true);

    clickedAxisX.classed("inactive", false).classed("active", true);
  }

  function labelChange(clickedAxisY) {
    d3
      .selectAll(".y-axis-text")
      .filter(".active")
      // An alternative to .attr("class", <className>) method. Used to toggle classes.
      .classed("active", false)
      .classed("inactive", true);

    clickedAxisY.classed("inactive", false).classed("active", true);
  }

  d3.selectAll(".x-axis-text").on("click", function() {
    // Assign a variable to current axis
    var clickedSelectionX = d3.select(this);
    // "true" or "false" based on whether the axis is currently selected
    var isClickedSelectionXInactive = clickedSelectionX.classed("inactive");
    // console.log("this axis is inactive", isClickedSelectionInactive)
    // Grab the data-attribute of the axis and assign it to a variable
    // e.g. if data-axis-name is "poverty," var clickedAxis = "poverty"
    var clickedAxisX = clickedSelectionX.attr("data-axis-name");
    console.log("current axis: ", clickedAxisX);

    // The onclick events below take place only if the x-axis is inactive
    // Clicking on an already active axis will therefore do nothing
    if (isClickedSelectionXInactive) {
      // Assign the clicked axis to the variable currentAxisLabelX
      currentAxisLabelX = clickedAxisX;
      // Call findMinAndMax() to define the min and max domain values.
      findMinAndMax(currentAxisLabelX);
      
      // Set the domain for the x-axis
      xLinearScale.domain([xMin, xMax]);

      // Create a transition effect for the x-axis
      svg
        .select(".x-axis")
        .transition()
        // .ease(d3.easeElastic)
        .duration(1800)
        .call(bottomAxis);
      // Select all circles to create a transition effect, then relocate its horizontal location
      // based on the new axis that was selected/clicked
      d3.selectAll("circle").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("cx", function(data) {
            return xLinearScale(+data[currentAxisLabelX]);
          })
          .duration(1800);
        });

      d3.selectAll("text").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("x", function(data) {
            return xLinearScale(+data[currentAxisLabelX]);
          })
          .duration(1800);
        });

  
        
      // Change the status of the axes. See above for more info on this function.
      labelChange(clickedSelectionX);
    }
  });

  d3.selectAll(".y-axis-text").on("click", function() {
    // Assign a variable to current axis
    var clickedSelectionY = d3.select(this);
    // "true" or "false" based on whether the axis is currently selected
    var isClickedSelectionYInactive = clickedSelectionY.classed("inactive");
    // console.log("this axis is inactive", isClickedSelectionInactive)
    // Grab the data-attribute of the axis and assign it to a variable
    // e.g. if data-axis-name is "poverty," var clickedAxis = "poverty"
    var clickedAxisY = clickedSelectionY.attr("data-axis-name");
    console.log("current axis: ", clickedAxisY);

    // The onclick events below take place only if the x-axis is inactive
    // Clicking on an already active axis will therefore do nothing
    if (isClickedSelectionYInactive) {
      // Assign the clicked axis to the variable currentAxisLabelX
      currentAxisLabelY = clickedAxisY;
      // Call findMinAndMax() to define the min and max domain values.
      findMinAndMax(currentAxisLabelY);
      
      // Set the domain for the x-axis
      yLinearScale.domain([yMin, yMax]);

      // Create a transition effect for the x-axis
      svg
        .select(".y-axis")
        .transition()
        // .ease(d3.easeElastic)
        .duration(1800)
        .call(leftAxis);
      // Select all circles to create a transition effect, then relocate its horizontal location
      // based on the new axis that was selected/clicked
      d3.selectAll("circle").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("cy", function(data) {
            return yLinearScale(+data[currentAxisLabelY]);
          })
          .duration(1800);
        });
      d3.selectAll("text").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("y", function(data) {
            return yLinearScale(+data[currentAxisLabelY]);
          })
          .duration(1800);
        });
  
        
      // Change the status of the axes. See above for more info on this function.
      labelChange(clickedSelectionY);
    }
  });



});
