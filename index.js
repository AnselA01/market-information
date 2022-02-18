function saveData(symbol) {
    var symbol = {
      Symbol: symbol
    };
    symbol = symbol.Symbol;
    localStorage.setItem('_symbol', symbol);
}
function getSymbol(){
    var symbol = document.getElementById("symbolInput").value;
    saveData(symbol); //Turn API calls on and off
    var url = "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=";
    url = url.concat(symbol)
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
    var exchange = response.data.quoteResponse.result[0].exchange;
            if (exchange == "NYSE" || "NasdaqGS" || "OTC") {
                document.location.href="stocks.html"
            }
            if (exchange == "binance") {
                document.location.href="crypto.html"
            }
            if (exchange == "Forex") {
                document.location.href="forex.html";
            }
        })
    return symbol;
}


