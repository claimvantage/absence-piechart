
//  Node js application to return the buffer of a pie chart PNG image.
//  The pie chart are drawn using Chart.js - https://www.chartjs.org/

'use strict'
const throng = require('throng')

const PORT = process.env.PORT || 3000;
const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)

function start() {
  const chartJS = require('chartjs-node');

  const PATH = '/piechart';

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
  
  const DEFAULT_WIDTH = 900;
  const DEFAULT_HEIGHT = 90;
  
  const DASH = '-';
  const ZERO_WEEKS = '0 weeks';
  
  var express = require('express');
  var app = express();

  app.get(PATH, function (req, res) {
    var paramatersByKey = parseQuery(req);
  
    var chartData = paramatersByKey.get(CHD).split(COLON);
    var data = chartData[1].split(COMMA);
  
    var chartLabels = paramatersByKey.get(CHL).split(BAR);
    var chartDataLabels = paramatersByKey.get(CHDL).split(BAR);
    var labels = createStatusTimeLabels(chartDataLabels, chartLabels);
  
    var chartColours = paramatersByKey.get(CHCO).split(BAR);
    var hexColours = addHashTags(chartColours);
  
    var chartJsOptions = createChartOptions(labels, data, hexColours);
  
    var chartWidthHeight = paramatersByKey.get(CHS).split(X);
  
    return response(res, chartJsOptions, chartWidthHeight);
  });
  
  app.listen(PORT); 
  
  function response(res, options, chartWidthHeight) {
    var width = DEFAULT_WIDTH;
    var height = DEFAULT_HEIGHT;
  
    if (chartWidthHeight.length == 2) {
      width = chartWidthHeight[0];
      height = chartWidthHeight[1];
    }
  
    var chartNode = new chartJS(width, height)
    return  chartNode.drawChart(options)
      .then(() => {
        return chartNode.getImageBuffer('image/png');
      })
      .then(buffer => {
        res.write(buffer);
        res.end();
      });
  }
  
  function createChartOptions(labels, data, hexColours) {
    var chartJsOptions = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: hexColours
        }]
      },
      options: {
        layout: {
          padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0
          }
        },
        legend: {
            display: true,
        }
      }
    };
    return chartJsOptions;
  }
  
  function parseQuery(req) {
    var paramatersByKey = new Map();
  
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
    var hexColours = [];
  
    for (const c in colours) {
      let hex = '#' + colours[c];
      hexColours.push(hex);
    }
    return hexColours;
  }
  
  function createStatusTimeLabels(statues, timeLabels) {
    var labels = [];
    var labelsSize = statues.length;
  
    for (let i = 0; i < labelsSize; i++) {
      let newLabel = statues[i];
      if (timeLabels[i] !== '') {
        newLabel += DASH + timeLabels[i];
      } else {
        newLabel += DASH + ZERO_WEEKS;
      }
      labels.push(newLabel);
    }
    return labels;
  }
}