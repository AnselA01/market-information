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
    var symbol = document.getElementById("stock-symbol-input").value;
    console.log(symbol);
    saveData(symbol); 
    document.location.href="stocks.html";
}

var accessTokenConfig = {
  method: 'post',
  url: 'https://api.tdameritrade.com/v1/oauth2/token',
  headers: { 
'Content-Type': 'application/x-www-form-urlencoded'
  }, 
  data: "grant_type=refresh_token&refresh_token=BUY4ZCSoWjkToT8kTgInvAtEggLA%2BLLlTa66lvVj9CjDt930rFflJSmf0SM44saweYAbEiXOOgQMhAM0ZIhP18nLIgrbn5aG2Hj%2BdaW0ddF68SWgZy2kkMLZf2Jlb3hcE8I2%2B4z%2FhUXE%2B5Or535dNXcyL5SBrJmPWZakczm%2F%2Bq98nkvY2HlLHvhf%2FQ6yj9Efbko%2FBAINEWq2eaQfleoUKhg6NF8FEaaxNc2weCuVBm66Ckcf4sCMrHMBVUhOipKTuec6l9Na%2F%2FT4hRArnazy8%2Fk%2Fh0mBNhxJ3R1N2hVdTP0PYCYRYxD5QvJKwkWBtpUQ0dKKPCWiWHMLlUzIdQ97JPhlCySr2bCjTFOQzH%2FFuFjHVK9hM0KbPhquqfhYjDKN5AMiqWMZLG86Ya2zEMgghzzfYke3lcPKzDDVq6cHA0Hv0j3BOLwuM5k81vQ100MQuG4LYrgoVi%2FJHHvlSNvBIZCK7NaBieyGS7YOT0rc5GeqKNWPl5C7K4RLYa1XUfIrjo5WqVOpexyQkhNNZ5vZm3MtabHwenqpGZJ9PPnBLQ3pW8ArZQ6xmQgAWWqYgrOU7xwPdSOmN%2F0x%2Fu6OtBPBQdcjeaAI5HH6lXdtVmmaNqx%2BqJL2fs%2BzzUL6XhVrp8TI0qpFGeVEp%2FGDuFqUXUVegSnCiMPU4GFRpIGPLYG0uGDNk%2BuokaP2LZCzPjF35UbmSR7XyCrM8RHcT%2BrMuZRh3VKsX0m6gibjT4Ptyktl60G6MYH6U%2FJp0AdyjuK%2Bz%2FanlWlkeHzTWgsGoiQA1EyfhVSKewbWJBFzTbeYPv6t38eQ0a5x8tLQ83KSa3ol7G%2B90x3GGPmMiyL7JXQXqf4BF6nv5z7%2FcnsLxGq3NJL3cEAf3tw%2Bm8xOddHzQJ6RRG3qQlCKnLtZ0eA%3D212FD3x19z9sWBHDJACbC00B75E&access_type=refresh_token&code=&client_id=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH%40AMER.OAUTHAP&redirect_uri=http%3A%2F%2Flocalhost"
};

