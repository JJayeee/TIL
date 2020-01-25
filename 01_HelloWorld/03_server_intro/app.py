# Views 최고 중간 관리자 : 무슨 일이 있다는 것을 담당
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')  # Domain 뒤에 아무 말이 없으면~
def index():
    return render_template('index.html')


@app.route('/cube/<int:number>')
def cube(number):
    return f'{number} 의 세 제곱은 {number**3} 입니다.'


@app.route('/dictionary/<string:word>')
def dictionary(word):
    d = {
        'apple': '사과',
        'banana': '바나나',
    }
    return f'{word}는 {d[word]}' if d.get(word) else f'{word}는 없는 단어입니다.'


if __name__ == '__main__':
    app.run(debug=True)
