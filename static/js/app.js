url = "https://shresthaachyut.github.io/Achyut_Shrestha_BioDiversity/samples.json"

function buildBarPlot(selectedID){
  var sampleValues = selectedID[0].sample_values.slice(0,10);
  var otuId = selectedID[0].otu_ids.slice(0,10);
  var otuID_Str = otuId.map(id => "OTU "+ id);
  console.log(sampleValues);
  console.log(otuID_Str);

  var trace1 = {
    x: sampleValues,
    y: otuID_Str,      
    type: "bar",
    orientation:'h'
  };
  
  var data = [trace1];    
  var layout = {
    title: "'Bar' Chart",
  }; 
  Plotly.newPlot("bar", data, layout);
}

function buildBubblePlot(selectedID){
  var sampleValues = selectedID[0].sample_values;
  var otuId = selectedID[0].otu_ids;
  var otu_labels = selectedID[0].otu_labels;
  console.log(otu_labels);
  
  var trace1 = {
    x: otuId,
    y: sampleValues, 
    mode: 'markers',
    text: otu_labels,
    marker:{
      size:sampleValues,
      color:otuId,
    },     
 };
  
  var data = [trace1];    
  var layout = {
    title: "'Bubble' Chart",
  }; 
  Plotly.newPlot("bubble", data, layout);
}

function buildGaugePlot(selectedMetaData){
  var wfreq = selectedMetaData[0].wfreq;

 var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: wfreq,
    title: { text: "Scrubs per week", font: { size: 24 } },
    delta: { reference: 10, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 10], color: "cyan" },
        { range: [0, 10], color: "royalblue" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 10
      }
    }
  }
];

var layout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot(gauge, data, layout);
}

function populateMetaData(selectedMetaData){
  var panelData = document.getElementById("sample-metadata");
  panelData.innerHTML = "";
  
  panelData.append(`id:  ${selectedMetaData[0].id}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`ethnicity:  ${selectedMetaData[0].ethnicity}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`gender:  ${selectedMetaData[0].gender}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`age:  ${selectedMetaData[0].age}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`location:  ${selectedMetaData[0].location}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`bbtype:  ${selectedMetaData[0].bbtype}`);
  var linebreak = document.createElement("br");
  panelData.append(linebreak);
  panelData.append(`wfreq:  ${selectedMetaData[0].wfreq}`);
  
}

// Dropdown menu handler
function updatePlotly() {
  
  d3.event.preventDefault();
  var dropdownMenu = d3.select("#selDataset");
  var testSubjectID = dropdownMenu.property("value");
  buildPlot(testSubjectID);
}  

function buildPlot(testSubjectID){
    d3.json(url).then((importedData)=>{
    var fullData = importedData;   
    var selectedID = fullData.samples.filter(sampleElements=> sampleElements.id ===testSubjectID);    
    var selectedMetaData = fullData.metadata.filter(sampleElements=> sampleElements.id === +testSubjectID);
    buildBarPlot(selectedID);
    buildBubblePlot(selectedID);
    populateMetaData(selectedMetaData);
    buildGaugePlot(selectedMetaData);    
  });
}

d3.selectAll("#selDataset").on("change", updatePlotly);

function init(){
    d3.json(url).then((importedData)=>{
    var fullData = importedData;   
    var selectedID = fullData.samples.filter(sampleElements=> sampleElements.id ==='940');    
    var selectedMetaData = fullData.metadata.filter(sampleElements=> sampleElements.id === 940);
    buildBarPlot(selectedID);
    buildBubblePlot(selectedID);
    
    
    populateMetaData(selectedMetaData);
    buildGaugePlot(selectedMetaData);    
  });
}

init();







