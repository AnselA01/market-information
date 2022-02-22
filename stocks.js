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
    document.getElementById("previous-close").innerHTML = prevClose;
    
    var dayChange = parseFloat(HTTPResponse.regularMarketChange);
    dayChange = dayChange.toFixed(2);
    
    var percentChange = (dayChange/prevClose) * 100;
    
    percentChange = percentChange.toFixed(2);

    if (dayChange > 0) {
        toString(dayChange);
        toString(percentChange);
        dayChange = "+" + dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("pos-day-change").innerHTML = dayChange;
    }
    else if (dayChange < 0) {
        toString(dayChange);
        toString(percentChange);
        dayChange = dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("neg-day-change").innerHTML = dayChange;

    }
    else {
        toString(dayChange);
        toString(percentChange);
        dayChange = dayChange + " " + "(" + percentChange + "%)";
        document.getElementById("eq-day-change").innerHTML = dayChange;
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
            document.getElementById("pos-ah-change").innerHTML = ahChange;
        }
        else if (ahChange < 0) {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("neg-ah-change").innerHTML = ahChange;
    
        }
        else if (ahChange == 0) {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("eq-ah-change").innerHTML = ahChange;
        }
    }
    
    document.getElementById("bid").innerHTML = bid;
    document.getElementById("ask").innerHTML = ask;
    document.getElementById("current-price").innerHTML = price;  
    document.getElementById("ah-price").innerHTML = ahPrice;
    
    //day and 52 week range
    var dayRange = HTTPResponse.regularMarketDayRange;
    document.getElementById("day-range").innerHTML = dayRange;

    var fiftyTwoWeekRange = HTTPResponse.fiftyTwoWeekRange;
    document.getElementById("52-range").innerHTML = fiftyTwoWeekRange;

    //company name
    var companyName = HTTPResponse.shortName;
    document.getElementById("company-name").innerHTML = companyName;

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
    document.getElementById("avg-volume").innerHTML = avgVolume;
            
    //exchange
    var exchange = HTTPResponse.fullExchangeName;
    if (exchange == "NasdaqGS") exchange = "Nasdaq";
    exchange+= ": ";
    document.getElementById("exchange").innerHTML = exchange;
})
.catch(function (error) {
    console.log(error);
});

//Get graph data with YFAPI
var urlFirstHalf = "https://yfapi.net/v8/finance/chart/" + loadData();
var chartUrl = urlFirstHalf + "?range=1&region=US&interval=5m&lang=en";
var config = {
    method: 'get',
    url: chartUrl,
    headers: { 
      'accept': 'application/json', 
      'X-API-KEY': 'VmKAUWKlFm1sHGmUkQQqd1eacYPTTYfFKAAfflEe'
    }
  };
  
axios(config)
.then(function (response) {
    var priceValues = response.data.chart.result[0].indicators.quote[0].close;
    for (var i = 0; i < 78; i++) { //array of all 5m prices at close
        Number(priceValues[i]);
        priceValues[i] = priceValues[i].toFixed(2);
        priceValues[i] = parseFloat(priceValues[i]);
    }
    var price0 = ['', priceValues[0]], price1 = ['', priceValues[1]], price2 = ['', priceValues[2]], price3 = ['', priceValues[3]], price4 = ['', priceValues[4]], price5 = ['', priceValues[5]], price6 = ['10:00', priceValues[6]], price7 = ['', priceValues[7]], price8 = ['', priceValues[8]], price9 = ['', priceValues[9]], price10 = ['', priceValues[10]], price11 = ['', priceValues[11]], price12 = ['', priceValues[12]], price13 = ['', priceValues[13]], price14 = ['', priceValues[14]], price15 = ['', priceValues[15]], price16 = ['', priceValues[16]], price17 = ['', priceValues[17]], price18 = ['11:00', priceValues[18]], price19 = ['', priceValues[19]], price20 = ['', priceValues[20]], price21 = ['', priceValues[21]], price22 = ['', priceValues[22]], price23 = ['', priceValues[23]], price24 = ['', priceValues[24]], price25 = ['', priceValues[25]], price26 = ['', priceValues[26]], price27 = ['', priceValues[27]], price28 = ['', priceValues[28]], price29 = ['', priceValues[29]], price30 = ['12:00', priceValues[30]], price31 = ['', priceValues[31]], price32 = ['', priceValues[32]], price33 = ['', priceValues[33]], price34 = ['', priceValues[34]], price35 = ['', priceValues[35]], price36 = ['', priceValues[36]], price37 = ['', priceValues[37]], price38 = ['', priceValues[38]], price39 = ['', priceValues[39]], price40 = ['', priceValues[40]], price41 = ['', priceValues[41]], price42 = ['1:00', priceValues[42]], price43 = ['', priceValues[43]], price44 = ['', priceValues[44]], price45 = ['', priceValues[45]], price46 = ['', priceValues[46]], price47 = ['', priceValues[47]], price48 = ['', priceValues[48]], price49 = ['', priceValues[49]], price50 = ['', priceValues[50]], price51 = ['', priceValues[51]], price52 = ['', priceValues[52]], price53 = ['', priceValues[53]], price54 = ['2:00', priceValues[54]], price55 = ['', priceValues[55]], price56 = ['', priceValues[56]], price57 = ['', priceValues[57]], price58 = ['', priceValues[58]], price59 = ['', priceValues[59]], price60 = ['', priceValues[60]], price61 = ['', priceValues[61]], price62 = ['', priceValues[62]], price63 = ['', priceValues[63]], price64 = ['', priceValues[64]], price65 = ['', priceValues[65]], price66 = ['3:00', priceValues[66]], price67 = ['', priceValues[67]], price68 = ['', priceValues[68]], price69 = ['', priceValues[69]], price70 = ['', priceValues[70]], price71 = ['', priceValues[71]], price72 = ['', priceValues[72]], price73 = ['', priceValues[73]], price74 = ['', priceValues[74]], price75 = ['', priceValues[75]], price76 = ['', priceValues[76]], price77 = ['', priceValues[77]], price78 = ['4:00', priceValues[78]];
    
    //The chart
    google.charts.load('current', {'packages':['corechart','line']}); 
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() { //chart drawing
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'time');
            data.addColumn('number', 'price');
            data.addRows([
                price0, price1, price2, price3, price4, price5, price6, price7, price8, price9, price10, price11, price12, price13, price14, price15, price16, price17, price18, price19, price20, price21, price22, price23, price24, price25, price26, price27, price28, price29, price30, price31, price32, price33, price34, price35, price36, price37, price38, price39, price40, price41, price42, price43, price44, price45, price46, price47, price48, price49, price50, price51, price52, price53, price54, price55, price56, price57, price58, price59, price60, price61, price62, price63, price64, price65, price66, price67, price68, price69, price70, price71, price72, price73, price74, price75, price76, price77, price78
            ]);

            formatPattern = '###,##0.00';
            var formatNumber = new google.visualization.NumberFormat({
                pattern: formatPattern
            });
            formatNumber.format(data, 1);
            
            var options = {
            title: '5 min',
            curveType: 'none',
            legend: { position: 'none' },
            subtitle: 'none',
            vAxis: {
                format: formatPattern
              }
            };

            var chart = new google.charts.Line(document.getElementById('chart'));
            chart.draw(data, options);
        }
})
.catch(function (error) {
console.log(error);
});

//logo using twelvedata
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
    .then(response => {
        var logoParsed = response.data;
        var logo = logoParsed.url;
        document.getElementById("logo").src = logo;
    })