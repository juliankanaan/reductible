# Presenting our data

Most importantly, Reductible needs to show users how their invoice prices match up with the rest of the market.

We'll be using <a href="https://www.chartjs.org/">Charts.js</a>, my favorite JavaScript library for creating pretty charts.   

Here's v1 output of a histogram (3/18):

<img src="https://i.imgur.com/iGhHVXr.png" width="300px;">

Gross UI, but this is meant to show all iterations along development.

## Quick aside: Getting clean data

Since invoice descriptions are insanely inconsistent for the same procedures, it's
sometimes hard to give users relevant results (the API data might return "heart exam" alongside "heart surgery"). This can be solved mostly by restricting description match results to similar priced items.

`withinOne()` <a href='https://github.com/juliankanaan/reductible/blob/master/tree/frontend/js/narrowResults.js'>function</a> refines preliminary results and returns only those that are within one standard deviation of the total larger population of possible results.

## Code Walkthrough: Generating Histogram

We're working with the output of `searchAnalysis()`, which gives us an array of prices for the query we need (results passed through withinOne()). Ex output:

```
["288443.07", "288443.07", "143853.65", "143853.65"....] // ~80 objects

```

Next, histograms need segments along the x-axis. `segmenter()` accepts our searchAnalysis() output and returns an array of 8 even segments for our population.

```
segmenterOutput = [smallest, second, firstQuartile, third, middle, fourth, lastQuartile, fifth, largest];

```

Finally, we have `createLineChart()` that accepts our segmented array and original data to build the histogram with Charts.js
