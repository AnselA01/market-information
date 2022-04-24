
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
  saveData(document.getElementById("stock-symbol-input").value);
  document.location.href = "index.html";
}
var symbol = loadData().toUpperCase();
document.title = loadData();
var companyNameUrl = "https://api.twelvedata.com/stocks?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&country=US&symbol=";
companyNameUrl = companyNameUrl.concat(loadData());
axios.get(companyNameUrl)
  .then(response => {
    if (response.data.data[0]) {
      document.getElementById("company-name").innerHTML = response.data.data[0].name;
    }
  })
function getMarketStatus() {
  var marketStatusConfig = {
    method: 'get',
    url: 'https://api.tdameritrade.com/v1/marketdata/EQUITY/hours?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&',
  };
  return axios(marketStatusConfig).then(response => response.data.equity.EQ.sessionHours);
}

function getAccessToken() {
  var accessTokenConfig = {
    method: 'post',
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: "grant_type=refresh_token&refresh_token=XjcIadXu73isZmpyIZT15UhN3mNp9ILkK3gGy26P0cs9DfBaJKlZqMoCxfuv5WjK0WoSd6%2B6xeprq2kM3qGNfBP3Cpcim38Mk%2FlsSC0fknzqDtJixmfKgqJBge8gv9RvUBd5ac%2BarfoijZguw00IwQH9Gl4yPbcQmE%2FaH8BV9YEDkpo2NrCcX5BON7M0t9XHFsuNhHT0yUq7Qsb7DZeOJGP%2BEysq%2FJ9fDeavKSkv45mt%2BgtA2u2ZULeltj7WR2Bkk8fGS6%2BZc9a%2Fccg%2BzIjowoyL36O1yMpZp%2FnbCNwepfgwT%2B9oXDN73NmNXdBx2bQSO8DsyN354S28Ye%2F%2B2vPAxixRdNZZ7HycpDs4HOeYOMdErR4Na9tMINN7D4Q%2BFOkqwYtCLb91CQuH3paL0sNWW0ZFzm6QbqexAFTe59AhAMCBJ85Wlg9pk1%2BqjqD100MQuG4LYrgoVi%2FJHHvlAZDqws0AsekPNvgb%2FLm9x6UdtaKtz9kcH9b%2FHFkjWThiatgCiEg0XA%2Fl%2FazTCx1YccujE0M2%2BXrdhReqaGX34ZJEoOfSh0MzRA%2BoMJhqHJoiEAid0ycT6Hf9TQ7pIsYhaCQA5dUDfJZ%2B%2FD2AUvmefxzQ4mbFiZcNVPLIOGMzSPY9X0T8Gwg69DId%2Fi6mQLiG6axVsIejer%2BaR3x6GmunBcO4SpcWroyHHZQkPnmc2AH4d9HGvkM33ANMZP38ybfnPgeZUoZX6vO%2BFPFYP%2BFw%2FOnpivZYJpsAzQLZYGNIxB7MZqVmLvX4mpPbsT7vXo5NlbrmNvQLNkiHYBbbtZA2ufJfppDUB4Rw%2FIrR3Ogkz%2F%2F6Qw3ckBDgFSzYQqm6yPB8IBjlUCFc5uRWTtFAjqL2E1DTpS6j%2FDEa%2BKbAze2%2FYzqC6XnFbzXXv6K%2BPY4%3D212FD3x19z9sWBHDJACbC00B75E&access_type=&code=&client_id=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH%40AMER.OAUTHAP&redirect_uri="
  };
  return axios(accessTokenConfig).then(response => response.data);
}
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
    axios(quoteConfig)
      .then(function (response) {
        var quoteResponse = response.data[symbol];
        if (quoteResponse.assetType == "ETF") {
          document.getElementById("company-name").innerHTML = quoteResponse.description;
        }
        var currency = "";
        var assetType = quoteResponse.assetType;
        if (assetType == "EQUITY") {
          assetType = "Equity";
          currency = "$";
        }
        if (assetType == "ETF") {
          currency = "$";
        }
        document.getElementById("currency").innerHTML = currency;
        // document.getElementById("bid").innerHTML = quoteResponse.bidPrice;
        // document.getElementById("ask").innerHTML = quoteResponse.askPrice;
        var price = quoteResponse.regularMarketLastPrice;
        if (price > 1) {
          price = price.toFixed(2);
        }
        else {
          price = price.toFixed(4);
        }

        //price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("current-price").innerHTML = price;

        var dayChange = quoteResponse.regularMarketNetChange;
        if (price < 0) {
          dayChange = dayChange.toFixed(4);
        }
        else {
          dayChange = dayChange.toFixed(2);
        }
        var percentChange = quoteResponse.regularMarketPercentChangeInDouble;
        percentChange = percentChange.toFixed(2);

        const date = new Date();

        if (dayChange > 0) {
          toString(dayChange);
          toString(percentChange);
          document.getElementById("pos-day-price-change").innerHTML = "+" + dayChange;
          document.getElementById("pos-day-price-change").style.display = "inline";
          document.getElementById("pos-day-percent-change").innerHTML = " (+" + percentChange + "%" + ")";
          var color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
          var backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("pos-day-price-change").style.backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("neg-day-price-change").style.display = "none";
          document.getElementById("eq-day-price-change").style.display = "none";
          document.title = loadData() + " " + currency + price + " " + "(+" + percentChange + "%)" + " | " + quoteResponse.description;
        }
        else if (dayChange < 0) {
          toString(dayChange);
          toString(percentChange);
          document.getElementById("neg-day-price-change").innerHTML = dayChange;
          document.getElementById("neg-day-percent-change").innerHTML = " (" + percentChange + "%" + ")";
          document.getElementById("neg-day-price-change").style.display = "inline";
          document.getElementById("neg-day-price-change").style.backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          var color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          var backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("pos-day-price-change").style.display = "none";
          document.getElementById("eq-day-price-change").style.display = "none";
          document.title = loadData() + " " + currency + price + " " + "(" + percentChange + "%)" + " | " + quoteResponse.description;
        }
        else {
          toString(dayChange);
          percentChange = 0;
          toString(percentChange);
          document.getElementById("eq-day-price-change").innerHTML = dayChange;
          document.getElementById("eq-day-percent-change").innerHTML = " (" + percentChange + "%" + ")";
          document.getElementById("eq-day-price-change").style.display = "inline";
          document.getElementById("eq-day-price-change").style.backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          var color = 'rgb(' + 130 + ',' + 130 + ',' + 130 + ')';
          var backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("neg-day-price-change").style.display = "none";
          document.getElementById("pos-day-price-change").style.display = "none";
          document.title = loadData() + " " + currency + price + " " + "(+" + percentChange + "%)" + " | " + quoteResponse.description;
        }
        var previousClose = price - dayChange;
        if (previousClose < 1) {
          previousClose = previousClose.toFixed(4);
        }
        else {
          previousClose = previousClose.toFixed(2);
        }
        document.getElementById("previous-close").innerHTML = previousClose
        document.getElementById("open").innerHTML = quoteResponse.openPrice.toFixed(2);
        var volume = quoteResponse.totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("volume").innerHTML = volume;
        document.getElementById("day-range").innerHTML = quoteResponse.lowPrice.toFixed(2) + " - " + quoteResponse.highPrice.toFixed(2);
        document.getElementById("52-range").innerHTML = quoteResponse["52WkLow"].toFixed(2) + " - " + quoteResponse["52WkHigh"].toFixed(2);

        var divYield = quoteResponse.divYield;
        if (divYield == 0) {
          document.getElementById("div-yield").innerHTML = "N/A";
        }
        else {
          document.getElementById("div-yield").innerHTML = quoteResponse.divYield + "%";
        }
        var fundamentals = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/instruments?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&projection=fundamental&symbol=' + loadData(),
          headers: {
            'Authorization': accessToken
          }
        };
        axios(fundamentals)
          .then(function (response) {
            var fundamentalsParsed = response.data[symbol].fundamental;

            var exchange = response.data[symbol].exchange;
            document.getElementById("primary-exchange").innerHTML = exchange;

            var sharesOutstanding = fundamentalsParsed.sharesOutstanding;
            sharesOutstanding = sharesOutstanding.toLocaleString("en-US");
            document.getElementById("shares-outstanding").innerHTML = sharesOutstanding;

            document.getElementById("ticker").innerHTML = symbol;

            document.getElementById("cusip").innerHTML = response.data[symbol].cusip

            document.getElementById("asset-type").innerHTML = assetType;

            document.getElementById("beta").innerHTML = fundamentalsParsed.beta.toFixed(2);

            var EPS = fundamentalsParsed.epsTTM;
            if (EPS == 0) {
              document.getElementById("eps").innerHTML = "N/A";
            }
            else {
              document.getElementById("eps").innerHTML = EPS.toFixed(2);
            }

            var marketCap = price * fundamentalsParsed.sharesOutstanding;
            marketCap = marketCap.toLocaleString("en-US");
            if (marketCap.includes('.')) {
              marketCap = marketCap.substring(0, marketCap.indexOf('.'));
            }
            var numCommas = 0;
            for (var i = 0; i < marketCap.length; i++) {
              if (marketCap[i] == ",") {
                numCommas++;
              }
            }
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
            if (numCommas == 2) {
              marketCap += "M";
            }
            if (numCommas == 3) {
              marketCap += "B";
            }
            if (numCommas == 4) {
              marketCap += "T";
            }
            document.getElementById("market-cap").innerHTML = marketCap;
            var peRatio = fundamentalsParsed.peRatio.toFixed(2);
            if (peRatio == 0) {
              document.getElementById("pe-ratio").innerHTML = "N/A";
            }
            else {
              document.getElementById("pe-ratio").innerHTML = peRatio;
            }
            var avgVolume = fundamentalsParsed.vol1DayAvg;
            avgVolume = avgVolume.toLocaleString("en-US");
            document.getElementById("avg-volume").innerHTML = fundamentalsParsed.vol1DayAvg.toLocaleString("en-US");
            let dividendAmount = fundamentalsParsed.dividendAmount;
            if (dividendAmount == 0) {
              document.getElementById("div-amount").innerHTML = "N/A";
            }
            else {
              document.getElementById("div-amount").innerHTML = dividendAmount.toFixed(2);
            }
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var exDivDate = fundamentalsParsed.dividendDate;
            if (exDivDate == " ") {
              document.getElementById("ex-div-date").innerHTML = "N/A";
            }
            else {
              exDivDateParsed = new Date(exDivDate);
              var exDivMonth = exDivDateParsed.getMonth();
              var exDivDay = exDivDateParsed.getDate();
              var exDivYear = exDivDateParsed.getFullYear();
              exDivDate = monthNames[exDivMonth] + " " + exDivDay + ", " + exDivYear;
              document.getElementById("ex-div-date").innerHTML = exDivDate;
            }
            var divDate = fundamentalsParsed.dividendPayDate;
            if (divDate == 0) {
              document.getElementById("div-date").innerHTML = "N/A";
            }
            else {
              divDateParsed = new Date(divDate);
              var divMonth = divDateParsed.getMonth();
              var divDay = divDateParsed.getDate();
              var divYear = divDateParsed.getFullYear();
              divDate = monthNames[divMonth] + " " + divDay + ", " + divYear;
              document.getElementById("div-date").innerHTML = divDate;
            }
          })
        //after hours
        axios.get("https://api.twelvedata.com/market_state?exchange=NYSE&apikey=921b0a05daf94bde867a7c42a2f236b0&dp")
          .then(response => {
            if (!response.data[0].is_market_open) {
              document.getElementById("after-hours").style.display = "block";
              document.getElementById("ah-currency").innerHTML = currency;
              var ahChange = quoteResponse.lastPrice - quoteResponse.regularMarketLastPrice;
              ahChange = ahChange.toFixed(2);
              var ahPercentChange = (ahChange / quoteResponse.regularMarketLastPrice) * 100;
              ahPercentChange = ahPercentChange.toFixed(2);
              let ahPrice = quoteResponse.lastPrice;
              ahPrice = ahPrice.toFixed(2);
              ahPrice = ahPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              document.getElementById("ah-price").innerHTML = ahPrice;

              if (ahChange > 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("pos-ah-price-change").innerHTML = "+" + ahChange;
                document.getElementById("pos-ah-percent-change").innerHTML = "(+" + ahPercentChange + "%)";
                document.getElementById("pos-ah-price-change").style.backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
                document.getElementById("pos-ah-price-change").style.display = "inline";
                document.getElementById("neg-ah-price-change").style.display = "none";
                document.getElementById("eq-ah-price-change").style.display = "none";
                document.getElementById("neg-ah-percent-change").style.display = "none";
                document.getElementById("eq-ah-percent-change").style.display = "none";
              }
              else if (ahChange < 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("neg-ah-price-change").innerHTML = ahChange;
                document.getElementById("neg-ah-percent-change").innerHTML = "(" + ahPercentChange + "%)";
                document.getElementById("neg-ah-price-change").style.backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
                document.getElementById("neg-ah-price-change").style.display = "inline";
                document.getElementById("pos-ah-price-change").style.display = "none";
                document.getElementById("eq-ah-price-change").style.display = "none";
                document.getElementById("pos-ah-percent-change").style.display = "none";
                document.getElementById("eq-ah-percent-change").style.display = "none";
              }
              else {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("eq-ah-price-change").innerHTML = ahChange;
                document.getElementById("eq-ah-percent-change").innerHTML = "(" + ahPercentChange + "%)";
                document.getElementById("eq-ah-price-change").style.backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')'
                document.getElementById("eq-ah-price-change").style.display = "inline";
                document.getElementById("pos-ah-price-change").style.display = "none";
                document.getElementById("neg-ah-price-change").style.display = "none";
                document.getElementById("pos-ah-percent-change").style.display = "none";
                document.getElementById("neg-ah-percent-change").style.display = "none";
              }
            }
            else {
              document.getElementById("after-hours").style.display = "none";
            }
          })
      })
    var quoteConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/quotes?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&symbol=%24SPX.X%2C%24NDX.X%2C%24DJI',
      headers: {
        'Authorization': accessToken,
      }
    };
    axios(quoteConfig)
      .then(function (quoteResponse) {
        var date = new Date();
        var currentTime = date.getTime();
        if (date.getDay() == 0) {
          currentTime = date.getTime() - 172800000;
        }
        if (date.getDay() == 6) {
          currentTime = date.getTime() - 86400000;
        }
        else if (date.getDay() != 0 && date.getDay() != 6) {
        }
        var sp500Config = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/marketdata/$SPX.X/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + currentTime + '&startDate=' + currentTime + '&needExtendedHoursData=false',
          headers: {
            'Authorization': accessToken,
          }
        };
        axios(sp500Config)
          .then(function (response) {
            var price = response.data.candles[response.data.candles.length - 1].close.toFixed(2);
            price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("sp500-price").innerHTML = price;
            var priceData = [];
            var change = quoteResponse.data["$SPX.X"].lastPrice - quoteResponse.data["$SPX.X"].closePrice;
            change = change.toFixed(2);
            if (change > 0) {
              color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
              document.getElementById("sp500-price-change").innerHTML = "+" + change;
            }
            else if (change < 0) {
              color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
              document.getElementById("sp500-price-change").innerHTML = change;
            }
            else {
              color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
              document.getElementById("sp500-price-change").innerHTML = change;
            }
            document.getElementById("sp500-change").style.color = color;
            var spxLabels = [];
            var numberOfCandles = response.data.candles.length;
            if (numberOfCandles == 84) {
              numberOfCandles -= 5;
            }
            for (var i = 0; i < numberOfCandles; i++) {
              spxLabels.push(" ");
            }
            for (var i = 1; i < numberOfCandles; i++) {
              priceData.push(response.data.candles[i].close.toFixed(2));
            }
            var percentChange = change / quoteResponse.data["$SPX.X"].closePrice * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              document.getElementById("sp500-percent-change").innerHTML = "(+" + percentChange + "%)";
            }
            else document.getElementById("sp500-percent-change").innerHTML = "(" + percentChange + "%)";
            priceData.unshift(response.data.candles[0].open);
            var sp500Chart = document.getElementById('sp500-chart-canvas').getContext('2d');
            var priceChart = new Chart(sp500Chart, {
              type: 'line',
              data: {
                labels: spxLabels,
                datasets: [{
                  data: priceData,
                  borderColor: color,
                  borderWidth: 2,
                  spanGaps: false,
                  fill: false,
                  tension: 1,
                },
                ]
              },
              options: {
                elements: {
                  point: {
                    radius: 0
                  }
                },
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                },
              }
            });
          })
        var nasdaqConfig = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/marketdata/$NDX.X/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + currentTime + '&startDate=' + currentTime + '&needExtendedHoursData=false',
          headers: {
            'Authorization': accessToken,
          }
        };
        axios(nasdaqConfig)
          .then(function (response) {
            var price = response.data.candles[response.data.candles.length - 1].close.toFixed(2);
            price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("nasdaq-price").innerHTML = price;
            var priceData = [];
            var change = quoteResponse.data["$NDX.X"].lastPrice - quoteResponse.data["$NDX.X"].closePrice;
            change = change.toFixed(2);
            if (change > 0) {
              color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
              document.getElementById("nasdaq-price-change").innerHTML = "+" + change;
            }
            else if (change < 0) {
              color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
              document.getElementById("nasdaq-price-change").innerHTML = change;
            }
            else {
              color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
              document.getElementById("nasdaq-price-change").innerHTML = change;
            }
            document.getElementById("nasdaq-change").style.color = color;
            var numberOfCandles = response.data.candles.length;
            if (numberOfCandles == 94) {
              numberOfCandles -= 15;
            }
            var spxLabels = [];
            for (var i = 0; i < numberOfCandles; i++) {
              spxLabels.push(" ");
            }
            for (var i = 1; i < numberOfCandles; i++) {
              priceData.push(response.data.candles[i].close.toFixed(2));
            }
            var percentChange = change / quoteResponse.data["$NDX.X"].closePrice * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              document.getElementById("nasdaq-percent-change").innerHTML = "(+" + percentChange + "%)";
            }
            else document.getElementById("nasdaq-percent-change").innerHTML = "(" + percentChange + "%)";

            priceData.unshift(response.data.candles[0].open);
            var nasdaqChart = document.getElementById('nasdaq-chart-canvas').getContext('2d');
            var priceChart = new Chart(nasdaqChart, {
              type: 'line',
              data: {
                labels: spxLabels,
                datasets: [{
                  data: priceData,
                  borderColor: color,
                  borderWidth: 2,
                  spanGaps: false,
                  fill: false,
                  tension: 1,
                }],
              },
              options: {
                elements: {
                  point: {
                    radius: 0
                  }
                },
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                },
              }
            });
          })
        var dowConfig = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/marketdata/$DJI/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + currentTime + '&startDate=' + currentTime + '&needExtendedHoursData=false',
          headers: {
            'Authorization': accessToken,
          }
        };
        axios(dowConfig)
          .then(function (response) {
            var price = response.data.candles[response.data.candles.length - 1].close;
            price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("dow-price").innerHTML = price;
            var priceData = [];
            var change = quoteResponse.data["$DJI"].lastPrice - quoteResponse.data["$DJI"].closePrice;
            change = change.toFixed(2);
            let color;
            if (change > 0) {
              color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
              document.getElementById("dow-price-change").innerHTML = "+" + change;
            }
            else if (change < 0) {
              color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
              document.getElementById("dow-price-change").innerHTML = change;
            }
            else {
              color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
              document.getElementById("dow-price-change").innerHTML = change;
            }
            document.getElementById("dow-change").style.color = color;
            var spxLabels = [];
            for (var i = 0; i < response.data.candles.length; i++) {
              spxLabels.push(" ");
            }
            for (var i = 1; i < response.data.candles.length - 1; i++) {
              priceData.push(response.data.candles[i].close.toFixed(2));
            }
            var percentChange = change / quoteResponse.data["$DJI"].closePrice * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              document.getElementById("dow-percent-change").innerHTML = "(+" + percentChange + "%)";
            }
            else document.getElementById("dow-percent-change").innerHTML = "(" + percentChange + "%)";
            priceData.unshift(response.data.candles[0].open);
            var dowChart = document.getElementById('dow-chart-canvas').getContext('2d');
            var priceChart = new Chart(dowChart, {
              type: 'line',
              data: {
                labels: spxLabels,
                datasets: [{
                  data: priceData,
                  borderColor: color,
                  borderWidth: 2,
                  spanGaps: false,
                  fill: false,
                  tension: 1,
                },
                ]
              },
              options: {
                elements: {
                  point: {
                    radius: 0
                  }
                },
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                    ticks: {
                      display: false,
                    }
                  }],
                },
              }
            });
          })
      })
  })
