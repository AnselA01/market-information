var yahooFinance = require('yahoo-finance');

yahooFinance.quote({
  symbol: 'AAPL',
  modules: ['price', 'summaryDetail']
}, function (err, quote) {
  var price = (quote.price.regularMarketPrice);
  console.log(price);
})