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
    //console.log(accessToken)
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
          currency = "$"
        }

        var bid = quoteResponse.bidPrice;

        var ask = quoteResponse.askPrice;

        var price = quoteResponse.regularMarketLastPrice;
        if (price > 1) {
          price = price.toFixed(2);
        }
        else {
          price = price.toFixed(4);
        }
        price = price.toLocaleString("en-US");
        document.getElementById("currency").innerHTML = currency;
        document.getElementById("current-price").innerHTML = price;
        // document.getElementById("bid").innerHTML = bid + " / "
        // document.getElementById("ask").innerHTML = ask;

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
        var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

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
        dayChange = Number(dayChange);
        percentChange = Number(percentChange);

        var previousClose = price - dayChange;
        if (previousClose < 1) {
          previousClose = previousClose.toFixed(4);
        }
        else {
          previousClose = previousClose.toFixed(2);
        }
        document.getElementById("previous-close").innerHTML = previousClose;
        document.getElementById("open").innerHTML = quoteResponse.openPrice;
        var volume = quoteResponse.totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("volume").innerHTML = volume;
        var lowPrice = quoteResponse.lowPrice;
        lowPrice = lowPrice.toFixed(2);
        var highPrice = quoteResponse.highPrice;
        highPrice = highPrice.toFixed(2);
        document.getElementById("day-range").innerHTML = lowPrice + " - " + highPrice;
        var fiftyTwoHigh = quoteResponse["52WkHigh"];
        fiftyTwoHigh = fiftyTwoHigh.toFixed(2);
        var fiftyTwoLow = quoteResponse["52WkLow"];
        fiftyTwoLow = fiftyTwoLow.toFixed(2);
        document.getElementById("52-range").innerHTML = fiftyTwoLow + " - " + fiftyTwoHigh;

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
            document.getElementById("exchange").innerHTML = exchange + ": ";
            document.getElementById("primary-exchange").innerHTML = exchange;

            var sharesOutstanding = fundamentalsParsed.sharesOutstanding;
            sharesOutstanding = sharesOutstanding.toLocaleString("en-US");
            document.getElementById("shares-outstanding").innerHTML = sharesOutstanding;

            document.getElementById("ticker").innerHTML = symbol;

            document.getElementById("cusip").innerHTML = response.data[symbol].cusip

            document.getElementById("asset-type").innerHTML = assetType;

            var beta = fundamentalsParsed.beta;
            document.getElementById("beta").innerHTML = beta.toFixed(2);

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
            //add suffix
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
            document.getElementById("avg-volume").innerHTML = avgVolume;
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
        axios.get("https://api.twelvedata.com/market_state?exchange=NYSE&apikey=921b0a05daf94bde867a7c42a2f236b0&dp")
          .then(response => {
            if (!response.data[0].is_market_open) {
              document.getElementById("ah-currency").innerHTML = currency;
              document.getElementById("ah-time").innerHTML = time;
              document.getElementById("market-close-status-text").innerHTML = "At close: ";
              document.getElementById("market-close-time").innerHTML = "4:00PM ET"
              document.getElementById("ah-status-text").innerHTML = "After hours: ";
              var date = new Date();
              var hours = date.getHours() + 1;
              if (hours > 12) {
                hours -= 12;
              }
              if (date.getHours() > 19) {
                document.getElementById("ah-time").innerHTML = "8:00PM ET";
              }
              else {
                var minutes = date.getMinutes();
                if (minutes < 10) {
                  String(minutes);
                  minutes = "0" + minutes;
                  Number(minutes);
                }
                var time = hours + ":" + minutes + "PM ET";
                document.getElementById("ah-time").innerHTML = time;
              }

              var ahChange = quoteResponse.lastPrice - quoteResponse.regularMarketLastPrice;
              ahChange = ahChange.toFixed(2);
              var ahPercentChange = (ahChange / quoteResponse.regularMarketLastPrice) * 100;
              ahPercentChange = ahPercentChange.toFixed(2);
              document.getElementById("ah-price").innerHTML = quoteResponse.lastPrice;

              if (ahChange > 0) {
                toString(ahChange);
                toString(ahPercentChange);
                document.getElementById("pos-ah-price-change").innerHTML = "+" + ahChange;
                document.getElementById("pos-ah-percent-change").innerHTML = "(+" + ahPercentChange + "%)";
                document.getElementById("pos-ah-price-change").style.backgroundColor = 'rgb(' + 220 + ',' + 238 + ',' + 224 + ')';
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
                document.getElementById("eq-day-price-change").style.backgroundColor = 'rgb(' + 232 + ',' + 234 + ',' + 237 + ')';
                document.getElementById("eq-ah-price-change").style.display = "inline";
                document.getElementById("pos-ah-price-change").style.display = "none";
                document.getElementById("neg-ah-price-change").style.display = "none";
                document.getElementById("pos-ah-percent-change").style.display = "none";
                document.getElementById("neg-ah-percent-change").style.display = "none";
              }
            }
            else {
              document.getElementById("ah-currency").style.display = "none";
              document.getElementById("ah-time").style.display = "none";
              var date = new Date();
              document.getElementById("market-open-status-text").innerHTML = "Market open: ";
              var timeSuffixes = ["AM", "PM"];
              var minutes = date.getMinutes();
              var hours = date.getHours() + 1;
              if (hours > 12) {
                hours = hours - 12;
              }
              if (minutes < 10) {
                String(minutes);
                minutes = "0" + minutes;
                Number(minutes);
              }
              else {
                timeSuffix = timeSuffixes[1];
              }

              var time = hours + 1 + ":" + minutes + timeSuffix;
              document.getElementById("market-open-time").innerHTML = hours + 1 + ":" + date.getMinutes() + timeSuffix + " ET";
            }
          })
        var chartTime = date.getTime();
        if (date.getDay() == 6) {
          chartTime = date.getTime() - 86400000;
        }
        else if (date.getDay() == 0) {
          chartTime = date.getTime() - 172800000
        }
        var chartConfig = {
          method: 'get',
          url: 'https://api.tdameritrade.com/v1/marketdata/' + symbol + '/pricehistory?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&periodType=day&frequencyType=minute&frequency=1&endDate=' + chartTime + '&startDate=' + chartTime + '&needExtendedHoursData=false',
          headers: {
            'Authorization': accessToken
          }
        };
        axios(chartConfig)
          .then(function (response) {
            var numberOfCandles = 0;
            while (response.data.candles[numberOfCandles++]) { }
            var interval = 1;
            var times = [];
            var startingTime = 570;
            var suffix = ['AM', 'PM'];

            for (var i = 0; startingTime < 24 * 60; i++) {
              var hh = Math.floor(startingTime / 60); // gestartingTiming hours of day in 0-24 format
              var mm = (startingTime % 60); // gestartingTiming minutes of the hour in 0-55 format
              times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + " " + suffix[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
              startingTime = startingTime + interval;
              if (times[i].substring(0, 2) == "00") {
                times[i] = times[i].replace("00", "12");
              }
            }
            var timesLabel = [];
            for (var i = 0; i < numberOfCandles - 1; i++) {
              timesLabel.push(times[i]);
            }
            timesLabel.push("");
            let chartValues = [];
            let volumeValues = [];
            var date = new Date();
            var timeSinceOpen = (((date.getHours() + 1) - 9) * 60 + (date.getMinutes() + 30)) - 60;
            for (var i = 1; i < numberOfCandles - 1; i++) {
              var priceValue = response.data.candles[i].close;
              var volume = response.data.candles[i].volume;
              priceValue = priceValue.toFixed(2);
              chartValues.push(priceValue);
              volumeValues.push(volume);
            }
            chartValues.unshift(response.data.candles[0].open);
            var priceCtx = document.getElementById('lower-information-chart-canvas').getContext('2d');
            var priceChart = new Chart(priceCtx, {
              type: 'line',
              data: {
                labels: timesLabel,
                datasets: [{
                  data: chartValues,
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
            var volumeCtx = document.getElementById('lower-information-volume-canvas').getContext('2d');
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
      })
  })

var currentText = document.getElementById("lower-information-overview-text");
var pastText;

function changeInfoPaneOverview() {
  pastText = currentText;
  currentText = pastText;

  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #356EFF 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2px";

  document.getElementById("lower-information-overview").style.display = "block";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneChart() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #356EFF 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "block";
  document.getElementById("lower-information-volume").style.display = "block";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
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
    console.log(response);
    var articleNumber = [];
    for (var i = 0; i < 25; i++) {
      if (response.data.articles[i].clean_url != "reddit.com" && response.data.articles[i].clean_url != "youtube.com" && response.data.articles[i].clean_url != "thesun.co.uk" && response.data.articles[i].clean_url != "ign.com" && response.data.articles[i].clean_url != "digitaltrends.com" && response.data.articles[i].clean_url != "metro.co.uk" && response.data.articles[i].clean_url != "sky.com" && response.data.articles[i].clean_url != "mdpi.com" && response.data.articles[i].topic != "entertainment") {
        articleNumber.push(i);
      }
    }
    if (articleNumber.length > 0) {
      var articleOne = response.data.articles[articleNumber[0]];
      document.getElementById("article-1-image-src").src = articleOne.media;
      document.getElementById("article-1-publisher").innerHTML = articleOne.clean_url;
      document.getElementById("article-1-title-link").innerHTML = articleOne.title;
      document.getElementById("article-1-title-link").href = articleOne.link;
      var articleOneSummary = articleOne.summary;
      articleOneSummary = articleOneSummary.substring(0, 250) + "...";
      document.getElementById("article-1-summary").innerHTML = articleOneSummary;
    }
    if (articleNumber.length > 1) {
      var articleTwo = response.data.articles[articleNumber[1]];
      document.getElementById("article-2-image-src").src = articleTwo.media;
      document.getElementById("article-2-publisher").innerHTML = articleTwo.clean_url;
      document.getElementById("article-2-title-link").innerHTML = articleTwo.title;
      document.getElementById("article-2-title-link").href = articleTwo.link;
      var articleTwoSummary = articleTwo.summary;
      articleTwoSummary = articleTwoSummary.substring(0, 250) + "...";
      document.getElementById("article-2-summary").innerHTML = articleTwoSummary;
    }
    if (articleNumber.length > 2) {
      var articleThree = response.data.articles[articleNumber[2]];
      document.getElementById("article-3-image-src").src = articleThree.media;
      document.getElementById("article-3-publisher").innerHTML = articleThree.clean_url;
      document.getElementById("article-3-title-link").innerHTML = articleThree.title;
      document.getElementById("article-3-title-link").href = articleThree.link;
      var articleThreeSummary = articleThree.summary;
      articleThreeSummary = articleThreeSummary.substring(0, 250) + "...";
      document.getElementById("article-3-summary").innerHTML = articleThreeSummary;
    }
    if (articleNumber.length > 3) {
      var articleFour = response.data.articles[articleNumber[3]];
      document.getElementById("article-4-image-src").src = articleFour.media;
      document.getElementById("article-4-publisher").innerHTML = articleFour.clean_url;
      document.getElementById("article-4-title-link").innerHTML = articleFour.title;
      document.getElementById("article-4-title-link").href = articleFour.link;
      var articleFourSummary = articleFour.summary;
      articleFourSummary = articleFourSummary.substring(0, 250) + "...";
      document.getElementById("article-4-summary").innerHTML = articleFourSummary;
    }
    if (articleNumber.length > 4) {
      var articleFive = response.data.articles[articleNumber[4]];
      document.getElementById("article-5-image-src").src = articleFive.media;
      document.getElementById("article-5-publisher").innerHTML = articleFive.clean_url;
      document.getElementById("article-5-title-link").innerHTML = articleFive.title;
      document.getElementById("article-5-title-link").href = articleFive.link;
      var articleFiveSummary = articleFive.summary;
      articleFiveSummary = articleFiveSummary.substring(0, 250) + "...";
      document.getElementById("article-5-summary").innerHTML = articleFiveSummary;
    }
    if (articleNumber.length > 5) {
      var articleSix = response.data.articles[articleNumber[5]];
      document.getElementById("article-6-image-src").src = articleSix.media;
      document.getElementById("article-6-publisher").innerHTML = articleSix.clean_url;
      document.getElementById("article-6-title-link").innerHTML = articleSix.title;
      document.getElementById("article-6-title-link").href = articleSix.link;
      var articleSixSummary = articleSix.summary;
      articleSixSummary = articleSixSummary.substring(0, 250) + "...";
      document.getElementById("article-6-summary").innerHTML = articleSixSummary;
    }
    if (articleNumber.length > 6) {
      var articleSeven = response.data.articles[articleNumber[6]];
      document.getElementById("article-7-image-src").src = articleSeven.media;
      document.getElementById("article-7-publisher").innerHTML = articleSeven.clean_url;
      document.getElementById("article-7-title-link").innerHTML = articleSeven.title;
      document.getElementById("article-7-title-link").href = articleSeven.link;
      var articleSevenSummary = articleSeven.summary;
      articleSevenSummary = articleSevenSummary.substring(0, 250) + "...";
      document.getElementById("article-7-summary").innerHTML = articleSevenSummary;
    }
    if (articleNumber.length > 7) {
      var articleEight = response.data.articles[articleNumber[7]];
      document.getElementById("article-8-image-src").src = articleEight.media;
      document.getElementById("article-8-publisher").innerHTML = articleEight.clean_url;
      document.getElementById("article-8-title-link").innerHTML = articleEight.title;
      document.getElementById("article-8-title-link").href = articleEight.link;
      var articleEightSummary = articleEight.summary;
      articleEightSummary = articleEightSummary.substring(0, 250) + "...";
      document.getElementById("article-8-summary").innerHTML = articleEightSummary;
    }
    if (articleNumber.length > 8) {
      var articleNine = response.data.articles[articleNumber[8]];
      document.getElementById("article-9-image-src").src = articleNine.media;
      document.getElementById("article-9-publisher").innerHTML = articleNine.clean_url;
      document.getElementById("article-9-title-link").innerHTML = articleNine.title;
      document.getElementById("article-9-title-link").href = articleNine.link;
      var articleNineSummary = articleNine.summary;
      articleNineSummary = articleNineSummary.substring(0, 250) + "...";
      document.getElementById("article-9-summary").innerHTML = articleNineSummary;
    }
    if (articleNumber.length > 9) {
      var articleTen = response.data.articles[articleNumber[9]];
      document.getElementById("article-10-image-src").src = articleTen.media;
      document.getElementById("article-10-publisher").innerHTML = articleTen.clean_url;
      document.getElementById("article-10-title-link").innerHTML = articleTen.title;
      document.getElementById("article-10-title-link").href = articleTen.link;
      var articleTenSummary = articleTen.summary;
      articleTenSummary = articleTenSummary.substring(0, 250) + "...";
      document.getElementById("article-10-summary").innerHTML = articleTenSummary;
    }

  })
  
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #356EFF 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "block";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneForum() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #356EFF 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "block";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneOptions() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #356EFF 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "block";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneHistorical() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #356EFF 2px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "block";
}

//logo
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol=";
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
  .then(response => {
    var logo = response.data.url;
    document.getElementById("logo").src = logo;
  })
window.addEventListener('load', function () {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});
