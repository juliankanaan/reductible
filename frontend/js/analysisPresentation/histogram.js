

var p = ["288443.07", "288443.07", "143853.65", "143853.65", "143853.65", "143853.65", "143853.65", "141419.315", "116867.4", "116867.4", "116008.37", "111561.38071989552", "105511.7", "105511.7", "105511.7", "105511.7", "105511.7", "103748.31", "103748.31", "101333"];

var someData = segementer(p);

function kF(array){

var newArray = [];

$.each(array, function(index, value){

	var newNum = kFormatter(value);
  newArray.push(newNum);

});

return newArray;

}

createLineChart(someData);

function createLineChart(suppliedArray){

  // format ;data: [{x: 10,y: 20}, ...

  var ctx = "myChart";

  var options = {

  events: [],
  type: 'line',
  data: {
    labels: someData,
    datasets: [
	    {
	      label: "Price Histogram",
            fill: false,

            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
	      data: [
        			{x:suppliedArray[0], y:1},
              {x:suppliedArray[1], y:2},
              {x:suppliedArray[2], y:3},
              {x:suppliedArray[3], y:5},
              {x:suppliedArray[4], y:6.2},
              {x:suppliedArray[5], y:5},
              {x:suppliedArray[6], y:3},
              {x:suppliedArray[7], y:2},
              {x:suppliedArray[8], y:1},
              {x:suppliedArray[9], y:1}
              ]

    	}

		]
  },
  options: {
  	scales: {
    	yAxes: [{
      	scaleLabel: {
        display: true,
        labelString: 'Price Frequency'
      	},
        ticks: {
                    max: 8,
                    display: false
                },
      labelString: 'Bill frequency'
      }]
    }
  }
}



 new Chart(ctx, options);


}
function kFormatter(num) {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num
}

// histograms require the X axis to be a range of data, and the Y to be
// # of data points that exist in it


// how to segement the data?

function dataBuilder(arr){ // supply histogram array tp

}
function popuation(segmentArray){ // supplied the array bounds, how many fall into each range?

  // four histogram ranges exist




return popuationArray;
}

function segementer(array){ // splits array of prices into 8 even segments (for the histogram)

    var newArray = [];
    var middle = mean(array); // first the middle

    var largest = maxArray(array); // biggest number

    var smallest = minArray(array); // smallest number

    // now need to get [MIN -> MIDDLE]


    var firstQuartile = avgTwo(smallest, middle);
    var lastQuartile  = avgTwo(middle, largest);
    var second = avgTwo(smallest, firstQuartile);
    var third = avgTwo(firstQuartile, middle);
    var fourth = avgTwo(middle, lastQuartile);
    var fifth = avgTwo(lastQuartile, largest);

    // push all these values into an array

    newArray.push(smallest, second, firstQuartile, third, middle, fourth, lastQuartile, fifth, largest);


return kF(newArray);

}
function avgTwo(one, two){
    var sum = one + two;

    var avg = sum / 2;

    return avg;
}

function mean(arr){
  var arr = arr.map(Number); // clear quotes off the array of numbers
  var sum = arr.reduce(function(a, b) { return a + b; });
  console.log(sum);
  var avg = sum / arr.length;

  return avg;
}

function minArray(array){

var max = array.reduce(function(a, b) {
    return Math.min(a, b);
    });

return max;
}

function maxArray(array){

var max = array.reduce(function(a, b) {
    return Math.max(a, b);
    });

return max;
}
