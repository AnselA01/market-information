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

axios(config)  //receive data
.then(function (response) {
    //bid, ask, price
    var bid = parseFloat(response.data.quoteResponse.result[0].bid);
    var bidSize = parseFloat(response.data.quoteResponse.result[0].bidSize)    
    var ask = parseFloat(response.data.quoteResponse.result[0].ask);
    var askSize = parseFloat(response.data.quoteResponse.result[0].askSize)
    var price = (bid+ask)/2;
    
    price = price.toFixed(2); //round to two places
    bid = bid.toFixed(2);
    ask = ask.toFixed(2);
    
    document.getElementById("current_price").innerHTML = price;  
    document.getElementById("bid").innerHTML = bid;
    document.getElementById("bid_size").innerHTML = bidSize;
    document.getElementById("ask").innerHTML = ask;
    document.getElementById("ask_size").innerHTML = askSize;
    
    //company name
    var companyName = response.data.quoteResponse.result[0].shortName;
    document.getElementById("company_name").innerHTML = companyName;

    //ticker
    var ticker = "(" + response.data.quoteResponse.result[0].symbol + ")";
    document.getElementById("ticker").innerHTML = ticker;
   
    //currency
    var currency = response.data.quoteResponse.result[0].currency;
    document.getElementById("currency").innerHTML = currency;

    //price and percent changes
    var prevClose = parseFloat(response.data.quoteResponse.result[0].regularMarketPreviousClose);
    var dayChange = parseFloat(response.data.quoteResponse.result[0].regularMarketChange);
    var percentChange = (dayChange/prevClose) * 100;
    percentChange = percentChange.toFixed(2);
    dayChange = dayChange.toFixed(2);
    console.log(dayChange);
    console.log(typeof dayChange);

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

})
.catch(function (error) {
    console.log(error);
});

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
compLogoUrl = compLogoUrl + loadData();
axios.get(compLogoUrl)
    .then(response => {
        var logoParsed = response.data;
        var logo = logoParsed.url;
        document.getElementById("logo").src = logo;
        
    })