function changeInfoPaneOverview() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #BEBEBE 2.5px";

  document.getElementById("lower-information-overview").style.display = "block";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("options-failed-text").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function loadChart() {
  var date = new Date();
  getAccessToken().then(response => {
    var accessToken = "Bearer " + response.access_token;
    var chartTime = date.getTime();
    if (date.getDay() == 6) {
      chartTime = date.getTime() - 86400000;
    }
    else if (date.getDay() == 0) {
      chartTime = date.getTime() - 172800000
    }
    if (document.getElementById("pos-day-price-change").style.display != "none") {
      var oneDayColor = "#2A7331"
      var oneDayBackgroundColor = "#E7F4EA";
    }
    else if (document.getElementById("neg-day-price-change").style.display != "none") {
      var oneDayColor = "#950A0A"
      var oneDayBackgroundColor = "#F8E8E6";

    }
    else if (document.getElementById("eq-day-price-change").style.display != "none") {
      var oneDayColor = document.getElementById("eq-day-price-change").style.color;
      var oneDayBackgroundColor = document.getElementById("eq-day-price-change").style.backgroundColor;

    }
    var OneDaychartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + chartTime + '&startDate=' + chartTime + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(OneDaychartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        let chartValues = [];
        let volumeValues = [];
        for (var i = 0; i < numberOfCandles; i++) {
          chartValues.push(response.data.candles[i].close.toFixed(2));
          let date = new Date(response.data.candles[i].datetime);
          let hours = date.getHours() + 1;
          if (hours >= 12) {
            var suffix = " PM"
          }
          else var suffix = " AM";
          if (hours > 12) {
            hours -= 12;
          }
          let minutes = date.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          timesLabel.push(hours + ":" + minutes + suffix + " GMT-" + date.getTimezoneOffset() / 60);
          volumeValues.push(response.data.candles[i].volume);
        }
        chartValues.unshift(response.data.candles[0].open);
        volumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceCtx = document.getElementById('lower-information-chart-canvas-1d').getContext('2d');
        var priceChart = new Chart(priceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: chartValues,
              label: symbol,
              borderColor: oneDayColor,
              backgroundColor: oneDayBackgroundColor,
              pointBackgroundColor: oneDayColor,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var volumeCtx = document.getElementById('lower-information-volume-canvas-1d').getContext('2d');
        var volumeChart = new Chart(volumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: volumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
    //5 day chart
    var chartTime = date.getTime();
    var chartEndDate = date.getTime() - 432000000;
    var FiveDaychartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=5&endDate=' + chartTime + '&startDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(FiveDaychartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        var date = new Date();
        var month;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day;
        var hour;
        var minute;
        var timeZone;
        for (var i = 0; i < numberOfCandles; i++) {
          date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          hour = date.getHours();
          minute = date.getMinutes();
          timeZone = date.getTimezoneOffset() / 60;
          if (hour > 12) {
            hour -= 12;
            suffix = "PM";
          }
          else if (hour == 12) {
            suffix = "PM";
          }
          else suffix = "AM";
          if (minute < 10) {
            minute = "0" + minute;
          }
          fullTime = month + " " + day + ", " + hour + ":" + minute + " " + suffix + " " + "GMT-" + timeZone;
          timesLabel.push(fullTime);
        }
        let fiveDayChartValues = [];
        let fiveDayVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          fiveDayChartValues.push(response.data.candles[i].close.toFixed(2));
          fiveDayVolumeValues.push(response.data.candles[i].volume);
        }
        fiveDayChartValues.unshift(response.data.candles[0].open);
        fiveDayVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("5d-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("5d-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("5d-timescale-price-change").innerHTML = priceChange;
          document.getElementById("5d-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("5d-timescale-price-change").innerHTML = priceChange;
          document.getElementById("5d-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("5d-timescale-price-change").style.color = color;
        document.getElementById("5d-timescale-percent-change").style.color = color;
        var priceCtx = document.getElementById('lower-information-chart-canvas-5d').getContext('2d');
        var priceChart = new Chart(priceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: fiveDayChartValues,
              label: symbol,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var fiveDayVolumeCtx = document.getElementById('lower-information-volume-canvas-5d').getContext('2d');
        var volumeChart = new Chart(fiveDayVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: fiveDayVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
    //1 month chart
    var chartEndDate = date.getTime();
    var oneMonthChartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=month&period=1&frequencyType=daily&frequency=1&endDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(oneMonthChartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          let date = new Date(response.data.candles[i].datetime);
          let month = monthNames[date.getMonth()];
          let day = date.getDate();
          let year = date.getFullYear();
          fullTime = month + " " + day + ", " + year;
          timesLabel.push(fullTime);
        }
        timesLabel.push("");

        let oneMonthChartValues = [];
        let oneMonthVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          oneMonthChartValues.push(response.data.candles[i].close.toFixed(2));
          oneMonthVolumeValues.push(response.data.candles[i].volume);
        }
        oneMonthChartValues.unshift(response.data.candles[0].open);
        oneMonthVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("1m-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("1m-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("1m-timescale-price-change").innerHTML = priceChange;
          document.getElementById("1m-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("1m-timescale-price-change").innerHTML = priceChange;
          document.getElementById("1m-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("1m-timescale-price-change").style.color = color;
        document.getElementById("1m-timescale-percent-change").style.color = color;
        var priceCtx = document.getElementById('lower-information-chart-canvas-1m').getContext('2d');
        var priceChart = new Chart(priceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: oneMonthChartValues,
              label: symbol,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var oneMonthVolumeCtx = document.getElementById('lower-information-volume-canvas-1m').getContext('2d');
        var oneMonthVOlumeChart = new Chart(oneMonthVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: oneMonthVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
    //6 month chart
    var chartEndDate = date.getTime();
    var sixMonthChartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=month&period=6&frequencyType=daily&frequency=1&endDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(sixMonthChartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        var date = new Date();
        var year;
        var month;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day;
        for (var i = 0; i < numberOfCandles - 1; i++) {
          date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          fullTime = month + " " + day + ", " + year;
          timesLabel.push(fullTime);
        }
        timesLabel.push("");

        let sixMonthChartValues = [];
        let sixMonthVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          sixMonthChartValues.push(response.data.candles[i].close.toFixed(2));
          sixMonthVolumeValues.push(response.data.candles[i].volume);
        }
        sixMonthChartValues.unshift(response.data.candles[0].open);
        sixMonthVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("6m-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("6m-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("6m-timescale-price-change").innerHTML = priceChange;
          document.getElementById("6m-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("6m-timescale-price-change").innerHTML = priceChange;
          document.getElementById("6m-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("6m-timescale-price-change").style.color = color;
        document.getElementById("6m-timescale-percent-change").style.color = color;
        var sixMonthPriceCtx = document.getElementById('lower-information-chart-canvas-6m').getContext('2d');
        var priceChart = new Chart(sixMonthPriceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: sixMonthChartValues,
              label: symbol,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var sixMonthVolumeCtx = document.getElementById('lower-information-volume-canvas-6m').getContext('2d');
        var sixMonthVOlumeChart = new Chart(sixMonthVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: sixMonthVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
    //year to date chart
    var chartEndDate = date.getTime();
    var ytdChartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=ytd&period=1&frequencyType=daily&frequency=1&endDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(ytdChartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        var date = new Date();
        var year;
        var month;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day;
        for (var i = 0; i < numberOfCandles - 1; i++) {
          date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          fullTime = month + " " + day + ", " + year;
          timesLabel.push(fullTime);
        }
        timesLabel.push("");

        let ytdChartValues = [];
        let ytdVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          ytdChartValues.push(response.data.candles[i].close.toFixed(2));
          ytdVolumeValues.push(response.data.candles[i].volume);
        }
        ytdChartValues.unshift(response.data.candles[0].open);
        ytdVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("ytd-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("ytd-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("ytd-timescale-price-change").innerHTML = priceChange;
          document.getElementById("ytd-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("ytd-timescale-price-change").innerHTML = priceChange;
          document.getElementById("ytd-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("ytd-timescale-price-change").style.color = color;
        document.getElementById("ytd-timescale-percent-change").style.color = color;
        var ytdPriceCtx = document.getElementById('lower-information-chart-canvas-ytd').getContext('2d');
        var priceChart = new Chart(ytdPriceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: ytdChartValues,
              label: symbol,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var ytdVolumeCtx = document.getElementById('lower-information-volume-canvas-ytd').getContext('2d');
        var ytdVOlumeChart = new Chart(ytdVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: ytdVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString("en-US");
                  }
                }
              }]
            },
          }
        });
      })
    //1 year chart
    var chartEndDate = date.getTime();
    var oneYearChartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=year&period=1&frequencyType=daily&frequency=1&endDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(oneYearChartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        var date = new Date();
        var year;
        var month;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day;
        for (var i = 0; i < numberOfCandles - 1; i++) {
          date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          fullTime = month + " " + day + ", " + year;
          timesLabel.push(fullTime);
        }
        timesLabel.push("");

        let oneYearChartValues = [];
        let oneYearVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          oneYearChartValues.push(response.data.candles[i].close.toFixed(2));
          oneYearVolumeValues.push(response.data.candles[i].volume);
        }
        oneYearChartValues.unshift(response.data.candles[0].open);
        oneYearVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("1y-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("1y-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("1y-timescale-price-change").innerHTML = priceChange;
          document.getElementById("1y-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("1y-timescale-price-change").innerHTML = priceChange;
          document.getElementById("1y-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("1y-timescale-price-change").style.color = color;
        document.getElementById("1y-timescale-percent-change").style.color = color;
        var oneYearPriceCtx = document.getElementById('lower-information-chart-canvas-1y').getContext('2d');
        var priceChart = new Chart(oneYearPriceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: oneYearChartValues,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              label: symbol,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
            label: {
              display: false,
            },
          }
        });
        var oneYearVolumeCtx = document.getElementById('lower-information-volume-canvas-1y').getContext('2d');
        var oneYearVOlumeChart = new Chart(oneYearVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: oneYearVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
    //5 year chart
    var chartEndDate = date.getTime();
    var fiveYearChartConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=year&period=5&frequencyType=weekly&frequency=1&endDate=' + chartEndDate + '&needExtendedHoursData=false',
      headers: {
        'Authorization': accessToken
      }
    };
    axios(fiveYearChartConfig)
      .then(function (response) {
        var numberOfCandles = response.data.candles.length;
        var timesLabel = [];
        var date = new Date();
        var year;
        var month;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day;
        for (var i = 0; i < numberOfCandles - 1; i++) {
          date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          fullTime = month + " " + day + ", " + year;
          timesLabel.push(fullTime);
        }
        timesLabel.push("");

        let fiveYearChartValues = [];
        let fiveYearVolumeValues = [];
        for (var i = 0; i < numberOfCandles - 1; i++) {
          fiveYearChartValues.push(response.data.candles[i].close.toFixed(2));
          fiveYearVolumeValues.push(response.data.candles[i].volume);
        }
        fiveYearChartValues.unshift(response.data.candles[0].open);
        fiveYearVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
        var priceChange = response.data.candles[response.data.candles.length - 1].close - response.data.candles[0].open;
        priceChange = priceChange.toFixed(2);
        var percentChange = priceChange / response.data.candles[0].open * 100;
        percentChange = percentChange.toFixed(2);
        if (priceChange > 0) {
          color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
          backgroundColor = 'rgb(' + 231 + ',' + 244 + ',' + 234 + ')';
          document.getElementById("5y-timescale-price-change").innerHTML = "+" + priceChange;
          document.getElementById("5y-timescale-percent-change").innerHTML = "(+" + percentChange + "%)";
        }
        else if (priceChange < 0) {
          color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
          backgroundColor = 'rgb(' + 250 + ',' + 232 + ',' + 230 + ')';
          document.getElementById("5y-timescale-price-change").innerHTML = priceChange;
          document.getElementById("5y-timescale-percent-change").innerHTML = "(" + percentChange + "%)";
        }
        else {
          color = 'rgb(' + 58 + ',' + 58 + ',' + 58 + ')';
          backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
          document.getElementById("5y-timescale-price-change").innerHTML = priceChange;
          document.getElementById("5y-timescale-price-change").innerHTML = "(" + priceChange + "%)";
        }
        document.getElementById("5y-timescale-price-change").style.color = color;
        document.getElementById("5y-timescale-percent-change").style.color = color;
        var fiveYearPriceCtx = document.getElementById('lower-information-chart-canvas-5y').getContext('2d');
        var priceChart = new Chart(fiveYearPriceCtx, {
          type: 'line',
          data: {
            labels: timesLabel,
            datasets: [{
              data: fiveYearChartValues,
              label: symbol,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2,
              spanGaps: false,
              tension: 0.05,
            },
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });
        var fiveYearVolumeCtx = document.getElementById('lower-information-volume-canvas-5y').getContext('2d');
        var fiveYearVolumeChart = new Chart(fiveYearVolumeCtx, {
          type: 'bar',
          data: {
            labels: timesLabel,
            datasets: [{
              data: fiveYearVolumeValues,
              backgroundColor: 'rgb(' + 10 + ',' + 93 + ',' + 128 + ')',
            },]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if (parseInt(value) >= 1000) {
                    return "Volume: " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  else {
                    return "Volume: " + value;
                  }
                }
              },
              mode: 'index',
              intersect: false,
              displayColors: false,
            },
            hover: {
              mode: 'index',
              intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLine: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }]
            },
          }
        });
      })
  })
  changeChartTimescale1d();
}
loadChart();

function changeInfoPaneChart() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #BEBEBE 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "block";
  document.getElementById("lower-information-volume").style.display = "block";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("options-failed-text").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
  window.scrollTo(0, document.body.scrollHeight);
}
function changeChartTimescale1d() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "block";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "block";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = " ";
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescale5d() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "block";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "block";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = "5 day change: "
  document.getElementById("5d-timescale-price-change").style.display = "inline";
  document.getElementById("5d-timescale-percent-change").style.display = "inline";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescale1m() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "block";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "block";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = "1 month change: ";
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "inline";
  document.getElementById("1m-timescale-percent-change").style.display = "inline";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescale6m() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "block";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "block";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = "6 month change: "
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "inline";
  document.getElementById("6m-timescale-percent-change").style.display = "inline";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescaleYtd() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "block";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "block";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = "YTD change: ";
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "inline";
  document.getElementById("ytd-timescale-percent-change").style.display = "inline";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescale1y() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "block";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "none";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "block";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "none";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';

  document.getElementById("timescale-text").innerHTML = "1 year change: ";
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "inline";
  document.getElementById("1y-timescale-percent-change").style.display = "inline";
  document.getElementById("5y-timescale-price-change").style.display = "none";
  document.getElementById("5y-timescale-percent-change").style.display = "none";
}
function changeChartTimescale5y() {
  document.getElementById("lower-information-chart-canvas-1d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5d").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-6m").style.display = "none";
  document.getElementById("lower-information-chart-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-chart-canvas-1y").style.display = "none";
  document.getElementById("lower-information-chart-canvas-5y").style.display = "block";

  document.getElementById("lower-information-volume-canvas-1d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5d").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-6m").style.display = "none";
  document.getElementById("lower-information-volume-canvas-ytd").style.display = "none";
  document.getElementById("lower-information-volume-canvas-1y").style.display = "none";
  document.getElementById("lower-information-volume-canvas-5y").style.display = "block";

  document.getElementById("chart-timescale-1d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5d").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-6m").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-ytd").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-1y").style.color = 'rgb(' + 71 + ',' + 71 + ',' + 71 + ')';
  document.getElementById("chart-timescale-5y").style.color = 'rgb(' + 53 + ',' + 110 + ',' + 255 + ')';

  document.getElementById("timescale-text").innerHTML = "5 year change: ";
  document.getElementById("5d-timescale-price-change").style.display = "none";
  document.getElementById("5d-timescale-percent-change").style.display = "none";
  document.getElementById("1m-timescale-price-change").style.display = "none";
  document.getElementById("1m-timescale-percent-change").style.display = "none";
  document.getElementById("6m-timescale-price-change").style.display = "none";
  document.getElementById("6m-timescale-percent-change").style.display = "none";
  document.getElementById("ytd-timescale-price-change").style.display = "none";
  document.getElementById("ytd-timescale-percent-change").style.display = "none";
  document.getElementById("1y-timescale-price-change").style.display = "none";
  document.getElementById("1y-timescale-percent-change").style.display = "none";
  document.getElementById("5y-timescale-price-change").style.display = "inline";
  document.getElementById("5y-timescale-percent-change").style.display = "inline";
}
function changeInfoPaneNews() {
  const newsOptions = {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: {
      q: loadData(),
      lang: 'en',
    },
    headers: {
      'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
      'X-RapidAPI-Key': '90b777a670mshb854beab1255afcp1f2467jsnf1932c24c2ef'
    }
  };

  axios.request(newsOptions).then(function (response) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var articleNumber = [];
    for (var i = 0; i < response.data.articles.length - 1; i++) {
      if (response.data.articles[i].clean_url != "reddit.com" && response.data.articles[i].clean_url != "youtube.com" && response.data.articles[i].clean_url != "thesun.co.uk" && response.data.articles[i].clean_url != "ign.com" && response.data.articles[i].clean_url != "digitaltrends.com" && response.data.articles[i].clean_url != "metro.co.uk" && response.data.articles[i].clean_url != "sky.com" && response.data.articles[i].clean_url != "mdpi.com" && response.data.articles[i].topic != "entertainment") {
        articleNumber.push(i);
      }
    }
    if (articleNumber.length > 0) {
      var articleOne = response.data.articles[articleNumber[0]];
      document.getElementById("article-1-image-src").src = articleOne.media;
      document.getElementById("article-1-publisher").innerHTML = articleOne.clean_url;
      var date = new Date(articleOne.published_date);
      document.getElementById("article-1-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-1-title-link").innerHTML = articleOne.title;
      document.getElementById("article-1-title-link").href = articleOne.link;
      var articleOneSummary = articleOne.summary;
      if (articleOneSummary) {
        articleOneSummary = articleOneSummary.substring(0, 250) + "...";
        document.getElementById("article-1-summary").innerHTML = articleOneSummary;
      }
      document.getElementById("article-1-dot").innerHTML = "•";
    }
    if (articleNumber.length > 1) {
      var articleTwo = response.data.articles[articleNumber[1]];
      document.getElementById("article-2-image-src").src = articleTwo.media;
      document.getElementById("article-2-publisher").innerHTML = articleTwo.clean_url;
      var date = new Date(articleTwo.published_date);
      document.getElementById("article-2-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-2-title-link").innerHTML = articleTwo.title;
      document.getElementById("article-2-title-link").href = articleTwo.link;
      var articleTwoSummary = articleTwo.summary;
      if (articleTwoSummary) {
        articleTwoSummary = articleTwoSummary.substring(0, 250) + "...";
        document.getElementById("article-2-summary").innerHTML = articleTwoSummary;
      }
      document.getElementById("article-2-dot").innerHTML = "•";
    }
    if (articleNumber.length > 2) {
      var articleThree = response.data.articles[articleNumber[2]];
      document.getElementById("article-3-image-src").src = articleThree.media;
      document.getElementById("article-3-publisher").innerHTML = articleThree.clean_url;
      var date = new Date(articleThree.published_date);
      document.getElementById("article-3-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-3-title-link").innerHTML = articleThree.title;
      document.getElementById("article-3-title-link").href = articleThree.link;
      var articleThreeSummary = articleThree.summary;
      if (articleThreeSummary) {
        articleThreeSummary = articleThreeSummary.substring(0, 250) + "...";
        document.getElementById("article-3-summary").innerHTML = articleThreeSummary;
      }
      document.getElementById("article-3-dot").innerHTML = "•";
    }
    if (articleNumber.length > 3) {
      var articleFour = response.data.articles[articleNumber[3]];
      document.getElementById("article-4-image-src").src = articleFour.media;
      document.getElementById("article-4-publisher").innerHTML = articleFour.clean_url;
      var date = new Date(articleFour.published_date);
      document.getElementById("article-4-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-4-title-link").innerHTML = articleFour.title;
      document.getElementById("article-4-title-link").href = articleFour.link;
      var articleFourSummary = articleFour.summary;
      if (articleFourSummary) {
        articleFourSummary = articleFourSummary.substring(0, 250) + "...";
        document.getElementById("article-4-summary").innerHTML = articleFourSummary;
      }
      document.getElementById("article-4-dot").innerHTML = "•";
    }
    if (articleNumber.length > 4) {
      var articleFive = response.data.articles[articleNumber[4]];
      document.getElementById("article-5-image-src").src = articleFive.media;
      document.getElementById("article-5-publisher").innerHTML = articleFive.clean_url;
      var date = new Date(articleFive.published_date);
      document.getElementById("article-5-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-5-title-link").innerHTML = articleFive.title;
      document.getElementById("article-5-title-link").href = articleFive.link;
      var articleFiveSummary = articleFive.summary;
      if (articleFiveSummary) {
        articleFiveSummary = articleFiveSummary.substring(0, 250) + "...";
        document.getElementById("article-5-summary").innerHTML = articleFiveSummary;
      }
      document.getElementById("article-5-dot").innerHTML = "•";
    }
    if (articleNumber.length > 5) {
      var articleSix = response.data.articles[articleNumber[5]];
      document.getElementById("article-6-image-src").src = articleSix.media;
      document.getElementById("article-6-publisher").innerHTML = articleSix.clean_url;
      var date = new Date(articleSix.published_date);
      document.getElementById("article-6-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-6-title-link").innerHTML = articleSix.title;
      document.getElementById("article-6-title-link").href = articleSix.link;
      var articleSixSummary = articleSix.summary;
      if (articleSixSummary) {
        articleSixSummary = articleSixSummary.substring(0, 250) + "...";
        document.getElementById("article-6-summary").innerHTML = articleSixSummary;
      }
      document.getElementById("article-6-dot").innerHTML = "•";
    }
    if (articleNumber.length > 6) {
      var articleSeven = response.data.articles[articleNumber[6]];
      document.getElementById("article-7-image-src").src = articleSeven.media;
      document.getElementById("article-7-publisher").innerHTML = articleSeven.clean_url;
      var date = new Date(articleSeven.published_date);
      document.getElementById("article-7-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-7-title-link").innerHTML = articleSeven.title;
      document.getElementById("article-7-title-link").href = articleSeven.link;
      var articleSevenSummary = articleSeven.summary;
      if (articleSevenSummary) {
        articleSevenSummary = articleSevenSummary.substring(0, 250) + "...";
        document.getElementById("article-7-summary").innerHTML = articleSevenSummary;
      }
      document.getElementById("article-7-dot").innerHTML = "•";
    }
    if (articleNumber.length > 7) {
      var articleEight = response.data.articles[articleNumber[7]];
      document.getElementById("article-8-image-src").src = articleEight.media;
      document.getElementById("article-8-publisher").innerHTML = articleEight.clean_url;
      var date = new Date(articleEight.published_date);
      document.getElementById("article-8-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-8-title-link").innerHTML = articleEight.title;
      document.getElementById("article-8-title-link").href = articleEight.link;
      var articleEightSummary = articleEight.summary;
      if (articleEightSummary) {
        articleEightSummary = articleEightSummary.substring(0, 250) + "...";
        document.getElementById("article-8-summary").innerHTML = articleEightSummary;
      }
      document.getElementById("article-8-dot").innerHTML = "•";
    }
    if (articleNumber.length > 8) {
      var articleNine = response.data.articles[articleNumber[8]];
      document.getElementById("article-9-image-src").src = articleNine.media;
      document.getElementById("article-9-publisher").innerHTML = articleNine.clean_url;
      var date = new Date(articleNine.published_date);
      document.getElementById("article-9-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-9-title-link").innerHTML = articleNine.title;
      document.getElementById("article-9-title-link").href = articleNine.link;
      var articleNineSummary = articleNine.summary;
      if (articleNineSummary) {
        articleNineSummary = articleNineSummary.substring(0, 250) + "...";
        document.getElementById("article-9-summary").innerHTML = articleNineSummary;
      }
      document.getElementById("article-9-dot").innerHTML = "•";
    }
    if (articleNumber.length > 9) {
      var articleTen = response.data.articles[articleNumber[9]];
      document.getElementById("article-10-image-src").src = articleTen.media;
      document.getElementById("article-10-publisher").innerHTML = articleTen.clean_url;
      var date = new Date(articleTen.published_date);
      document.getElementById("article-10-date").innerHTML = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      document.getElementById("article-10-title-link").innerHTML = articleTen.title;
      document.getElementById("article-10-title-link").href = articleTen.link;
      var articleTenSummary = articleTen.summary;
      if (articleTenSummary) {
        articleTenSummary = articleTenSummary.substring(0, 250) + "...";
        document.getElementById("article-10-summary").innerHTML = articleTenSummary;
      }
      document.getElementById("article-10-dot").innerHTML = "•";
    }

  })

  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #BEBEBE 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "block";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("options-failed-text").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneOptions() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #BEBEBE 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";

  getAccessToken().then(response => {
    var accessToken = "Bearer " + response.access_token;
    var config = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/chains?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&symbol=' + loadData() + '&strikeCount=24&includeQuotes=FALSE',
      headers: {
        'Authorization': accessToken,
      }
    };
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    axios(config)
      .then(function (response) {
        if (response.data.status == "FAILED") {
          document.getElementById("options-failed-symbol").innerHTML = loadData();
          document.getElementById("options-failed-text").style.display = "block";
          console.log("here");
        }
        // console.log(response);
        document.getElementById("options-data-table-body").innerHTML = "";
        var expirationDateSelect = document.getElementById("expiration-dates");
        var optionsDataTableParent = document.getElementById("options-data-table-body");
        for (let i = 0; i < Object.keys(response.data.callExpDateMap).length; i++) {
          let expirationDateObj = Object.keys(response.data.callExpDateMap)[i].substring(0, 10);
          expirationDateObj = new Date(expirationDateObj);
          expirationDateObj.setDate(expirationDateObj.getDate() + 1);
          let expirationDate = expirationDateObj.toLocaleString('default', { month: 'long' }) + " " + expirationDateObj.getDate() + ", " + expirationDateObj.getFullYear();
          let expirationDateOption = document.createElement("option");
          expirationDateOption.setAttribute("id", "expiration-date-option-" + i);
          let optionsDataTable = document.createElement("tr");
          optionsDataTable.setAttribute("id", "options-data-row-" + i);
          optionsDataTableParent.appendChild(optionsDataTable);
          expirationDateOption.value = expirationDate;
          expirationDateOption.innerHTML = expirationDate;
          expirationDateSelect.appendChild(expirationDateOption);
          if (i < 1) {
            expirationDateSelect.value = document.getElementById("expiration-date-option-0");
            optionExpirationSelectChange(response, 0);
          }
          document.getElementById("expiration-dates").onchange = function () {
            document.getElementById("options-header-text-date").innerHTML = expirationDateSelect.value;
            optionExpirationSelectChange(response, expirationDateSelect.selectedIndex);
          }
        }
      })
  })
}
function optionExpirationSelectChange(response, selectedIndex) {
  document.getElementById("options-data-table-body").innerHTML = "";
  let expirationDateObj = Object.keys(response.data.callExpDateMap)[selectedIndex].substring(0, 10);
  expirationDateObj = new Date(expirationDateObj);
  expirationDateObj.setDate(expirationDateObj.getDate() + 1);
  document.getElementById("options-header-text-date").innerHTML = expirationDateObj.toLocaleString('default', { month: 'long' }) + " " + expirationDateObj.getDate() + ", " + expirationDateObj.getFullYear();

  let callObject = response.data.callExpDateMap[Object.keys(response.data.callExpDateMap)[selectedIndex]];
  let putObject = response.data.putExpDateMap[Object.keys(response.data.putExpDateMap)[selectedIndex]];
  let table = document.getElementById("options-data-table-body");
  for (let i = 0; i < Object.keys(callObject).length; i++) {
    let row = table.insertRow(i);
    let callPriceCell = row.insertCell(0);
    callPriceCell.innerHTML = callObject[Object.keys(callObject)[i]][0].last.toFixed(2);
    let callChangeCell = row.insertCell(1);
    let callChangeNum = callObject[Object.keys(callObject)[i]][0].netChange.toFixed(2);
    let callPercentChangeCell = row.insertCell(2);
    let callPercentChangeNum = (callObject[Object.keys(callObject)[i]][0].netChange / (callObject[Object.keys(callObject)[i]][0].netChange + callObject[Object.keys(callObject)[i]][0].last)) * 100;
    callPercentChangeNum = callPercentChangeNum.toFixed(2);
    if (callChangeNum > 0) {
      callChangeCell.style.color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
      callChangeCell.innerHTML = "+" + callChangeNum;
    }
    else if (callChangeNum < 0) {
      callChangeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
      callChangeCell.innerHTML = callChangeNum;
    }
    else {
      callChangeCell.style.color = 'rgb(' + 130 + ',' + 130 + ',' + 130 + ')';
      callChangeCell.innerHTML = callChangeNum;
    }

    if (callPercentChangeNum > 0) {
      callPercentChangeCell.style.color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
      callPercentChangeCell.innerHTML = "+" + callPercentChangeNum + "%";
    }
    else if (callPercentChangeNum < 0) {
      callPercentChangeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
      callPercentChangeCell.innerHTML = callPercentChangeNum + "%";
    }
    else {
      callPercentChangeCell.style.color = 'rgb(' + 130 + ',' + 130 + ',' + 130 + ')';
      callPercentChangeCell.innerHTML = callPercentChangeNum + "%";
    }
    let callVolumeCell = row.insertCell(3)
    callVolumeCell.innerHTML = callObject[Object.keys(callObject)[i]][0].totalVolume.toLocaleString("en-US");
    let callOpenInterestCell = row.insertCell(4);
    callOpenInterestCell.innerHTML = callObject[Object.keys(callObject)[i]][0].openInterest.toLocaleString("en-US");

    let strike = row.insertCell(5);
    strike.innerHTML = putObject[Object.keys(putObject)[i]][0].strikePrice;
    
    strike.setAttribute("class", "options-strike-cell");
    strike.onclick = function() {
      if (strike.innerHTML.slice(-2) != ".5") var newStrike = strike.innerHTML + ".0";
      else var newStrike = strike.innerHTML;
      console.log(callObject[newStrike][0]);
      console.log(callObject[newStrike][0].description);
      if (callObject[newStrike][0].description.includes('(')) {
        var callOptionTitle = callObject[newStrike][0].description.substring(0, callObject[newStrike][0].description.indexOf('(') - 1);
        var putOptionTitle = putObject[newStrike][0].description.substring(0, putObject[newStrike][0].description.indexOf('(') - 1);
      }
      else {
        var callOptionTitle = callObject[newStrike][0].description;
        var putOptionTitle = putObject[newStrike][0].description;
      }
      document.getElementById("sidebar-call-option-title").innerHTML = callOptionTitle;
      let bidPrice = callObject[newStrike][0].bid;
      bidPrice = bidPrice.toFixed(2);
      document.getElementById("sidebar-call-bid").innerHTML = bidPrice;
      document.getElementById("sidebar-call-bid-size").innerHTML = "x " + callObject[newStrike][0].bidSize;

      let last = callObject[newStrike][0].last;
      last = last.toFixed(2);
      document.getElementById("sidebar-call-last").innerHTML = last;

      let askPrice = callObject[newStrike][0].ask;
      askPrice = askPrice.toFixed(2);
      document.getElementById("sidebar-call-ask").innerHTML = askPrice;
      document.getElementById("sidebar-call-ask-size").innerHTML = "x " + callObject[newStrike][0].askSize;

      let mark = callObject[newStrike][0].mark; 
      mark = mark.toFixed(2);
      document.getElementById("sidebar-call-mark").innerHTML = mark;
      let highPrice = callObject[newStrike][0].highPrice;
      highPrice = highPrice.toFixed(2);
      document.getElementById("sidebar-call-high").innerHTML = highPrice;
      let lowPrice = callObject[newStrike][0].lowPrice;
      lowPrice = lowPrice.toFixed(2);
      document.getElementById("sidebar-call-low").innerHTML = lowPrice;

      document.getElementById("sidebar-call-delta").innerHTML = callObject[newStrike][0].delta;
      document.getElementById("sidebar-call-iv").innerHTML = callObject[newStrike][0].volatility;
      document.getElementById("sidebar-call-gamma").innerHTML = callObject[newStrike][0].gamma;

      document.getElementById("sidebar-call-rho").innerHTML = callObject[newStrike][0].rho;
      document.getElementById("sidebar-call-theta").innerHTML = callObject[newStrike][0].theta;
      document.getElementById("sidebar-call-vega").innerHTML = callObject[newStrike][0].vega;

      document.getElementById("sidebar-put-option-title").innerHTML = putOptionTitle;
      bidPrice = putObject[newStrike][0].bid;
      bidPrice = bidPrice.toFixed(2);
      document.getElementById("sidebar-put-bid").innerHTML = bidPrice;
      document.getElementById("sidebar-put-bid-size").innerHTML = "x " + putObject[newStrike][0].bidSize;

      last = putObject[newStrike][0].last;
      last = last.toFixed(2);
      document.getElementById("sidebar-put-last").innerHTML = last;

      askPrice = putObject[newStrike][0].ask;
      askPrice = askPrice.toFixed(2);
      document.getElementById("sidebar-put-ask").innerHTML = askPrice;
      document.getElementById("sidebar-put-ask-size").innerHTML = "x " + putObject[newStrike][0].askSize;

      mark = putObject[newStrike][0].mark; 
      mark = mark.toFixed(2);
      document.getElementById("sidebar-put-mark").innerHTML = mark;
      highPrice = putObject[newStrike][0].highPrice;
      highPrice = highPrice.toFixed(2);
      document.getElementById("sidebar-put-high").innerHTML = highPrice;
      lowPrice = putObject[newStrike][0].lowPrice;
      lowPrice = lowPrice.toFixed(2);
      document.getElementById("sidebar-put-low").innerHTML = lowPrice;

      document.getElementById("sidebar-put-delta").innerHTML = putObject[newStrike][0].delta;
      document.getElementById("sidebar-put-iv").innerHTML = putObject[newStrike][0].volatility;
      document.getElementById("sidebar-put-gamma").innerHTML = putObject[newStrike][0].gamma;

      document.getElementById("sidebar-put-rho").innerHTML = putObject[newStrike][0].rho;
      document.getElementById("sidebar-put-theta").innerHTML = putObject[newStrike][0].theta;
      document.getElementById("sidebar-put-vega").innerHTML = putObject[newStrike][0].vega;
      
      document.getElementById("options-sidebar").style.display = "inline-flex";
    }
    strike.style.fontWeight = "bold";
    strike.style.borderLeft = "solid black 0.5px";
    strike.style.borderRight = "solid black 0.5px";
    strike.innerHTML = putObject[Object.keys(putObject)[i]][0].strikePrice;

    let putPriceCell = row.insertCell(6);
    putPriceCell.innerHTML = putObject[Object.keys(putObject)[i]][0].last.toFixed(2);
    let putChangeCell = row.insertCell(7);
    let putChangeNum = putObject[Object.keys(putObject)[i]][0].netChange.toFixed(2);
    let putPercentChangeCell = row.insertCell(8);
    let putPercentChangeNum = putObject[Object.keys(putObject)[i]][0].percentChange.toFixed(2);
    if (putChangeNum > 0) {
      putChangeCell.style.color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
      putChangeCell.innerHTML = "+" + putChangeNum;
    }
    else if (putChangeNum < 0) {
      putChangeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
      putChangeCell.innerHTML = putChangeNum;
    }
    else {
      putChangeCell.style.color = 'rgb(' + 130 + ',' + 130 + ',' + 130 + ')';
      putChangeCell.innerHTML = putChangeNum;
    }
    if (putPercentChangeNum > 0) {
      putPercentChangeCell.style.color = 'rgb(' + 42 + ',' + 115 + ',' + 49 + ')';
      putPercentChangeCell.innerHTML = "+" + putPercentChangeNum + "%";
    }
    else if (putPercentChangeNum < 0) {
      putPercentChangeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
      putPercentChangeCell.innerHTML = putPercentChangeNum + "%";
    }
    else {
      putPercentChangeCell.style.color = 'rgb(' + 130 + ',' + 130 + ',' + 130 + ')';
      putPercentChangeCell.innerHTML = putPercentChangeNum + "%";
    }
    let putVolumeCell = row.insertCell(9)
    putVolumeCell.innerHTML = putObject[Object.keys(putObject)[i]][0].totalVolume.toLocaleString("en-US");
    let putOpenInterestCell = row.insertCell(10);
    putOpenInterestCell.innerHTML = putObject[Object.keys(putObject)[i]][0].openInterest.toLocaleString("en-US");
    if (strike.innerHTML < document.getElementById("current-price").innerHTML) {
      callPriceCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      callChangeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      callPercentChangeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      callVolumeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      callOpenInterestCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
    }
    else if (strike > document.getElementById("current-price").innerHTML) {
      putPriceCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      putChangeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      putPercentChangeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      putVolumeCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
      putOpenInterestCell.style.backgroundColor = "rgb(" + 226 + ", " + 240 + ", " + 255 + ")";
    }
  }
  document.getElementById("options-sidebar").style.display = "none";
  document.getElementById("lower-information-options").style.display = "block";
}
function changeInfoPaneHistorical() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #356EFF 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("options-failed-text").style.display = "none";
  changeInfoPaneHistoricalDaily();
  document.getElementById("lower-information-historical").style.display = "block";
}
function changeInfoPaneHistoricalDaily() {
  document.getElementById("lower-information-historical-daily").style.display = "block";
  document.getElementById("timeframe-selector-text-daily").style.color = "black";
  document.getElementById("lower-information-historical-weekly").style.display = "none";
  document.getElementById("timeframe-selector-text-weekly").style.color = "#356EFF";
  document.getElementById("lower-information-historical-monthly").style.display = "none";
  document.getElementById("timeframe-selector-text-monthly").style.color = "#356EFF";

  document.getElementById("historical-table-body-weekly").innerHTML = "";
  document.getElementById("historical-table-body-monthly").innerHTML = "";

  getAccessToken().then(response => {
    let accessToken = response.access_token;
    var config = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=year&period=1&frequencyType=daily&frequency=1&needExtendedHoursData=false',
      headers: {
        'Authorization': "Bearer " + accessToken,
      }
    };
    axios(config)
      .then(function (response) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const table = document.getElementById("historical-table-body-daily");
        for (let i = 0; i < response.data.candles.length - 1; i++) {
          let row = table.insertRow(0);
          let dateCell = row.insertCell(0);
          dateCell.style.width = 1 / 6 * 100 + "%";
          dateCell.style.whiteSpace = "nowrap";
          dateCell.style.float = "left";
          dateCell.style.fontWeight = "bold";
          dateCell.style.fontSize = "14.5px";
          let date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          let fullDate = month + " " + day + ", " + year;
          dateCell.innerHTML = fullDate;

          let openCell = row.insertCell(1);
          openCell.style.width = 1 / 6 * 100 + "%";
          openCell.style.fontSize = "14.5px";
          let openPrice = response.data.candles[i].open;
          openPrice = openPrice.toFixed(2);
          openCell.innerHTML = openPrice;

          let highCell = row.insertCell(2);
          highCell.style.width = 1 / 6 * 100 + "%";
          highCell.style.fontSize = "14.5px";
          let highPrice = response.data.candles[i].high;
          highPrice = highPrice.toFixed(2);
          highCell.innerHTML = highPrice;

          let lowCell = row.insertCell(3);
          lowCell.style.width = 1 / 6 * 100 + "%";
          lowCell.style.fontSize = "14.5px";
          let lowPrice = response.data.candles[i].low;
          lowPrice = lowPrice.toFixed(2);
          lowCell.innerHTML = lowPrice;

          let closeCell = row.insertCell(4);
          closeCell.style.width = 1 / 6 * 100 + "%";
          closeCell.style.fontSize = "14.5px";
          let closePrice = response.data.candles[i].close;
          closePrice = closePrice.toFixed(2);
          closeCell.innerHTML = closePrice;

          let changeCell = row.insertCell(5);
          changeCell.style.width = 1 / 6 * 100 + "%";
          changeCell.style.fontSize = "14.5px"
          if (i > 0) {
            let percentChange = ((response.data.candles[i].close - response.data.candles[i - 1].close) / response.data.candles[i - 1].close) * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              percentChange = "+" + percentChange;
              changeCell.style.color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
            }
            else if (percentChange < 0) {
              changeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
            }
            else {
              changeCell.style.color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
            }
            changeCell.innerHTML = percentChange + "%";
          }

          let volumeCell = row.insertCell(6);
          volumeCell.style.whiteSpace = "nowrap";
          volumeCell.style.float = "right";
          volumeCell.style.fontSize = "14.5px";
          let volume = response.data.candles[i].volume;
          volume = volume.toLocaleString("en-US");
          volumeCell.innerHTML = volume;
        }
      })
  })
}
function changeInfoPaneHistoricalWeekly() {
  document.getElementById("lower-information-historical-daily").style.display = "none";
  document.getElementById("timeframe-selector-text-daily").style.color = "#356EFF";
  document.getElementById("lower-information-historical-weekly").style.display = "block";
  document.getElementById("timeframe-selector-text-weekly").style.color = "black";
  document.getElementById("lower-information-historical-monthly").style.display = "none";
  document.getElementById("timeframe-selector-text-monthly").style.color = "#356EFF";

  document.getElementById("historical-table-body-daily").innerHTML = "";
  document.getElementById("historical-table-body-monthly").innerHTML = "";
  getAccessToken().then(response => {
    let accessToken = response.access_token;
    var config = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=year&period=2&frequencyType=weekly&frequency=1&needExtendedHoursData=false',
      headers: {
        'Authorization': "Bearer " + accessToken,
      }
    };
    axios(config)
      .then(function (response) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const table = document.getElementById("historical-table-body-weekly");
        for (let i = 0; i < response.data.candles.length - 1; i++) {
          let row = table.insertRow(0);
          let dateCell = row.insertCell(0);
          dateCell.style.width = 1 / 6 * 100 + "%";
          dateCell.style.whiteSpace = "nowrap";
          dateCell.style.float = "left";
          dateCell.style.fontWeight = "bold";
          dateCell.style.fontSize = "14.5px";
          let date = new Date(response.data.candles[i].datetime);
          month = monthNames[date.getMonth()];
          day = date.getDate();
          year = date.getFullYear();
          let fullDate = month + " " + day + ", " + year;
          dateCell.innerHTML = fullDate;

          let openCell = row.insertCell(1);
          openCell.style.width = 1 / 6 * 100 + "%";
          openCell.style.fontSize = "14.5px";
          let openPrice = response.data.candles[i].open;
          openPrice = openPrice.toFixed(2);
          openCell.innerHTML = openPrice;

          let highCell = row.insertCell(2);
          highCell.style.width = 1 / 6 * 100 + "%";
          highCell.style.fontSize = "14.5px";
          let highPrice = response.data.candles[i].high;
          highPrice = highPrice.toFixed(2);
          highCell.innerHTML = highPrice;

          let lowCell = row.insertCell(3);
          lowCell.style.width = 1 / 6 * 100 + "%";
          lowCell.style.fontSize = "14.5px";
          let lowPrice = response.data.candles[i].low;
          lowPrice = lowPrice.toFixed(2);
          lowCell.innerHTML = lowPrice;

          let closeCell = row.insertCell(4);
          closeCell.style.width = 1 / 6 * 100 + "%";
          closeCell.style.fontSize = "14.5px";
          let closePrice = response.data.candles[i].close;
          closePrice = closePrice.toFixed(2);
          closeCell.innerHTML = closePrice;

          let changeCell = row.insertCell(5);
          changeCell.style.width = 1 / 6 * 100 + "%";
          changeCell.style.fontSize = "14.5px"
          if (i > 0) {
            let percentChange = ((response.data.candles[i].close - response.data.candles[i - 1].close) / response.data.candles[i - 1].close) * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              percentChange = "+" + percentChange;
              changeCell.style.color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
            }
            else if (percentChange < 0) {
              changeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
            }
            else {
              changeCell.style.color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
            }
            changeCell.innerHTML = percentChange + "%";
          }

          let volumeCell = row.insertCell(6);
          volumeCell.style.whiteSpace = "nowrap";
          volumeCell.style.float = "right";
          volumeCell.style.fontSize = "14.5px";
          let volume = response.data.candles[i].volume;
          volume = volume.toLocaleString("en-US");
          volumeCell.innerHTML = volume;
        }
      })
  })
}
function changeInfoPaneHistoricalMonthly() {
  document.getElementById("lower-information-historical-daily").style.display = "none";
  document.getElementById("timeframe-selector-text-daily").style.color = "#356EFF";
  document.getElementById("lower-information-historical-weekly").style.display = "none";
  document.getElementById("timeframe-selector-text-weekly").style.color = "#356EFF";
  document.getElementById("lower-information-historical-monthly").style.display = "block";
  document.getElementById("timeframe-selector-text-monthly").style.color = "black";

  document.getElementById("historical-table-body-daily").innerHTML = "";
  document.getElementById("historical-table-body-weekly").innerHTML = "";
  getAccessToken().then(response => {
    let accessToken = response.access_token;
    var config = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=year&period=10&frequencyType=monthly&frequency=1&needExtendedHoursData=false',
      headers: {
        'Authorization': "Bearer " + accessToken,
      }
    };
    axios(config)
      .then(function (response) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const table = document.getElementById("historical-table-body-monthly");
        for (let i = 0; i < response.data.candles.length - 1; i++) {
          let row = table.insertRow(0);
          let dateCell = row.insertCell(0);
          dateCell.style.width = 1 / 6 * 100 + "%";
          dateCell.style.whiteSpace = "nowrap";
          dateCell.style.float = "left";
          dateCell.style.fontWeight = "bold";
          dateCell.style.fontSize = "14.5px";
          let date = new Date(response.data.candles[i].datetime);
          dateCell.innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();;

          let openCell = row.insertCell(1);
          openCell.style.width = 1 / 6 * 100 + "%";
          openCell.style.fontSize = "14.5px";
          let openPrice = response.data.candles[i].open;
          openPrice = openPrice.toFixed(2);
          openCell.innerHTML = openPrice;

          let highCell = row.insertCell(2);
          highCell.style.width = 1 / 6 * 100 + "%";
          highCell.style.fontSize = "14.5px";
          let highPrice = response.data.candles[i].high;
          highPrice = highPrice.toFixed(2);
          highCell.innerHTML = highPrice;

          let lowCell = row.insertCell(3);
          lowCell.style.width = 1 / 6 * 100 + "%";
          lowCell.style.fontSize = "14.5px";
          let lowPrice = response.data.candles[i].low;
          lowPrice = lowPrice.toFixed(2);
          lowCell.innerHTML = lowPrice;

          let closeCell = row.insertCell(4);
          closeCell.style.width = 1 / 6 * 100 + "%";
          closeCell.style.fontSize = "14.5px";
          let closePrice = response.data.candles[i].close;
          closePrice = closePrice.toFixed(2);
          closeCell.innerHTML = closePrice;

          let changeCell = row.insertCell(5);
          changeCell.style.width = 1 / 6 * 100 + "%";
          changeCell.style.fontSize = "14.5px"
          if (i > 0) {
            let percentChange = ((response.data.candles[i].close - response.data.candles[i - 1].close) / response.data.candles[i - 1].close) * 100;
            percentChange = percentChange.toFixed(2);
            if (percentChange > 0) {
              percentChange = "+" + percentChange;
              changeCell.style.color = 'rgb(' + 41 + ',' + 115 + ',' + 49 + ')';
            }
            else if (percentChange < 0) {
              changeCell.style.color = 'rgb(' + 157 + ',' + 12 + ',' + 12 + ')';
            }
            else {
              changeCell.style.color = 'rgb(' + 100 + ',' + 100 + ',' + 100 + ')';
            }
            changeCell.innerHTML = percentChange + "%";
          }

          let volumeCell = row.insertCell(6);
          volumeCell.style.whiteSpace = "nowrap";
          volumeCell.style.float = "right";
          volumeCell.style.fontSize = "14.5px";
          let volume = response.data.candles[i].volume;
          volume = volume.toLocaleString("en-US");
          volumeCell.innerHTML = volume;
        }
      })
  })
}
function changeInfoPaneForum() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #BEBEBE 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #BEBEBE 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "block";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("options-failed-text").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol=";
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
  .then(response => {
    document.getElementById("logo").src = response.data.url;
    if (document.getElementById("logo")) {
      document.getElementById("logo").style.border = " 0.5px solid #9b9b9b";
    }
  })

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
function addToWatchlist() {

  getAccessToken().then(accessTokenResponse => {

    var data = JSON.stringify({
      name: "marketInformationWebsiteWatchlist",
      watchlistId: "1911392956",
      watchlistItems: [
        {
          instrument: {
            symbol: loadData(),
            assetType: "EQUITY"
          },
          sequenceId: 0
        }
      ]
    });

    var config = {
      method: 'patch',
      url: 'https://api.tdameritrade.com/v1/accounts/250077377/watchlists/1911392956',
      headers: {
        Authorization: "Bearer " + accessTokenResponse.data.access_token,
        "Content-Type": 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
  })
}
function clearWatchlist() {}