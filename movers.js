//formula to find original value from percentage change: 
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
function getSymbol(){
  console.log("here");
  var symbol = document.getElementById("stock-symbol-input").value;
  saveData(symbol); 
  document.location.href="file:///C:/Users/aalld/.vscode/projects/securities-website/stocks.html";
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
      console.log(response);
    })
  })