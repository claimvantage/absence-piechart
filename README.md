# Absence-PieChart

Heroku API endpoint that returns a PNG image in the response.

The values for the arcs in the pie chart are retrieved from the URL.

## URL Parameters:
1. chs
1. chd
2. chl
3. chdl
4. chco

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


