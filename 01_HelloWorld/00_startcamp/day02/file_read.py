import csv

with open('lunch.csv', 'r', encoding='utf-8') as f:
    items = csv.reader(f)
    print(items)
    for item in items:
        print(item)
