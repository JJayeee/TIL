import requests
import json
from iexfinance.stocks import Stock

url = 'https://free.currconv.com/api/v7/convert?q=USD_KRW&compact=ultra&apiKey=abcd'

response = requests.get(url).text

data = json.loads(response)

print(data)


token = 'pk_'
stock = Stock('TSLA', token=token).get_quote()
c_name = stock['companyName']
l_price = stock['iexRealtimePrice']
print(c_name, l_price)
