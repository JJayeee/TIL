-- INSERT INTO table (column1, column2, ...) VALUES (value1, value2,...);


INSERT INTO classmates(name, age, address)
VALUES('박준영', 29, '잠실');
-- 처음엔 address가 없었음
-- Error: near line 1: NOT NULL constraint failed: classmates.address