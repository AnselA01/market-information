var symbol = "aapl";
var axios = require('axios');
var url = 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=';
url = url.concat(symbol)
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
  console.log(price);
  

})
.catch(function (error) {
  console.log(error);
});