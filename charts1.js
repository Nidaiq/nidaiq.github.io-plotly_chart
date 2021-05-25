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

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleFilter = sampleArray.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = sampleFilter[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    
    // console.log(otuIds)


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // otuIds.forEach(x=>{
    //   console.log(x);
    // });
    var yticks = otuIds.slice(0,10).map(x=> `OTU ${x}`).reverse();
    var trace1 = {
      x: sampleValues.slice(0,10).reverse(),
      // y: otuIds.slice(0,10).map(ids => ids).reverse(),
      y: yticks,
      //y: otuIds.slice(0,10).reverse().map(otuIds => otuIds.results)
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
      //title: "Top 10 Bacteria Cultures Found",
    };

  // console.log(sampleValues);
  // console.log(otuIds);

    //var yticks = {
      //y: otu_ids,
    //};
    

    // 8. Create the trace for the bar chart. 
    var barData = [trace1];
    // 9. Create the layout for the bar chart. 
    var barLayout = {      
      title: "Top 10 Bacteria Cultures Found in Indivitual " + sample,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "Otu Ids"},
      //margin:{l:100, r:100, t:100, b:100},
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      width: 600,
      height:400,
      margin: {t:25, b:0},
      //margin: { t: 40, r: 40, l: 40, b: 40 },
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);
  


// 1. Create the trace for the bubble chart.
// console.log(otuIds)
// console.log(sampleValues)
var trace2 ={
  x: otuIds,
  y: sampleValues,
  text: otuLabels,
  mode: "markers",
  marker:{size: sampleValues, color:otuIds, colorscale:"Earth"}
};
var bubbleData = [trace2];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: 'Bacteria Culture Per Sample ',
  hovermode: 'closest',
  xaxis: { title: "OTU ID"},
  showlegend: false,
  paper_bgcolor: "transparent",
  plot_bgcolor: "transparent",
  //margin:{l:100, r:100, t:100, b:100},
  height: 450,
  width: 1000,
  };
//};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot('bubble', bubbleData, bubbleLayout);

// 1c. Create a variable that filters the metadata array for the object with the desired sample number.
var meta = data.metadata
var metaArray = meta.filter(sampleObj => sampleObj.id == sample);

// 2c. Create a variable that holds the first sample in the metadata array.
//var metaResult = metaArray[0];
var metaResult = metaArray[0];

// 3. Create a variable that holds the washing frequency.
var wFreq = parseFloat(metaResult.wfreq);

// 4. Create the trace for the gauge chart.
var gaugeData = [
  {domain: { x: [0, 1], y: [0, 1] },
  value: wFreq,
  type: "indicator",
  mode: "gauge+number",
  title: {text:"<b>Belly Button Washing Frequncy</b><br>Scrubs per Week"}, 
  gauge: {axis: {range:[0,10]},
  steps: [
    { range: [0, 2], color: "red" },
    { range: [2, 4], color: "orange" },
    { range: [4, 6], color: "yellow" },
    { range: [6, 8], color: "yellowgreen" },
    { range: [8, 10], color: "green" }
  ],
  
  bar: {color: "black"}

}}
     
];
    
// 5. Create the layout for the gauge chart.
var gaugeLayout = { 
  width: 600,
  height: 450,
  //line:{colour:'60000'},
  //margin:{l:100, r:100, t:100, b:100},
  margin: { t: 50, r: 50, l: 50, b: 50 },
  paper_bgcolor: "linen",
  type: "indicator",
  mode: "number + gauge",
     
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot('gauge', gaugeData, gaugeLayout);   
});
}
