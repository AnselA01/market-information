function loadData() {
    var symbol = localStorage.getItem('_symbol');
    if (!symbol) return false;
    return symbol;
    }
//price using curl
src="https://unpkg.com/axios/dist/axios.min.js";
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

axios(config) 
.then(function (response) {
  var bid = parseFloat(response.data.quoteResponse.result[0].bid);
  var ask = parseFloat(response.data.quoteResponse.result[0].ask);
  var price = (bid+ask)/2;
  document.getElementById("bid").innerHTML = bid;
  document.getElementById("ask").innerHTML = ask;
  document.getElementById("current_price").innerHTML = price;  

})
.catch(function (error) {
  console.log(error);
});

//company name
var comp_name_url = "https://api.twelvedata.com/quote?apikey=921b0a05daf94bde867a7c42a2f236b0&symbol="
comp_name_url = comp_name_url.concat(loadData());
axios.get(comp_name_url)
    .then(response => {
        var quoteParsed = response.data;
        var ticker = "(" + quoteParsed.symbol + ")";
        document.getElementById("ticker").innerHTML = ticker;
        var compName = quoteParsed.name;
        document.getElementById("company_name").innerHTML = compName;
        var currency = quoteParsed.currency;
        document.getElementById("currency").innerHTML = currency;
    })
//previous close
var prev_close_url = "https://api.twelvedata.com/time_series?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&interval=1day&previous_close=true&outputsize=1&symbol="
prev_close_url = prev_close_url.concat(loadData());
axios.get(prev_close_url)
    .then(response => {
        var parsed = response.data;
        var day_change = parseFloat(parsed.values[0].close)-parseFloat(parsed.values[0].previous_close);
        day_change = day_change.toFixed(2);
        var percent_change = (day_change / parseFloat(parsed.values[0].previous_close)) * 100;
        percent_change = percent_change.toFixed(2);
        
        if (day_change > 0) {
            toString(day_change);
            toString(percent_change);
            day_change = day_change + " " + "(" + percent_change + "%)";
            document.getElementById("pos_day_change").innerHTML = day_change;
        }
        else if (day_change < 0) {
            toString(day_change);
            toString(percent_change);
            day_change = day_change + " " + "(" + percent_change + "%)";
            document.getElementById("neg_day_change").innerHTML = day_change;

        }
        else {
            toString(day_change);
            toString(percent_change);
            day_change = day_change + " " + "(" + percent_change + "%)";
            document.getElementById("eq_day_change").innerHTML = day_change;
        }
    })

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol="
compLogoUrl = compLogoUrl + loadData();
axios.get(compLogoUrl)
    .then(response => {
        var logoParsed = response.data;
        var logo = logoParsed.url;
        document.getElementById("logo").src = logo;
        
    })