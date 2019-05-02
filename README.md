# Absence Pie Chart

The [Google Chart API](https://developers.google.com/chart/image/docs/making_charts) has been deprecated. This is our solution to overcome this issue. We have followed the same URL pattern outlined in the following [documentation](https://developers.google.com/chart/image/docs/making_charts). The solution we have provided is for pie charts only.

This is a [Node js](https://nodejs.org/en/) application that can run on a Heroku server that returns the buffer of a PNG image. The arc values for the pie chart are retrieved from the request URL. The pie charts are drawn using the [Chart.js](https://www.chartjs.org/) library.

<img width="1405" alt="Screenshot 2019-05-01 at 15 29 18" src="https://user-images.githubusercontent.com/6918585/57022079-edc1c680-6c25-11e9-9aa0-f4b8e2732cc1.png">

## URL Parameters:
The following are the parameters we support. In order for a pie chart to be drawn, the following parameters have to be present in the URL. 

1. chs - The chart size (width x height).
1. chd - The chart data.
2. chl - The slice labels.
3. chdl - The chart data labels.
4. chco - The chart arc colours.

## Example URL
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6

## Run Local Web Server
To run the application on your localhost, do the following.

1. Make sure you have Node Js installed. The latest version can be downloaded [here](https://developers.google.com/chart/image/docs/making_charts)
1. Clone this repo.
2. In the Terminal application, type the following commands.
 * cd absence-piechart 
 * node app.js 
4. In your browser, visit the following URL. 
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6

## Heroku server and deploying the source code
1. Follow these steps to Setup your Heroku server - [Getting Started on Heroku with Node.js
](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

To push your local changes to the Heroku server, do the following commands
1. git add --all
2. git commit -m "commit message goes here"
3. git push heroku master

## References
1. https://developers.google.com/chart/image/docs/making_charts
2. https://www.chartjs.org/
3. https://devcenter.heroku.com/articles/getting-started-with-nodejs

