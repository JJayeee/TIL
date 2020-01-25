import bs4
import requests
import csv

url = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&query=%EB%B3%84%EC%9E%90%EB%A6%AC%20%EC%9A%B4%EC%84%B8'

# headers = {'User-Agent': ':)'}

response = requests.get(url).text

text = bs4.BeautifulSoup(response, 'html.parser')
print(text)
