function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaArray = meta.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaResult = metaArray[0];
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids
    var otuLabels = result.otu_labels
    var sampleValues = result.sample_values

    // 3. Create a variable that holds the washing frequency.
    var washingFrequency =

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
     var trace1 = {
      x: sampleValues.slice(0,10).reverse()
      y: otuIds.slice(0,10).reverse().map(ids => ids.results)
      //y: otuIds.slice(0,10).reverse().map(otuIds => otuIds.results)
      text: otuLabels.slice(0,10).reverse
    }

    var yticks = {
      y: otu_ids,
    };

    // 8. Create the trace for the bar chart. 
    var barData = [trace1];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
  title: "Top Ten OTU IDs",
  xaxis: { title: "Sample Values" },
  yaxis: { title: "Population Growth, 2016-2017" 
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, layout);
  });    
  
  // 1. Create the trace for the bubble chart.
  var trace2 ={
    x: otuIds
    y: sampleValues
    text: otuLabels
    mode: "markers"
    marker:{ size: sampleValues, colour:otuIds, colourscale:}
  };
  var bubbleData = [trace2];

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {

    title: 'Bubble Chart Otu Ids',
    showlegend: false,
    height: 600,
    width: 600
    };
  };

  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot('bubble', data, layout)
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    
  });
}