axios(accessTokenConfig)
.then(function (response) {
    var accessToken = "Bearer " + response.data.access_token;
    //refresh token used to get access token. Expires 5/1
    
    var quoteConfig = {
        method: 'get',
        url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/quotes?apikey=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH',
        headers: { 
            Authorization: accessToken
        },
    };
    console.log(accessToken)
    
    axios(quoteConfig)
    .then(function (response) {
        console.log(response.data);
        var symbol = loadData().toUpperCase();
        var quoteResponse = response.data[symbol];
        
        var companyName = JSON.stringify(quoteResponse.description);
        companyName = companyName.substring(1, companyName.indexOf("-")-1);
        document.getElementById("company-name").innerHTML = companyName;
        var exchange = quoteResponse.exchangeName;
        if (exchange == "NASD") exchange = "NASDAQ"
        document.getElementById("exchange").innerHTML = exchange + ": ";
        document.getElementById("ticker").innerHTML = quoteResponse.symbol;

        var bid = quoteResponse.bidPrice;
        
        var ask = quoteResponse.askPrice;

        var price = quoteResponse.mark;
        price = price.toFixed(2);

        document.getElementById("bid").innerHTML = bid + " / "
        document.getElementById("ask").innerHTML = ask;
        document.getElementById("current-price").innerHTML = price;

        var dayChange = quoteResponse.regularMarketNetChange;
        dayChange = dayChange.toFixed(2);

        var percentChange = quoteResponse.netPercentChangeInDouble;
        percentChange = percentChange.toFixed(2);

        if (dayChange > 0) {
            toString(dayChange);
            toString(percentChange);
            var stringDayChange = "+" + dayChange + " " + "(" + percentChange + "%)";
            document.getElementById("pos-day-change").innerHTML = stringDayChange;
            var color = 'green';

        }
        else if (dayChange < 0) {
            toString(dayChange);
            toString(percentChange);
            var stringDayChange = dayChange + " " + "(" + percentChange + "%)";
            document.getElementById("neg-day-change").innerHTML = stringDayChange;
            var color = 'red';

        }
        else {
            toString(dayChange);
            toString(percentChange);
            var stringDayChange = dayChange + " " + "(" + percentChange + "%)";
            document.getElementById("eq-day-change").innerHTML = stringDayChange;
            var color = '#7e7e7e';
        }
        dayChange = Number(dayChange);
        percentChange = Number(percentChange);

    //Right side
        
        //top- Company information
        document.getElementById("about-company-name").innerHTML = "About " + companyName;
        
        //botom- Stock data
        var previousClose = price-dayChange;
        previousClose = previousClose.toFixed(2);
        document.getElementById("previous-close").innerHTML = previousClose;
        document.getElementById("open").innerHTML = quoteResponse.openPrice;
        var volume = quoteResponse.totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("volume").innerHTML = volume;
        document.getElementById("day-range").innerHTML = quoteResponse.lowPrice + " - " + quoteResponse.highPrice;
        document.getElementById("52-range").innerHTML = quoteResponse["52WkLow"] + " - " + quoteResponse["52WkHigh"];
        document.getElementById("div-yield").innerHTML = quoteResponse.divYield + "%";
        var fundamentals = {
            method: 'get',
            url: 'https://api.tdameritrade.com/v1/instruments?apikey=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH&projection=fundamental&symbol=' + loadData(),
            headers: { 
              'Authorization': accessToken
            }
          };
          axios(fundamentals)
          .then(function (response) {
            var symbol = loadData().toUpperCase();
            var fundamentalsParsed = response.data[symbol].fundamental;
            console.log(fundamentalsParsed);
            var marketCap = price * fundamentalsParsed.sharesOutstanding;
            marketCap = marketCap.toLocaleString("en-US");
            var numCommas = 0;
            for(var i = 0; i < marketCap.length; i++) { //find number of commas in market cap
                if (marketCap[i] == ",") {
                    numCommas++;
                }
            }
            //find where to put the decimal
            var numsBeforeComma = (marketCap.substring(0, marketCap.indexOf(','))).length;
            if (numsBeforeComma == 1) {
                marketCap = marketCap.substring(0,1) + "." + marketCap.substring(2, 4);
            }
            if (numsBeforeComma == 2) {
                marketCap = marketCap.substring(0,2) + "." + marketCap.substring(3, 5);
            }
            if (numsBeforeComma == 3) {
                marketCap = marketCap.substring(0,3) + "." + marketCap.substring(4, 6);
            }            
            //add suffix letter
            if (numCommas == 2) { 
                marketcap+="M";
            }
            if (numCommas == 3) { 
                marketCap+="B";
            }
            if(numCommas == 4) {
                marketCap+="T";
            }
            
            document.getElementById("market-cap").innerHTML = marketCap;
            var peRatio = fundamentalsParsed.peRatio.toFixed(2);
            document.getElementById("pe-ratio").innerHTML = peRatio;
            var avgVolume = fundamentalsParsed.vol1DayAvg;
            avgVolume = avgVolume.toLocaleString("en-US");
            document.getElementById("avg-volume").innerHTML = avgVolume;
            document.getElementById("div-amount").innerHTML = fundamentalsParsed.dividendAmount;
          })

    axios.get("https://api.twelvedata.com/market_state?exchange=NYSE&apikey=921b0a05daf94bde867a7c42a2f236b0&dp")
    .then(response => {
        if (!response.data[0].is_market_open) {
            document.getElementById("ah-text").innerHTML = "After Hours: "
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const date = new Date();
            var month = monthNames[date.getMonth()];
            document.getElementById("market-status").innerHTML = "Closed: " + month + " " + date.getDate() + " 5:00 PM EST";
            var ahChange = quoteResponse.mark - quoteResponse.regularMarketLastPrice;
            ahChange = ahChange.toFixed(2);
            var ahPercentChange = (ahChange / quoteResponse.regularMarketLastPrice) * 100;
            ahPercentChange = ahPercentChange.toFixed(2);
            
            if (ahChange > 0) {
                toString(ahChange);
                toString(ahPercentChange);
                ahChange = "+" + ahChange + " " + "(" + ahPercentChange + "%)";
                document.getElementById("pos-ah-change").innerHTML = ahChange;
            }
            if (ahChange < 0) {
                toString(ahChange);
                toString(ahPercentChange);
                ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
                document.getElementById("neg-ah-change").innerHTML = ahChange;
            }
            if (ahChange == 0) {
                toString(ahChange);
                toString(ahPercentChange);
                ahChange = ahChange + " " + "(" + ahPercentChange + "%)";
                document.getElementById("eq-ah-change").innerHTML = ahChange;
            }
        }
        else {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date();
            var month = monthNames[date.getMonth()];
            var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            document.getElementById("market-status").innerHTML = "Open: " + month + " " + date.getDate() + " " + time;
        }
    })

    })  

    //chart data
    var chartConfig = {
        method: 'get',
        url: 'https://api.tdameritrade.com/v1/marketdata/aapl/pricehistory?apikey=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH&periodType=day&period=1&frequencyType=minute&frequency=1',
        headers: { 
          'Authorization': accessToken
        }
      };
      
      axios(chartConfig)
      .then(function (response) {
        console.log("price history: \n" + JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });    
  
})
.catch(function (error) {
    console.log(error);
});

//Get graph data 
// var chartUrl = "https://query2.finance.yahoo.com/v7/finance/chart/";
// chartUrl = chartUrl.concat(loadData());
// axios.get(chartUrl)
//     .then(response => {
//         var priceValues = response.data.chart.result[0].indicators.quote[0].close;
//         for (var i = 0; i < 78; i++) { //array of all 5m prices
//             Number(priceValues[i]);
//             //priceValues[i] = priceValues[i].toFixed(2);
//             priceValues[i] = parseFloat(priceValues[i]);
//         }
        
//        var price0 = ['9:30 AM', priceValues[0]], price1 = ['9:35 AM', priceValues[1]], price2 = ['9:40 AM', priceValues[2]], price3 = ['9:45 AM', priceValues[3]], price4 = ['9:50 AM', priceValues[4]], price5 = ['9:55 AM', priceValues[5]], price6 = ['10:00 AM', priceValues[6]], price7 = ['10:05 AM', priceValues[7]], price8 = ['10:10 AM', priceValues[8]], price9 = ['10:15 AM', priceValues[9]], price10 = ['10:20 AM', priceValues[10]], price11 = ['10:25 AM', priceValues[11]], price12 = ['10:30 AM', priceValues[12]], price13 = ['10:35 AM', priceValues[13]], price14 = ['10:40 AM', priceValues[14]], price15 = ['10:45 AM', priceValues[15]], price16 = ['10:50 AM', priceValues[16]], price17 = ['10:55 AM', priceValues[17]], price18 = ['11:00 AM', priceValues[18]], price19 = ['11:05 AM', priceValues[19]], price20 = ['11:10 AM', priceValues[20]], price21 = ['11:15 AM', priceValues[21]], price22 = ['11:20 AM', priceValues[22]], price23 = ['11:25 AM', priceValues[23]], price24 = ['11:30 AM', priceValues[24]], price25 = ['11:35 AM', priceValues[25]], price26 = ['11:40 AM', priceValues[26]], price27 = ['11:45 AM', priceValues[27]], price28 = ['11:50 AM', priceValues[28]], price29 = ['11:55 AM', priceValues[29]], price30 = ['12:00 PM', priceValues[30]], price31 = ['12:05 PM', priceValues[31]], price32 = ['12:10 PM', priceValues[32]], price33 = ['12:15 PM', priceValues[33]], price34 = ['12:20 PM', priceValues[34]], price35 = ['12:25 PM', priceValues[35]], price36 = ['12:30 PM', priceValues[36]], price37 = ['12:35 PM', priceValues[37]], price38 = ['12:40 PM', priceValues[38]], price39 = ['12:45 PM', priceValues[39]], price40 = ['12:50 PM', priceValues[40]], price41 = ['12:55 PM', priceValues[41]], price42 = ['1:00 PM', priceValues[42]], price43 = ['1:05 PM', priceValues[43]], price44 = ['1:10 PM', priceValues[44]], price45 = ['1:15 PM', priceValues[45]], price46 = ['1:20 PM', priceValues[46]], price47 = ['1:25 PM', priceValues[47]], price48 = ['1:30 PM', priceValues[48]], price49 = ['1:35 PM', priceValues[49]], price50 = ['1:40 PM', priceValues[50]], price51 = ['1:45 PM', priceValues[51]], price52 = ['1:50 PM', priceValues[52]], price53 = ['1:55 PM', priceValues[53]], price54 = ['2:00 PM', priceValues[54]], price55 = ['2:05 PM', priceValues[55]], price56 = ['2:10 PM', priceValues[56]], price57 = ['2:15 PM', priceValues[57]], price58 = ['2:20 PM', priceValues[58]], price59 = ['2:25 PM', priceValues[59]], price60 = ['2:30 PM', priceValues[60]], price61 = ['2:35 PM', priceValues[61]], price62 = ['2:40 PM', priceValues[62]], price63 = ['2:45 PM', priceValues[63]], price64 = ['2:50 PM', priceValues[64]], price65 = ['2:55 PM', priceValues[65]], price66 = ['3:00 PM', priceValues[66]], price67 = ['3:05 PM', priceValues[67]], price68 = ['3:10 PM', priceValues[68]], price69 = ['3:15 PM', priceValues[69]], price70 = ['3:20 PM', priceValues[70]], price71 = ['3:25 PM', priceValues[71]], price72 = ['3:30 PM', priceValues[72]], price73 = ['3:35 PM', priceValues[73]], price74 = ['3:40 PM', priceValues[74]], price75 = ['3:45 PM', priceValues[75]], price76 = ['3:50 PM', priceValues[76]], price77 = ['3:55 PM', priceValues[77]], price78 = ['4:00 PM', priceValues[78]];
        
//         //chart with google line chart
//         google.charts.load('current', {'packages':['corechart','line']}); 
//             google.charts.setOnLoadCallback(drawChart);
    
//             function drawChart() { //chart drawing
//                 var data = new google.visualization.DataTable();
//                 data.addColumn('string', 'time');
//                 data.addColumn('number', 'price');
//                 data.addRows([
//                     price0, price1, price2, price3, price4, price5, price6, price7, price8, price9, price10, price11, price12, price13, price14, price15, price16, price17, price18, price19, price20, price21, price22, price23, price24, price25, price26, price27, price28, price29, price30, price31, price32, price33, price34, price35, price36, price37, price38, price39, price40, price41, price42, price43, price44, price45, price46, price47, price48, price49, price50, price51, price52, price53, price54, price55, price56, price57, price58, price59, price60, price61, price62, price63, price64, price65, price66, price67, price68, price69, price70, price71, price72, price73, price74, price75, price76, price77, price78
//                 ]);

//                 formatPattern = '###,##0.00';
//                 var formatNumber = new google.visualization.NumberFormat({
//                     pattern: formatPattern
//                 });
                
//                 formatNumber.format(data, 1);
               
//                 var url = "https://query2.finance.yahoo.com/v7/finance/quote?region=US&lang=en&symbols=";
//                 url = url.concat(loadData());
//                 axios.get(url)
//                     .then(response => {
                    
//                     var HTTPResponse = response.data.quoteResponse.result[0];
//                     var dayChange = parseFloat(HTTPResponse.regularMarketChange);
//                     dayChange = dayChange.toFixed(2);
                
//                     if (dayChange > 0) {
//                         var color = 'green';
            
//                     }
//                     else if (dayChange < 0) {
//                         var color = 'red';
            
//                     }
//                     else if (dayChange == 0) {
//                         var color = '#7e7e7e';
//                     }
                
//                     var options = {
//                         crosshair: { 
//                             trigger: 'both' 
//                         },
//                         colors: [color],
//                         title: '5 min',
//                         curveType: 'none',
//                         legend: { position: 'none' },
//                         subtitle: 'none',
//                         axisTitlesPosition: 'none',
//                         vAxis: {
//                             format: formatPattern,
//                         },
//                         hAxis: {
//                             textPosition: 'none'
//                         }
//                     };
//                     options.colors = color;
                
//                     var chart = new google.charts.Line(document.getElementById('chart'));
//                     chart.draw(data, options);
//                     });
//             }
//         })
//         .catch(function (error) {
//         console.log(error);
//         });

//logo using twelvedata 
var compLogoUrl = "https://api.twelvedata.com/logo?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol=";
compLogoUrl = compLogoUrl.concat(loadData());
axios.get(compLogoUrl)
    .then(response => {
        var logo = response.data.url;
        document.getElementById("logo").src = logo;
    })
    .catch(function (error) {
        console.log(error);
        });

function updatePrice() {
    //document.getElementById("market-status").innerHTML = "Open: " + month + " " + date.getDate() + " " + time;
    const symbol = loadData().toUpperCase();
    var accessTokenConfig = {
        method: 'post',
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        data: "grant_type=refresh_token&refresh_token=BUY4ZCSoWjkToT8kTgInvAtEggLA%2BLLlTa66lvVj9CjDt930rFflJSmf0SM44saweYAbEiXOOgQMhAM0ZIhP18nLIgrbn5aG2Hj%2BdaW0ddF68SWgZy2kkMLZf2Jlb3hcE8I2%2B4z%2FhUXE%2B5Or535dNXcyL5SBrJmPWZakczm%2F%2Bq98nkvY2HlLHvhf%2FQ6yj9Efbko%2FBAINEWq2eaQfleoUKhg6NF8FEaaxNc2weCuVBm66Ckcf4sCMrHMBVUhOipKTuec6l9Na%2F%2FT4hRArnazy8%2Fk%2Fh0mBNhxJ3R1N2hVdTP0PYCYRYxD5QvJKwkWBtpUQ0dKKPCWiWHMLlUzIdQ97JPhlCySr2bCjTFOQzH%2FFuFjHVK9hM0KbPhquqfhYjDKN5AMiqWMZLG86Ya2zEMgghzzfYke3lcPKzDDVq6cHA0Hv0j3BOLwuM5k81vQ100MQuG4LYrgoVi%2FJHHvlSNvBIZCK7NaBieyGS7YOT0rc5GeqKNWPl5C7K4RLYa1XUfIrjo5WqVOpexyQkhNNZ5vZm3MtabHwenqpGZJ9PPnBLQ3pW8ArZQ6xmQgAWWqYgrOU7xwPdSOmN%2F0x%2Fu6OtBPBQdcjeaAI5HH6lXdtVmmaNqx%2BqJL2fs%2BzzUL6XhVrp8TI0qpFGeVEp%2FGDuFqUXUVegSnCiMPU4GFRpIGPLYG0uGDNk%2BuokaP2LZCzPjF35UbmSR7XyCrM8RHcT%2BrMuZRh3VKsX0m6gibjT4Ptyktl60G6MYH6U%2FJp0AdyjuK%2Bz%2FanlWlkeHzTWgsGoiQA1EyfhVSKewbWJBFzTbeYPv6t38eQ0a5x8tLQ83KSa3ol7G%2B90x3GGPmMiyL7JXQXqf4BF6nv5z7%2FcnsLxGq3NJL3cEAf3tw%2Bm8xOddHzQJ6RRG3qQlCKnLtZ0eA%3D212FD3x19z9sWBHDJACbC00B75E&access_type=refresh_token&code=&client_id=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH%40AMER.OAUTHAP&redirect_uri=http%3A%2F%2Flocalhost"
        };
        
        axios(accessTokenConfig)
        .then(function (response) {
            var accessToken = "Bearer " + response.data.access_token;
                var quoteConfig = {
                method: 'get',
                url: 'https://api.tdameritrade.com/v1/marketdata/' + loadData() + '/quotes?apikey=TA8QXGC9NEZL02XFWPA3PYUKIRNAGLCH',
                headers: { 
                    Authorization: accessToken
                },
                };
                    axios(quoteConfig)
                    .then(function (response) {
                        var price = response.data[symbol].mark;
                        price = price.toFixed(2);
                        document.getElementById("current-price").innerHTML = price;
                        var bid = response.data[symbol].bidPrice;
                        bid = bid.toFixed(2);
                        document.getElementById("bid").innerHTML = bid + " / ";
                        var ask = response.data[symbol].askPrice;
                        ask = ask.toFixed(2);
                        document.getElementById("ask").innerHTML = ask;
                        
                        var dayChange = response.data[symbol].regularMarketNetChange;
                        dayChange = dayChange.toFixed(2);
                        var percentChange = response.data[symbol].netPercentChangeInDouble;
                        percentChange = percentChange.toFixed(2);

                        if (dayChange > 0) {
                            toString(dayChange);
                            toString(percentChange);
                            var stringDayChange = "+" + dayChange + " " + "(" + percentChange + "%)";
                            document.getElementById("pos-day-change").innerHTML = stringDayChange;
                            var color = 'green';
                
                        }
                        else if (dayChange < 0) {
                            toString(dayChange);
                            toString(percentChange);
                            var stringDayChange = dayChange + " " + "(" + percentChange + "%)";
                            document.getElementById("neg-day-change").innerHTML = stringDayChange;
                            var color = 'red';
                
                        }
                        else {
                            toString(dayChange);
                            toString(percentChange);
                            var stringDayChange = dayChange + " " + "(" + percentChange + "%)";
                            document.getElementById("eq-day-change").innerHTML = stringDayChange;
                            var color = '#7e7e7e';
                        }
                    })
    })
}
function updateTime() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var month = monthNames[date.getMonth()];
    var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
setInterval(function(){ 
    updatePrice();    
}, 3500);

setInterval(function() {
    updateTime();
}, 30000);