var express = require('express');
var app = express();
const ChartjsNode = require('chartjs-node');

// URL Keys
const CHS = 'chs'
const CHD = "chd";
const CHL = "chl";
const CHDL = "chdl";
const CHCO = "chco";

const PATH = "/piechart";
const PORT = process.env.PORT || 3000;

// seperators
const BAR = "|";
const COLON = ":";
const SEMI_COLON = ";";
const COMMA = ",";
const X = "x";

const DASH = "-"
const ZERO_WEEKS = "0 weeks";

app.get(PATH, function(req, res) {
    let paramatersByKey = getURLParameters(req);

    let chartData = paramatersByKey.get(CHD).split(COLON);
    let data = chartData[1].split(COMMA);

    let chartWidthHeight = paramatersByKey.get(CHS).split(X);
    
    let chartLabels = paramatersByKey.get(CHL).split(BAR);
    let chartDataLabels =  paramatersByKey.get(CHDL).split(BAR);
    let labels = createLabels(chartDataLabels, chartLabels);

    let chartColours = paramatersByKey.get(CHCO).split(BAR);
    hexColours = addHashTags(chartColours)
    
    let chartJsOptions = createChartOptions(labels, data, hexColours);
    let randomCharacters = random();
    let height = chartWidthHeight[0];
    let width = chartWidthHeight[1];

    let chartNode = new ChartjsNode(height, width);

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
  let chartJsOptions = {
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
       responsive: false,
       legend: {
          position: 'right'
       }
    }
  };
  return chartJsOptions;
}

function getURLParameters(req) {
  let paramatersByKey = new Map();

  for (const key in req.query) {
    let paramter = req.query[key];
    let k = key.split(SEMI_COLON);

    if (k.length > 1) {
      paramatersByKey.set(k[1], paramter);
    } else {
      paramatersByKey.set(k[0], paramter);
    }
  }
  return paramatersByKey;
}

function addHashTags(colours) {
  let hexColours = [];
  for (c in colours) {
    let hex = "#" + colours[c];
    hexColours.push(hex);
  }
  return hexColours;
}

function createLabels(statues, timeLabels) {
  let labels = [];
  let labelsSize = statues.length;
  for (i = 0; i < labelsSize; i++) {
    let newLabel = statues[i];
    if (timeLabels[i] != "") {
      newLabel +=  DASH + timeLabels[i]
    } else {
      newLabel += DASH + ZERO_WEEKS;
    }
    labels.push(newLabel);
  }
  return labels;
}

function random() {
  return Math.random().toString(36).substring(7);
}

app.listen(PORT); 