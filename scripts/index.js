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
  var symbol = document.getElementById("symbol-input").value;
  saveData(symbol);
  document.location.href = "stocks.html";
}





