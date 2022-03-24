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
function getSymbol() {
  var symbol = document.getElementById("stock-symbol-input").value;
  saveData(symbol);
  document.location.href = "stocks.html";
}
document.title = loadData();
var companyNameUrl = "https://api.twelvedata.com/stocks?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&country=US&symbol=";
companyNameUrl = companyNameUrl.concat(loadData());
axios.get(companyNameUrl)
  .then(response => {
    var companyName = response.data.data[0].name;
    document.getElementById("company-name").innerHTML = companyName;

  })
  .catch(function (error) {
    console.log(error);
  });

var accessTokenConfig = {
  method: 'post',
  url: 'https://api.tdameritrade.com/v1/oauth2/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: "grant_type=refresh_token&refresh_token=XjcIadXu73isZmpyIZT15UhN3mNp9ILkK3gGy26P0cs9DfBaJKlZqMoCxfuv5WjK0WoSd6%2B6xeprq2kM3qGNfBP3Cpcim38Mk%2FlsSC0fknzqDtJixmfKgqJBge8gv9RvUBd5ac%2BarfoijZguw00IwQH9Gl4yPbcQmE%2FaH8BV9YEDkpo2NrCcX5BON7M0t9XHFsuNhHT0yUq7Qsb7DZeOJGP%2BEysq%2FJ9fDeavKSkv45mt%2BgtA2u2ZULeltj7WR2Bkk8fGS6%2BZc9a%2Fccg%2BzIjowoyL36O1yMpZp%2FnbCNwepfgwT%2B9oXDN73NmNXdBx2bQSO8DsyN354S28Ye%2F%2B2vPAxixRdNZZ7HycpDs4HOeYOMdErR4Na9tMINN7D4Q%2BFOkqwYtCLb91CQuH3paL0sNWW0ZFzm6QbqexAFTe59AhAMCBJ85Wlg9pk1%2BqjqD100MQuG4LYrgoVi%2FJHHvlAZDqws0AsekPNvgb%2FLm9x6UdtaKtz9kcH9b%2FHFkjWThiatgCiEg0XA%2Fl%2FazTCx1YccujE0M2%2BXrdhReqaGX34ZJEoOfSh0MzRA%2BoMJhqHJoiEAid0ycT6Hf9TQ7pIsYhaCQA5dUDfJZ%2B%2FD2AUvmefxzQ4mbFiZcNVPLIOGMzSPY9X0T8Gwg69DId%2Fi6mQLiG6axVsIejer%2BaR3x6GmunBcO4SpcWroyHHZQkPnmc2AH4d9HGvkM33ANMZP38ybfnPgeZUoZX6vO%2BFPFYP%2BFw%2FOnpivZYJpsAzQLZYGNIxB7MZqVmLvX4mpPbsT7vXo5NlbrmNvQLNkiHYBbbtZA2ufJfppDUB4Rw%2FIrR3Ogkz%2F%2F6Qw3ckBDgFSzYQqm6yPB8IBjlUCFc5uRWTtFAjqL2E1DTpS6j%2FDEa%2BKbAze2%2FYzqC6XnFbzXXv6K%2BPY4%3D212FD3x19z9sWBHDJACbC00B75E&access_type=&code=&client_id=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH%40AMER.OAUTHAP&redirect_uri="
};

