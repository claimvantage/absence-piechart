# Absence Pie Chart

The [Google Chart API](https://developers.google.com/chart/image/docs/making_charts) has been deprecated. This is our solution to overcome this issue. We have followed the same URL pattern outlined in the following [documentation](https://developers.google.com/chart/image/docs/making_charts).

This is a Node js application that can run on a Heroku server that returns the buffer of a PNG image. The arc values for the pie chart are retrieved from the request URL. The pie charts are drawn using the [Chart.js](https://www.chartjs.org/) library.

![pieChart-NodeJs](https://user-images.githubusercontent.com/6918585/56890627-e8237f80-6a71-11e9-9f40-66a3e986d7a6.jpeg)

## Base URL
http://localhost:3000/piechart?

This is the base URL for the pie chart requests.

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
To run the following application on your localhost, do the following.
1. Clone this repo.
2. In Terminal, type the following commands.
⋅⋅2. cd absence-piechart 
⋅⋅3. node app.js 
3. In your browser, visit the following URL. 
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6

## Push Local Changes To The Heroku Server
To push your local changes to the Heroku server, do the following commands in Terminal.
1. git add --all
2. git commit -m "commit message goes here"
3. git push heroku master

## Libraries
1. https://www.chartjs.org/

## References
1. https://developers.google.com/chart/image/docs/making_charts
3. https://www.chartjs.org/
