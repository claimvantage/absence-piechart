# Absence-PieChart

This is a node js application that can be run on a Heroku server that returns the buffer of a PNG image. The values for the arcs in the pie chart are retrieved from the URL. 

## Base URL
http://localhost:3000/piechart?
This is the base URL for the pie chart requests.

## URL Parameters:
1. chs - The chart size (width x height).
1. chd - The chart data.
2. chl - The slice labels.
3. chdl - The chart data labels.
4. chco - The chart arc colours.

## Example
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6

## Dependencies
1. Go installed
2. Heroku CLI 

## Run Node Server Locally
In the command line, type the following command in the Absence-PieChart folder.
1. node app.js
2. In your browser, go to http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6


## Push Local Changes To The Heroku server
To push your local changes to the Heroku server, do the following commands in terminal.
1. git add --all
2. git commit -m "commit message goes here"
3. git push heroku master


## References
1. https://developers.google.com/chart/image/docs/making_charts
2. https://www.chartjs.org/


