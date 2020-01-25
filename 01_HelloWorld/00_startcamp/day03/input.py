number = int(input('숫자를 입력하세요: '))

for i in range(1, number+1):
    if i % 15 == 0:
        print('fizzbuzz', end=' ')
    elif i % 5 == 0:
        print('buzz', end=' ')
    elif i % 3 == 0:
        print('fizz', end=' ')
    else:
        print(i, end=' ')
