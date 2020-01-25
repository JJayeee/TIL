my = [1, 2, 3, 4, 5, 6]
real = [1, 2, 3, 4, 5, 7]
bonus = 6

check = []
for i in my:
    if my[i-1] == real[i-1]:
        check.append('o')

print(check)
print(check.count('o'))
