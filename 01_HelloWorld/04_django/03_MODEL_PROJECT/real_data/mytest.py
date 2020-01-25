# from real_data.models import HotIssue
import requests


URL = 'https://datalab.naver.com/keyword/realtimeList.naver'
response = requests.get(URL).json()
data = json.loads(response)
print(data)