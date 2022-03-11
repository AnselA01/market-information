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
    data: "grant_type=refresh_token&refresh_token=sJZJw7RCDpjE6Pf1RX8dkje7C%2B6W4c71E7OB45ij1iQ9ixYFnPVf8V2FAwK1xvL4zHuqw%2Fz4ASdygVcB0dLHoAsau9HrTj3RGafRyUyQDIiRhk8xtUXYYxXC3KKaJbVefg6diunxKzGIq%2Fpmwk3UYKEbq3JXlqFwcnM5Nh6vjXn9Z8MA0Fk9hpRvDpBIg0UqqFN7wvCgBLmzQeZV39bld%2B%2FycC1q7HsLA18rG9gB7cT94QXu4XKhWAvebReNB4JevLXR8%2Fc0AsRiUdKWggYPeMjkQSI7eQYpOnJgH0i1zB8DEGrnqP%2Fe5jy8R2PFr4T1Q%2FSG1a1%2B%2BTZ%2BeEmz1I1sS7Wyy4gVrLYKERU67x71uJD4Rn3ofXX8GIXhgykpY8oBsQ%2BJrNHNt039KcVFfHrKtWacI0bj%2BZWIKeCKboGNks9nc%2B3cETJjmCO8Bwo100MQuG4LYrgoVi%2FJHHvlsX2BEUUjT4MT9JMKq4RUTjTMyN2BlGrqA7OU%2BKE5gv5e0V92FncXmSf8UXTMfVeD6xnmEdzub1nNmyo2nRbIRPJVob3xYjBe1bdsL7mmQD0ltfZdlTm85MHehQZXJtGuDZDQsyYYPzmn4n%2BQPZC8rRMKyrlAieLQEXBe7%2BZkahv9Mn7DvZZHrWivvcwICHwsJHCSD4jUnb0rfrK%2BEp9szl4igfXykVyMIRWblZHr7TVV8PtwdLSdXm7BKc0cPshQ6wPZVyoKULwPU05JSgnmSimEAnlS2PYpaFmv7NNnP45MK1kfve5ApUIcSxwd4CdIp2H8S2kqzy%2BddBh8e%2BXM9ih8KT5c4FyI%2B9xmHfFNxKAPq8yXso1L6DGdDxiRqT4dskV3OM9JptRjQ7QjnoARPEbzRCJUB90MwI6k9nqdfr%2FZbGMQPm%2BxZ%2BUIEKo%3D212FD3x19z9sWBHDJACbC00B75E&access_type=&code=&client_id=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH%40AMER.OAUTHAP&redirect_uri=http%3A%2F%2Flocalhost"
  };
  
  axios(accessTokenConfig)
  .then(function (response) {
    var accessToken = "Bearer " + response.data.access_token;
    
    var moversConfig = {
      method: 'get',
      url: 'https://api.tdameritrade.com/v1/marketdata/$SPX.X/movers?apikey=PBTASGIYTYGO8FI5QLXRZS63AXHG40XH&change=percent',
      headers: { 
        'Authorization': accessToken,
      }
    };
    
    axios(moversConfig)
    .then(function (response) {
      console.log(response.data);
    })
  })