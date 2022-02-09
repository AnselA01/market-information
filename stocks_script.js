function loadData() {
    var symbol = localStorage.getItem('_symbol');
    if (!symbol) return false;
    return symbol;
    }
console.log(loadData());
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

axios(config)  //receive data
.then(function (response) {
    
    //bid, ask, price
    var bid = parseFloat(response.data.quoteResponse.result[0].bid);
    var ask = parseFloat(response.data.quoteResponse.result[0].ask);
    var price = parseFloat(response.data.quoteResponse.result[0].regularMarketPrice);   
    
    //after hours data
    if (response.data.quoteResponse.result[0].marketState == "POSTPOST") { 
        var AHPrice = JSON.stringify(response.data.quoteResponse.result[0].postMarketPrice);
        AHPrice = "After Hours " + AHPrice;
        var ahChange = parseFloat(response.data.quoteResponse.result[0].postMarketChange);
        ahChange = ahChange.toFixed(2);
        var ahPercentChange = (ahChange/response.data.quoteResponse.result[0].regularMarketPrice) * 100;
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
        else {
            toString(ahChange);
            toString(ahPercentChange);
            ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
            document.getElementById("eq_ah_change").innerHTML = ahChange;
        }
        
    }
    
    //price and percent changes
    var open = parseFloat(response.data.quoteResponse.result[0].regularMarketOpen);
    document.getElementById("open").innerHTML = open;
    var prevClose = parseFloat(response.data.quoteResponse.result[0].regularMarketPreviousClose);
    document.getElementById("previous_close").innerHTML = prevClose;
    var dayChange = parseFloat(response.data.quoteResponse.result[0].regularMarketChange);
    var percentChange = (dayChange/prevClose) * 100;
    percentChange = percentChange.toFixed(2);
    dayChange = dayChange.toFixed(2);

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
    
    document.getElementById("bid").innerHTML = bid;
    document.getElementById("ask").innerHTML = ask;
    document.getElementById("current_price").innerHTML = price;  
    document.getElementById("ah_price").innerHTML = AHPrice;
    
    //company name
    var companyName = response.data.quoteResponse.result[0].shortName;
    document.getElementById("company_name").innerHTML = companyName;

    //ticker
    var ticker = "(" + response.data.quoteResponse.result[0].symbol + ")";
    document.getElementById("ticker").innerHTML = ticker;
   
    //currency
    var currency = response.data.quoteResponse.result[0].currency;
    document.getElementById("currency").innerHTML = currency;

    //volume
    var volume = parseInt(response.data.quoteResponse.result[0].regularMarketVolume);
    volume = volume.toLocaleString();
    document.getElementById("volume").innerHTML = volume;

    var avgVolume = parseInt(response.data.quoteResponse.result[0].averageDailyVolume3Month);
    avgVolume = avgVolume.toLocaleString();
    document.getElementById("avg_volume").innerHTML = avgVolume;

    

})
.catch(function (error) {
    console.log(error);
});

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
    .then(response => {
        var logoParsed = response.data;
        var logo = logoParsed.url;
        document.getElementById("logo").src = logo;
        
    })