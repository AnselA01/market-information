function saveData(symbol) {
    var symbol = {
      Symbol: symbol
    };
    symbol = symbol.Symbol;
    localStorage.setItem('_symbol', symbol);
}

function loadData() {
    var symbol = localStorage.getItem('_symbol');
    if (!symbol) return false;
    return symbol;
}
var symbol = prompt("Enter a symbol");
saveData(symbol);

//exchange and where to direct user
var exchangeUrl = "https://api.twelvedata.com/quote?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
exchangeUrl = exchangeUrl.concat(symbol);
axios.get(exchangeUrl)
    .then(response => {
        var exchangeParsed = response.data;
        var exchange = exchangeParsed.exchange;
        console.log(exchange);
        if (exchange == "NYSE" || "NASDAQ" || "OTC") {
            document.location.href="stocks.html"
        }
        if (exchange == "binance") {
            document.location.href="crypto.html"
        }
        if (exchange == "Forex") {
            document.location.href="forex.html";
        }
    })
