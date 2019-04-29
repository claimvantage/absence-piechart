
//  Node js application to return the buffer of a pie chart PNG image.
//  The charts are drwn using Chart.js - https://www.chartjs.org/

'use strict'

var express = require('express');
var app = express();
const chartjs = require('chartjs-node');

const PATH = '/piechart';
const PORT = process.env.PORT || 3000;

// url keys
const CHS = 'chs';
const CHD = 'chd';
const CHL = 'chl';
const CHDL = 'chdl';
const CHCO = 'chco';

// seperators
const BAR = '|';
const COLON = ':';
const SEMI_COLON = ';';
const COMMA = ',';
const X = 'x';

const DASH = '-';
const ZERO_WEEKS = '0 weeks';

app.get(PATH, function(req, res) {
  let paramatersByKey = parseQuery(req);

  let chartData = paramatersByKey.get(CHD).split(COLON);
  let data = chartData[1].split(COMMA);

  let chartLabels = paramatersByKey.get(CHL).split(BAR);
  let chartDataLabels =  paramatersByKey.get(CHDL).split(BAR);
  let labels = createStatusTimeLabels(chartDataLabels, chartLabels);

  let chartColours = paramatersByKey.get(CHCO).split(BAR);
  let hexColours = addHashTags(chartColours);
  
  let chartJsOptions = createChartOptions(labels, data, hexColours);
  let chartWidthHeight = paramatersByKey.get(CHS).split(X);

  return response(res, chartJsOptions, chartWidthHeight);
});

function response(res, options, chartWidthHeight) {
  let width = chartWidthHeight[0];
  let height = chartWidthHeight[1];
  let chartNode = new chartjs(width, (height * 2));

  return chartNode.drawChart(options)
    .then(() => {
        return chartNode.getImageBuffer('image/png');
    })
    .then(buffer => {
        res.write(buffer);
        res.end();
    });
}

function createChartOptions(labels, data, hexColours) {
  let chartJsOptions = {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: hexColours
      }]
    },
    options: {
       responsive: false,
       legend: {
        position: 'right',
        boxWidth: 20
       }
    }
  };
  return chartJsOptions;
}

function parseQuery(req) {
  let paramatersByKey = new Map();

  for (let key in req.query) {
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

  for (let c in colours) {
    let hex = '#' + colours[c];
    hexColours.push(hex);
  }
  return hexColours;
}

function createStatusTimeLabels(statues, timeLabels) {
  let labels = [];
  let labelsSize = statues.length;

  for (let i = 0; i < labelsSize; i++) {
    let newLabel = statues[i];
    if (timeLabels[i] !== '') {
      newLabel +=  DASH + timeLabels[i];
    } else {
      newLabel += DASH + ZERO_WEEKS;
    }
    labels.push(newLabel);
  }
  return labels;
}

app.listen(PORT); 