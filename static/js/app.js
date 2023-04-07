// Set globally accessable variable to store the JSON data (later on) AskBCS Learning Assistants/Mark

var data;

// Define the optionChanged function
function optionChanged(newSample) {
  updateCharts(newSample);
}

// Function to update the charts and metadata display for a given sample
function updateCharts(sample) {

  // Get the data for the selected sample
  var sampleData = all_data.samples.find(function (d) {
    return d.id === sample;
  });

  // Create the bar chart
  var barData = [{
    x: sampleData.sample_values.slice(0, 10).reverse(),
    y: sampleData.otu_ids.slice(0, 10).map(function (id) {
      return "OTU " + id;
    }).reverse(),
    text: sampleData.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  }];
  Plotly.newPlot("bar", barData);

  // Create the bubble chart
  var bubbleData = [{
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: "markers",
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: "Earth"
    }
  }];
  var bubbleLayout = {
    xaxis: {
      title: "OTU ID"
    },
    yaxis: {
      title: "Sample Value"
    }
  };
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  // Display the metadata for the selected sample
  var metadata = all_data.metadata.find(function (d) {
    return d.id === parseInt(sample);
  });
  var metadataDisplay = d3.select("#sample-metadata");
  metadataDisplay.html("");
  Object.entries(metadata).forEach(function ([key, value]) {
    metadataDisplay.append("p").text(key + ": " + value);
  });

}

// Load the data from the URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {

  all_data = data;

  // Create the dropdown menu with the sample IDs
  var dropdown = d3.select("#selDataset");
  dropdown.selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    });

  // Initialize the dashboard with the first sample
  var initialSample = data.names[0];
  updateCharts(initialSample);

  // Function to update the charts and metadata display when a new sample is selected
  //function optionChanged(newSample) {
  //updateCharts(newSample);
  //} AskBCS Learning Assistants/Mark, Inside of updateCharts, changed all instances  of data to all_data
  // https://plotly.com/javascript/bubble-charts/
  // https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3


});