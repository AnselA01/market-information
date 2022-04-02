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
var symbol = loadData();
symbol = symbol.toUpperCase();
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
            document.getElementById("exchange").innerHTML = exchange + ": ";
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

              document.getElementById("ah-price").innerHTML = quoteResponse.lastPrice.toFixed(2);

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
                timeSuffix = timeSuffixes[0];
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
        //1 day chart
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
            var interval = 1;
            var times = [];
            var startingTime = 570;
            var suffix = ["AM", "PM"];

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
            for (var i = 0; i < numberOfCandles + 1; i++) {
              timesLabel.push(times[i]);
            }
            timesLabel.push("");
            let chartValues = [];
            let volumeValues = [];
            for (var i = 0; i < numberOfCandles - 1; i++) {
              chartValues.push(response.data.candles[i].close.toFixed(2));
              volumeValues.push(response.data.candles[i].volume);
            }
            chartValues.unshift(response.data.candles[0].open);
            volumeValues.push(response.data.candles[numberOfCandles-1].volume);
            var priceCtx = document.getElementById('lower-information-chart-canvas-1d').getContext('2d');
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
                  hour-=12;
                  suffix = "PM";
                }
                else if (hour == 12) {
                  suffix = "PM";
                }
                else suffix = "AM";
                if (minute < 10) {
                  minute = "0" + minute;
                }
                fullTime = month + " " + day + ", " + hour + ":" + minute + " " +  suffix + " " + "GMT-" + timeZone;
                timesLabel.push(fullTime);
              }
              timesLabel.push("");

              let fiveDayChartValues = [];
              let fiveDayVolumeValues = [];
              for (var i = 0; i < numberOfCandles - 1; i++) {
                fiveDayChartValues.push(response.data.candles[i].close.toFixed(2));
                fiveDayVolumeValues.push(response.data.candles[i].volume);
              }
              fiveDayChartValues.unshift(response.data.candles[0].open);
              fiveDayVolumeValues.push(response.data.candles[numberOfCandles - 1].volume);
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
                var date = new Date();
                var year;
                var month;
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var day;
                for (var i = 0; i < numberOfCandles; i++) {
                  date = new Date(response.data.candles[i].datetime);
                  month = monthNames[date.getMonth()];
                  day = date.getDate();
                  year = date.getFullYear();
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
                  for (var i = 0; i < numberOfCandles; i++) {
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
                    for (var i = 0; i < numberOfCandles; i++) {
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
                                return value.toLocaleString();
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
                    for (var i = 0; i < numberOfCandles; i++) {
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
                    var oneYearPriceCtx = document.getElementById('lower-information-chart-canvas-1y').getContext('2d');
                    var priceChart = new Chart(oneYearPriceCtx, {
                      type: 'line',
                      data: {
                        labels: timesLabel,
                        datasets: [{
                          data: oneYearChartValues,
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
                      for (var i = 0; i < numberOfCandles; i++) {
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
                      fiveYearVolumeVales.push(response.data.candles[numberOfCandles - 1].volume);
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
  })

function changeInfoPaneOverview() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2.5px";

  document.getElementById("lower-information-overview").style.display = "block";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneChart() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-chart-text").style.borderRadius = "90";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "block";
  changeChartTimescale1d();
  document.getElementById("lower-information-volume").style.display = "block";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
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
    for (var i = 0; i < 25; i++) {
      if (response.data.articles[i].clean_url != "reddit.com" && response.data.articles[i].clean_url != "youtube.com" && response.data.articles[i].clean_url != "thesun.co.uk" && response.data.articles[i].clean_url != "ign.com" && response.data.articles[i].clean_url != "digitaltrends.com" && response.data.articles[i].clean_url != "metro.co.uk" && response.data.articles[i].clean_url != "sky.com" && response.data.articles[i].clean_url != "mdpi.com" && response.data.articles[i].topic != "entertainment") {
        articleNumber.push(i);
      }
    }
    if (articleNumber.length > 0) {
      var articleOne = response.data.articles[articleNumber[0]];
      console.log(articleOne);
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
  
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "block";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneForum() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "block";
  document.getElementById("lower-information-options").style.display = "none";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneOptions() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #356EFF 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #ACACAC 2.5px";

  document.getElementById("lower-information-overview").style.display = "none";
  document.getElementById("lower-information-chart").style.display = "none";
  document.getElementById("lower-information-volume").style.display = "none";
  document.getElementById("lower-information-news").style.display = "none";
  document.getElementById("lower-information-forum").style.display = "none";
  document.getElementById("lower-information-options").style.display = "block";
  document.getElementById("lower-information-historical").style.display = "none";
}
function changeInfoPaneHistorical() {
  document.getElementById("lower-information-overview-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-chart-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-news-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-forum-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-options-text").style.borderBottom = "solid #ACACAC 2.5px";
  document.getElementById("lower-information-historical-text").style.borderBottom = "solid #356EFF 2.5px";

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