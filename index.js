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

function getSymbol(){
    var symbol = document.getElementById("symbol-input").value;
    console.log(symbol);
    saveData(symbol); 
    
}
var url = "https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?region=US&lang=en&symbols=";
url = url.concat(loadData());
axios.get(url)
    .then(response => {
    //bid, ask, price
    var exchange = response.data.quoteResponse.result[0].exchange;
    console.log(exchange);
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



