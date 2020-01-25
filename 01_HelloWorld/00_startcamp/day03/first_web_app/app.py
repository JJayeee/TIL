from flask import Flask, render_template
import random

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pick_lotto')
def pick_lotto():
    numbers = range(1, 46)
    lucky = random.sample(numbers, 6)
    return str(lucky)


@app.route('/pick_lunch/<int:count>')
def pick_lunch(count):
    menus = [
        '짜장면',
        '탕수육',
        '짬뽕',
        '볶음밥',
        '새우볶음밥',
        '사천탕면'
    ]
    picks = random.sample(menus, count)
    return str(picks)


@app.route('/cube/<int:count>')
def cube(count):
    number = count ** 3
    return str(number)


if __name__ == '__main__':
    app.run(debug=True)
