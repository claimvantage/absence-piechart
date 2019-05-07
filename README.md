# Absence Pie Chart

The [Google Chart API](https://developers.google.com/chart/image/docs/making_charts) has been deprecated. This is our solution to overcome this issue. We have followed the same URL pattern outlined in the following [documentation](https://developers.google.com/chart/image/docs/making_charts). The solution we have provided is for pie charts only.

This is a [Node js](https://nodejs.org/en/) application that can run on a Heroku server that returns the buffer of a PNG image. The arc values for the pie chart are retrieved from the request URL. The pie charts are drawn using the [Chart.js](https://www.chartjs.org/) library.

<p align="center">
<img width="387" alt="Screenshot 2019-05-07 at 10 42 58" src="https://user-images.githubusercontent.com/6918585/57290247-ed597d80-70b4-11e9-8ef8-b8e797ff87f6.png">
</p>

## URL Parameters:
The following are the parameters we support. In order for a pie chart to be drawn, the following parameters have to be present in the URL. 

1. chs - The chart size (width x height).
1. chd - The chart data.
2. chl - The slice labels.
3. chdl - The chart data labels.
4. chco - The chart arc colours.

## Example URL
```console
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6
```

## Run locally
To run the application on your localhost, do the following.

1. Make sure you have Node.js installed. The latest version can be downloaded [here](https://developers.google.com/chart/image/docs/making_charts)
1. Clone this repo.
2. In the Terminal application, type the following commands.
```bash
cd absence-piechart 
```
```bash
node app.js 
```
4. In your browser, visit the following URL. 
```console
http://localhost:3000/piechart?chs=600x90&cht=pc&chd=t:0.01,.01,12,.01&chl=32%20hours|||11%20weeks%208%20hours&chdl=Pending|Approved|Deducted|Remaining&chco=00FF0066|00FF00|0000FF44|ADD8E6
```

## Setting up a Heroku server and deploying local changes.
Follow the steps for [Getting Started on Heroku with Node.js
](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

Once you are ready to push your local changes onto Heroku, perform the following commands in the root folder of absence-piechart.
```bash
git add --all
```
```bash
git commit -m "commit message goes here"
```
```bash
git push heroku master
```

## Files
1. Proicfile declares what commands are to be executed on Heroku. The procfile starts the Node.js application.
2. package.json and package-lock.json list the appliation dependencies. These dependencies are installed when the application is deployed to Heroku. 
3. app.js is the webserver. It listens for requests and returns the buffer of a pie chart png image.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## References
1. https://developers.google.com/chart/image/docs/making_charts
2. https://www.chartjs.org/
3. https://devcenter.heroku.com/articles/getting-started-with-nodejs
4. https://www.npmjs.com/package/throng

