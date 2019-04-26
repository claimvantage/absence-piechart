var express = require('express');
var app = express();

const ChartjsNode = require('chartjs-node');

var CHS = 'chs'
var CHD = "chd";
var CHS = "chs";
var CHL = "chl";
var CHDL = "chdl";
var CHCO = "chco";

var PATH = "/piechart";
const PORT = process.env.PORT || 3000;

// seperators
var BAR = "|";
var COLON = ":";
var SEMI_COLON = ";";
var COMMA = ",";
var X = "x";

app.get(PATH, function(req, res){
    var paramatersByKey = getURLParameters(req);

    var chartData = paramatersByKey.get(CHD).split(COLON);
    var data = chartData[1].split(COMMA);

    var chartWidthHeight = paramatersByKey.get(CHS).split(X);

    var chartLabels = paramatersByKey.get(CHL).split(BAR);
    var chartDataLabels =  paramatersByKey.get(CHDL).split(BAR);
    var labels = createLabels(chartDataLabels, chartLabels);

    var chartColours = paramatersByKey.get(CHCO).split(BAR);
    hexColours = addHashTags(chartColours)
    
    var chartJsOptions = createChartOptions(labels, data, hexColours);
    let randomCharacters = random();
    var height = chartWidthHeight[0];
    var width = chartWidthHeight[1];

    var chartNode = new ChartjsNode(height, width);
    return chartNode.drawChart(chartJsOptions)
    .then(() => {
        return chartNode.getImageBuffer('image/png');
    })
    .then(buffer => {
        Array.isArray(buffer)
        return chartNode.getImageStream('image/png');
    })
    .then(streamResult => {
        return chartNode.writeImageToFile('image/png', './'+ randomCharacters + '.png');
    })
    .then(() => {
        res.sendFile('./'+ randomCharacters + '.png', { root: __dirname });
    });
  }
);

function createChartOptions(labels, data, hexColours) {
  var chartJsOptions = {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: hexColours,
        borderWidth: 0
      }]
    },
    options: {
       title: {
        display: false,
       },
       chartArea: {
          backgroundColor: '#ffffff'
       },
       responsive: false,
       legend: {
          position: 'right'
       }
    }
  };
  return chartJsOptions;
}

function getURLParameters(req) {
  var paramatersByKey = new Map();

  for (const key in req.query) {
    var paramter = req.query[key];
    var k = key.split(SEMI_COLON);
    if (k.length > 1) {
      paramatersByKey.set(k[1], paramter);
    }
    paramatersByKey.set(k[0], paramter);
  }
  return paramatersByKey;
}

function addHashTags(colours) {
  var hexColours = [];
  for (c in colours) {
    var hex = "#" + colours[c];
    hexColours.push(hex);
  }
  return hexColours;
}

function createLabels(statues, timeLabels) {
  var labels = [];
  var labelsSize = statues.length;
  for (i = 0; i < labelsSize; i++) {
    var newLabel = statues[i] + "-" + timeLabels[i];
    labels.push(newLabel);
  }
  return labels;
}

function random() {
  return Math.random().toString(36).substring(7);
}

app.listen(PORT); 