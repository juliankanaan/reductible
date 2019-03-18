# Presenting our data

Most importantly, Reductible needs to show users how their invoice prices match up with the rest of the market.

We'll be using <a href="https://www.chartjs.org/">Charts.js</a>, my favorite JavaScript library for creating pretty charts.   

Here's v1 output of a histogram (3/18):

<img src="https://i.imgur.com/sU2TCPj.png" width="200px;">

Gross UI, but this is meant to show all iterations along development.

## Getting clean data

Since invoice descriptions are insanely inconsistent for the same procedures, it's
sometimes hard to give users relevant results (the API data might return "heart exam" alongside "heart surgery"). This can be solved mostly by restricting description match results to similar priced items.

`withinOne()` <a herf='https://github.com/juliankanaan/reductible/blob/master/tree/frontend/js/narrowResults.js'>function</a> refines preliminary results and returns only those that are within one standard deviation of the total larger population of possible results.