axios(accessTokenConfig)
  .then(function (response) {
    var accessToken = "Bearer " + response.data.access_token;

    var quoteConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/quotes?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH',
      headers: {
        Authorization: accessToken
      },
    };
    console.log(accessToken)

    axios(quoteConfig)
      .then(function (response) {

        var symbol = loadData().toUpperCase();
        var quoteResponse = response.data[symbol];

        var exchange = quoteResponse.exchangeName;
        if (exchange == "NASD") exchange = "NASDAQ"
        document.getElementById("exchange").innerHTML = exchange + ": ";
        document.getElementById("ticker").innerHTML = quoteResponse.symbol;

        var currency = "";
        var assetType = quoteResponse.assetType;
        if (assetType == "EQUITY") {
          currency = "$"
        }

        var bid = quoteResponse.bidPrice;

        var ask = quoteResponse.askPrice;

        var price = quoteResponse.regularMarketLastPrice;
        price = price.toFixed(2);
        price = price.toLocaleString("en-US");

        document.getElementById("currency").innerHTML = currency;
        document.getElementById("current-price").innerHTML = price;
        document.getElementById("bid").innerHTML = bid + " / "
        document.getElementById("ask").innerHTML = ask;

        var dayChange = quoteResponse.regularMarketNetChange;
        dayChange = dayChange.toFixed(2);

        var percentChange = quoteResponse.netPercentChangeInDouble;
        percentChange = percentChange.toFixed(2);

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"];
        
        const date = new Date();
        var month = monthNames[date.getMonth()];
        var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        document.getElementById("month-and-day").innerHTML = month + " " + date.getDate() + " ";
        document.getElementById("time").innerHTML = time;

        if (dayChange > 0) {
          toString(dayChange);
          toString(percentChange);
          document.getElementById("pos-day-price-change").innerHTML =  " + " + dayChange;
          document.getElementById("pos-day-percent-change").innerHTML =  " (" + percentChange + "%" + ")"; 
          var color = 'green';
          document.getElementById("pos-day-price-change").style.backgroundColor = 'rgb(' + 220 + ',' + 238 + ',' + 224 + ')';
          document.getElementById("neg-dayprice-change").style.paddingLeft = ("0");
          document.getElementById("neg-dayprice-change").style.paddingRight = ("0");
          document.getElementById("eq-day-price-change").style.paddingLeft = ("0");
          document.getElementById("eq-day-price-change").style.paddingRight = ("0");
          document.title = loadData() + " " + currency + price + " " + "+" + "(" + percentChange + "%)";

        }
        else if (dayChange < 0) {
          toString(dayChange);
          toString(percentChange);
          document.getElementById("neg-day-price-change").innerHTML = dayChange;
          document.getElementById("neg-day-percent-change").innerHTML =  " (" + percentChange + "%" + ")"; 
          document.getElementById("neg-day-price-change").style.backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          var color = 'red';
          document.getElementById("pos-day-price-change").style.paddingLeft = ("0");
          document.getElementById("pos-day-price-change").style.paddingRight = ("0");
          document.getElementById("eq-day-price-change").style.paddingLeft = ("0");
          document.getElementById("eq-day-price-change").style.paddingRight = ("0");
          document.title = loadData() + " " + currency + price + " " + "(" + percentChange + "%)";

        }
        else {
          toString(dayChange);
          percentChange = 0;
          toString(percentChange);
          document.getElementById("eq-day-price-change").innerHTML =  dayChange;
          document.getElementById("eq-day-percent-change").innerHTML =  " (" + percentChange + "%" + ")"; 
          document.getElementById("eq-day-price-change").style.backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          var color = '#7e7e7e';
          document.getElementById("neg-day-price-change").style.paddingLeft = ("0");
          document.getElementById("neg-day-price-change").style.paddingRight = ("0");
          document.getElementById("pos-day-price-change").style.paddingLeft = ("0");
          document.getElementById("pos-day-price-change").style.paddingRight = ("0");
          document.title = loadData() + " " + currency + price + " " + "(+" + percentChange + "%)";

        }
        dayChange = Number(dayChange);
        percentChange = Number(percentChange);

        var previousClose = price - dayChange;
        previousClose = previousClose.toFixed(2);
        document.getElementById("previous-close").innerHTML = previousClose;
        document.getElementById("open").innerHTML = quoteResponse.openPrice;
        var volume = quoteResponse.totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("volume").innerHTML = volume;
        document.getElementById("day-range").innerHTML = quoteResponse.lowPrice + " - " + quoteResponse.highPrice;
        var fiftyTwoHigh = quoteResponse["52WkHigh"];
        fiftyTwoHigh = fiftyTwoHigh.toFixed(2);
        var fiftyTwoLow = quoteResponse["52WkLow"];
        fiftyTwoLow = fiftyTwoLow.toFixed(2);
        document.getElementById("52-range").innerHTML = fiftyTwoLow + " - " + fiftyTwoHigh;
        //document.getElementById("div-yield").innerHTML = quoteResponse.divYield + "%";
        var fundamentals = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/instruments?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&projection=fundamental&symbol=' + loadData(),
          headers: {
            'Authorization': accessToken
          }
        };
        axios(fundamentals)
          .then(function (response) {
            var symbol = loadData().toUpperCase();
            var fundamentalsParsed = response.data[symbol].fundamental;
            var marketCap = price * fundamentalsParsed.sharesOutstanding;
            marketCap = marketCap.toLocaleString("en-US");
            var numCommas = 0;
            for (var i = 0; i < marketCap.length; i++) { //find number of commas in market cap
              if (marketCap[i] == ",") {
                numCommas++;
              }
            }
            //find where to put the decimal
            var numsBeforeComma = (marketCap.substring(0, marketCap.indexOf(','))).length;
            if (numsBeforeComma == 1) {
              marketCap = marketCap.substring(0, 1) + "." + marketCap.substring(2, 4);
            }
            if (numsBeforeComma == 2) {
              marketCap = marketCap.substring(0, 2) + "." + marketCap.substring(3, 5);
            }
            if (numsBeforeComma == 3) {
              marketCap = marketCap.substring(0, 3) + "." + marketCap.substring(4, 6);
            }
            //add suffix letter
            if (numCommas == 2) {
              marketcap += "M";
            }
            if (numCommas == 3) {
              marketCap += "B";
            }
            if (numCommas == 4) {
              marketCap += "T";
            }

            //document.getElementById("market-cap").innerHTML = marketCap;
            var peRatio = fundamentalsParsed.peRatio.toFixed(2);
            //document.getElementById("pe-ratio").innerHTML = peRatio;
            var avgVolume = fundamentalsParsed.vol1DayAvg;
            avgVolume = avgVolume.toLocaleString("en-US");
            document.getElementById("avg-volume").innerHTML = avgVolume;
            let dividentAmount = fundamentalsParsed.dividendAmount;
            //document.getElementById("div-amount").innerHTML = dividentAmount.toFixed(2);
          })

        axios.get("https://api.twelvedata.com/market_state?exchange=NYSE&apikey=921b0a05daf94bde867a7c42a2f236b0&dp")
          .then(response => {
            if (!response.data[0].is_market_open) {
              document.getElementById("ah-text").innerHTML = "After Hours: "
              document.getElementById("market-status").innerHTML = "Closed: ";
              var ahChange = quoteResponse.lastPrice - quoteResponse.regularMarketLastPrice;
              ahChange = ahChange.toFixed(2);
              var ahPercentChange = (ahChange / quoteResponse.regularMarketLastPrice) * 100;
              ahPercentChange = ahPercentChange.toFixed(2);
              document.getElementById("ah-price").innerHTML = quoteResponse.lastPrice;

              if (ahChange > 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("pos-ah-price-change").innerHTML = ahChange;
                document.getElementById("pos-ah-percent-change").innerHTML =  "(" + ahPercentChange + "%)";
              }
              if (ahChange < 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("neg-ah-price-change").innerHTML = ahChange;
                document.getElementById("neg-ah-percent-change").innerHTML = "(" + ahPercentChange + "%)";

              }
              if (ahChange == 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("eq-ah-price-change").innerHTML = ahChange;
                document.getElementById("eq-ah-percent-change").innerHTML = "(" + ahPercentChange + "%)";

              }
            }
            else {
              const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              var date = new Date();
              var month = monthNames[date.getMonth()];
              document.getElementById("market-status").innerHTML = "Open: ";
            }
          })
      })
    
    //chart
    var config = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + date.getTime() + '&startDate=' + date.getTime() + '&needExtendedHoursData=false',
      headers: { 
        'Authorization': accessToken
      }
    };    
    axios(chartConfig)
    .then(function (response) {
      console.log(response.data);
      let chartPoints = [];
      for (var i = 0; i < 390; i++) {
        chartPoints.push(response.data.candles[i].close);
      }
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      const labels = Utils.time({count: 390});
      const data = {
        labels: labels,
        datasets: [{
          label: none,
          data: chartPoints,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }]
      };
    })
  })

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol=";
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
  .then(response => {
    var logo = response.data.url;
    document.getElementById("logo").src = logo;
  })

function updateTime() {
  var date = new Date();
  var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  document.getElementById("time").innerHTML = time;
}
setInterval(function () {
  updateTime();
}, 2000);

window.addEventListener('load', function () {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});
