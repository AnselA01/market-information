import requests
import time

ticker = 'MSFT'
api_key = "921b0a05daf94bde867a7c42a2f236b0"

def get_stock_price(ticker, api):
    url = f"https://api.twelvedata.com/price?symbol={ticker}&apikey={api}"
    response = requests.get(url).json()
    price = response['price'][:-3]
    return price

def get_quote(ticker, api):
    url = f"https://api.twelvedata.com/quote?symbol={ticker}&apikey={api}"
    response = requests.get(url).json()
    return response

name = get_quote(ticker, api_key)['name']
stock_price = get_stock_price(ticker, api_key)
print(name, stock_price)



