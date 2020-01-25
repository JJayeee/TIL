import datetime
import json
import requests

from art import *
from flask import Flask, render_template, request
from iexfinance.stocks import Stock

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send')
def send():
    return render_template('send.html')


@app.route('/receive', methods=['POST'])
def receive():
    to = request.form.get('to')
    data = request.form.get('msg')
    date = datetime.datetime.now()
    return render_template(
        'receive.html',
        to=to,
        data=data,
        date=date,
    )


@app.route('/dday')
def dday():
    today = datetime.datetime.now()
    end_date = datetime.datetime(2019, 11, 29)
    left = end_date - today
    start_date = datetime.datetime(2019, 6, 30)
    went = today - start_date
    return render_template('dday.html', left_days=left.days, wentds=went.days)


@app.route('/boxoffice')
def boxoffice():
    top_5 = [
        '알라딘',
        '스파이더맨 파 프롬 홈',
        '토이스토리4',
        '라이온킹',
        '존윅3',
    ]
    return render_template('boxoffice.html', movies=top_5)


@app.route('/art')
def art():
    return render_template('art.html')


@app.route('/result')
def result():
    input_text = request.args.get('input_text')
    font = request.args.get('font')
    result = text2art(input_text, font=font)
    return render_template('result.html', result=result)


@app.route('/stock')
def stock():
    return render_template('stock.html')


@app.route('/won')
def won():
    url = 'https://free.currconv.com/api/v7/convert?q=USD_KRW&compact=ultra&apiKey=cb188feaf12c5ecf7cd6'
    response = requests.get(url).text
    data = json.loads(response)
    conv = int(data['USD_KRW'])
    token = 'pk_'
    code = request.args.get('code')
    stock = Stock(code, token=token).get_quote()
    c_name = stock['companyName']
    l_price = int(stock['iexRealtimePrice'])
    kwr = conv * l_price
    return render_template('won.html', c_name=c_name, l_price=l_price, kwr=kwr)


if __name__ == '__main__':
    app.run(debug=True)