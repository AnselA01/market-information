function loadData() {
    var symbol = localStorage.getItem('_symbol');
    if (!symbol) return false;
    return symbol;
    }

//request with curl
var url = "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=";
url = url.concat(loadData())
var config = {
    method: 'get',
    url: url,
    headers: { 
    'accept': 'application/json', 
    'X-API-KEY': 'VmKAUWKlFm1sHGmUkQQqd1eacYPTTYfFKAAfflEe'
    }
};

//receive data
axios(config)  
.then(function (response) {
    var HTTPResponse = response.data.quoteResponse.result[0];
    
    //bid, ask, price
    var bid = parseFloat(HTTPResponse.bid);
    var ask = parseFloat(HTTPResponse.ask);
    var price = parseFloat(HTTPResponse.regularMarketPrice);   
    
    
    
    //price and percent changes
    var open = parseFloat(HTTPResponse.regularMarketOpen);
    document.getElementById("open").innerHTML = open;
    
    var prevClose = parseFloat(HTTPResponse.regularMarketPreviousClose);
    document.getElementById("previous_close").innerHTML = prevClose;
    
    var dayChange = parseFloat(HTTPResponse.regularMarketChange);
    dayChange = dayChange.toFixed(2);
    
    var percentChange = (dayChange/prevClose) * 100;
    
    percentChange = percentChange.toFixed(2);

    if (dayChange > 0) {
        toString(dayChange);
        toString(percentChange);
        dayChange = "+" + dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("pos_day_change").innerHTML = dayChange;
    }
    else if (dayChange < 0) {
        toString(dayChange);
        toString(percentChange);
        dayChange = dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("neg_day_change").innerHTML = dayChange;

    }
    else {
        toString(dayChange);
        toString(percentChange);
        dayChange = dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("eq_day_change").innerHTML = dayChange;
    }
    
    price = price.toFixed(2);
    bid = bid.toFixed(2);
    ask = ask.toFixed(2);

    //after hours data
    if (HTTPResponse.marketState == "POST" || "POSTPOST") { 
        var ahPrice = parseFloat(HTTPResponse.postMarketPrice);
        ahPrice = ahPrice.toFixed(2);
        ahPrice = "After Hours " + ahPrice;
        var ahChange = parseFloat(HTTPResponse.postMarketChange);
        ahChange = ahChange.toFixed(2);
        var ahPercentChange = (ahChange/HTTPResponse.regularMarketPrice) * 100;
        ahPercentChange = ahPercentChange.toFixed(2);
        
        if (ahChange > 0) {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = "+" + ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("pos_ah_change").innerHTML = ahChange;
        }
        else if (ahChange < 0) {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("neg_ah_change").innerHTML = ahChange;
    
        }
        else if (ahChange == 0) {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("eq_ah_change").innerHTML = ahChange;
        }
    }
    
    document.getElementById("bid").innerHTML = bid;
    document.getElementById("ask").innerHTML = ask;
    document.getElementById("current_price").innerHTML = price;  
    document.getElementById("ah_price").innerHTML = ahPrice;
    
    //day and 52 week range
    var dayRange = HTTPResponse.regularMarketDayRange;
    document.getElementById("day_range").innerHTML = dayRange;

    var fiftyTwoWeekRange = HTTPResponse.fiftyTwoWeekRange;
    document.getElementById("52_range").innerHTML = fiftyTwoWeekRange;

    //company name
    var companyName = HTTPResponse.shortName;
    document.getElementById("company_name").innerHTML = companyName;

    //ticker
    var ticker = "(" + HTTPResponse.symbol + ")";
    document.getElementById("ticker").innerHTML = ticker;
   
    //currency
    var currency = HTTPResponse.currency;
    document.getElementById("currency").innerHTML = currency;

    //volume
    var volume = parseInt(HTTPResponse.regularMarketVolume);
    volume = volume.toLocaleString();
    document.getElementById("volume").innerHTML = volume;

    var avgVolume = parseInt(HTTPResponse.averageDailyVolume3Month);
    avgVolume = avgVolume.toLocaleString();
    document.getElementById("avg_volume").innerHTML = avgVolume;
            
    //exchange
    var exchange = HTTPResponse.fullExchangeName;
    if (exchange == "NasdaqGS") exchange = "Nasdaq";
    exchange+= ": ";
    document.getElementById("exchange").innerHTML = exchange;
})
.catch(function (error) {
    console.log(error);
});

//graph with Yahoo Finance
var urlFirstHalf = "https://yfapi.net/v8/finance/chart/" + loadData();
var chartUrl = urlFirstHalf + "?range=1&region=US&interval=15m&lang=en";
console.log(chartUrl);
var config = {
    method: 'get',
    url: 'https://yfapi.net/v8/finance/chart/AAPL?range=1&region=US&interval=15m&lang=en',
    headers: { 
      'accept': 'application/json', 
      'X-API-KEY': 'VmKAUWKlFm1sHGmUkQQqd1eacYPTTYfFKAAfflEe'
    }
  };
  
axios(config)
.then(function (response) {
    var allPriceValues = response.data.chart.result[0].indicators.quote[0].close;
    for (var i = 0; i < 22; i++) { //large array of all 15m values
        Number(allPriceValues[i]);
        allPriceValues[i] = allPriceValues[i].toFixed(2);
    }
    
    google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() { //chart drawing
          var data = google.visualization.arrayToDataTable(chartDataArray);
  
          var options = {
            title: '15 min',
            curveType: 'none',
            legend: { position: 'none' },
            chartArea: {left:20,top:0,width:'50%',height:'75%'}
          };

          var chart = new google.visualization.LineChart(document.getElementById('15m-chart'));
  
          chart.draw(data, options);
        }
})
.catch(function (error) {
console.log(error);
});

  //using twelvedata
//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
    .then(response => {
        var logoParsed = response.data;
        var logo = logoParsed.url;
        document.getElementById("logo").src = logo;
    })

