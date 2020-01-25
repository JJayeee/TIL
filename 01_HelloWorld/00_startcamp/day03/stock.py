from iexfinance.stocks import Stock

company = Stock('AAPL', token='pk')

print(company.get_price())
print(company.get_quote())
