//formula to find original value from a percentage change: 
//100 + percent change, divide 100 by it (100/x), then multiply by the last value to get the first value.
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
  document.location.href("stocks.html");
  return false;
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
    var accessToken = response.data.access_token;

    var moversConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/$SPX.X/movers?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&change=percent',
      headers: {
        'Authorization': "Bearer" + accessToken,
      }
    };

    axios(moversConfig)
      .then(function (response) {
        //positive movers
        //row 1
        document.getElementById("row-1-symbol").innerHTML = response.data[10].symbol;
        document.getElementById("row-1-name").innerHTML = response.data[10].description;
        document.getElementById("row-1-last").innerHTML = response.data[10].last;
        
        //add dollar change with the formula
        var percentChange = response.data[10].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-1-percent-change").innerHTML = percentChange;
        var volume = response.data[10].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-1-volume").innerHTML = volume;

        //row 2
        document.getElementById("row-2-symbol").innerHTML = response.data[11].symbol;
        document.getElementById("row-2-name").innerHTML = response.data[11].description;
        document.getElementById("row-2-last").innerHTML = response.data[11].last;
        
        //add dollar change with the formula
        var percentChange = response.data[11].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-2-percent-change").innerHTML = percentChange;
        var volume = response.data[11].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-2-volume").innerHTML = volume;

        //row 3
        document.getElementById("row-3-symbol").innerHTML = response.data[12].symbol;
        document.getElementById("row-3-name").innerHTML = response.data[12].description;
        document.getElementById("row-3-last").innerHTML = response.data[12].last;
        
        //add dollar change with the formula
        var percentChange = response.data[12].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-3-percent-change").innerHTML = percentChange;
        var volume = response.data[12].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-3-volume").innerHTML = volume;

        //row 4
        document.getElementById("row-4-symbol").innerHTML = response.data[13].symbol;
        document.getElementById("row-4-name").innerHTML = response.data[13].description;
        document.getElementById("row-4-last").innerHTML = response.data[13].last;
        
        //add dollar change with the formula
        var percentChange = response.data[13].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-4-percent-change").innerHTML = percentChange;
        var volume = response.data[13].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-4-volume").innerHTML = volume;

        //row 5
        document.getElementById("row-5-symbol").innerHTML = response.data[14].symbol;
        document.getElementById("row-5-name").innerHTML = response.data[14].description;
        document.getElementById("row-5-last").innerHTML = response.data[14].last;
        
        //add dollar change with the formula
        var percentChange = response.data[14].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-5-percent-change").innerHTML = percentChange;
        var volume = response.data[14].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-5-volume").innerHTML = volume;
        
        //row 6
        document.getElementById("row-6-symbol").innerHTML = response.data[15].symbol;
        document.getElementById("row-6-name").innerHTML = response.data[15].description;
        document.getElementById("row-6-last").innerHTML = response.data[15].last;
        
        //add dollar change with the formula
        var percentChange = response.data[15].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-6-percent-change").innerHTML = percentChange;
        var volume = response.data[15].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-6-volume").innerHTML = volume;
        
        //row 7
        document.getElementById("row-7-symbol").innerHTML = response.data[16].symbol;
        document.getElementById("row-7-name").innerHTML = response.data[16].description;
        document.getElementById("row-7-last").innerHTML = response.data[16].last;
        
        //add dollar change with the formula
        var percentChange = response.data[16].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-7-percent-change").innerHTML = percentChange;
        var volume = response.data[16].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-7-volume").innerHTML = volume;

        //row 8
        document.getElementById("row-8-symbol").innerHTML = response.data[17].symbol;
        document.getElementById("row-8-name").innerHTML = response.data[17].description;
        document.getElementById("row-8-last").innerHTML = response.data[17].last;
        
        //add dollar change with the formula
        var percentChange = response.data[17].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-8-percent-change").innerHTML = percentChange;
        var volume = response.data[17].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-8-volume").innerHTML = volume;

        //row 9
        document.getElementById("row-9-symbol").innerHTML = response.data[18].symbol;
        document.getElementById("row-9-name").innerHTML = response.data[18].description;
        document.getElementById("row-9-last").innerHTML = response.data[18].last;
        
        //add dollar change with the formula
        var percentChange = response.data[18].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-9-percent-change").innerHTML = percentChange;
        var volume = response.data[18].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-9-volume").innerHTML = volume;

        //row 10
        document.getElementById("row-10-symbol").innerHTML = response.data[19].symbol;
        document.getElementById("row-10-name").innerHTML = response.data[19].description;
        document.getElementById("row-10-last").innerHTML = response.data[19].last;
        
        //add dollar change with the formula
        var percentChange = response.data[19].change * 100;
        percentChange = percentChange.toFixed(2);
        document.getElementById("row-10-percent-change").innerHTML = percentChange;
        var volume = response.data[19].totalVolume;
        volume = volume.toLocaleString("en-US");
        document.getElementById("row-10-volume").innerHTML = volume;

        //negative movers
        //row 1
      })
  })
  window.addEventListener('load', function () {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
  });
  