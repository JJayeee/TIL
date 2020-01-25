SQLite
-- sqlite> .mode csv
-- sqlite> .import users.csv users

SELECT DISTINCT age FROM users;

SELECT * FROM users WHERE age=30;
SELECT * FROM users WHERE age>=30;

SELECT first_name FROM users WHERE age>=30;

-- users 에서 age가 30이상, 성이 '김' 인 사람의 성과 나이만 출력 10개
SELECT last_name, age FROM users 
WHERE age >= 30 AND last_name = '김' 
LIMIT 10;


-- COUNT(column): RECORD가 총 몇개인가
SELECT COUNT(*) FROM users;
-- null 이 있는 coloum 이 있으면 개수가 차이 날 것


-- AVG, SUM, MIN, MAX (INT, FLOAT 등 숫자 coloum만 가능)
-- 30살 이상인 사람의 평균 나이
SELECT AVG(age) FROM users WHERE age >= 30;

-- users 에서 잔액이 가장 높은 사람의 이름과 그 잔액
SELECT first_name, MAX(balance) FROM users;
-- WHERE에서가 아니라, SELECT 하는 순간 MAX값의 balance만 가져옴

-- users 에서 30살 이상인 사람의 계좌 평균 잔액
SELECT AVG(balance) FROM users WHERE age >= 30;


-- Like (wild cards) : 정확한 값에 대한 비교가 아닌, 패턴을 확인하여 해당하는 값 반환
-- %(char): % 자리에 문자열이 있을 수도, 없을 수도 있음. 문자 하나!
-- _(str): 반드시 _자리에 한 개의 문자가 존재해야 한다. 문자 열 or not 까지 가능
-- users에서 20대인 사람
SELECT * FROM users WHERE age LIKE '2_';
-- 2% 는 20대가 아닌, 2도 걸림!!

-- 지역번호가 02인 사람
SELECT phone FROM users WHERE phone LIKE '02-%';
-- 02- 까지는 필수, 그 뒤에는 뭐든 있을 것이다 ex) 02-2863-6429
SELECT phone FROM users WHERE phone LIKE '02-_'; 
-- 02-_ 아무것도 안 나옴.

-- users에서 이름이 '준'으로 끝나는 사람만
SELECT first_name, last_name FROM users WHERE first_name LIKE '%준';

-- users에서 중간 번호가 5114인 사람만
SELECT phone, first_name FROM users WHERE phone LIKE '%-5114-%';


-- ORDER
-- ASC: 오름차순, DESC: 내림차순 (defalut는 ASC)
-- users에서 나이순으로 오름차순 정렬하여 상위 10개
SELECT age, first_name FROM users ORDER BY age ASC LIMIT 10;
-- 15,"서영" ~ 15,"정수"

SELECT age, last_name FROM users ORDER BY last_name, age LIMIT 10;
-- 15,"강" ~ 28,"강"
-- 정렬 우선 순위가 lastname 먼저
-- age, last_name은 age 먼저 정렬하고 last_name 정렬 (결과물이 다르다)

SELECT age, balance FROM users ORDER BY age, balance LIMIT 10;
-- txt라서 txt기준 오름차순 정렬 되어 있는 것

-- users에서 계좌잔액 순으로 내림차순 정렬, 성과 이름 10개 출력
SELECT balance, last_name, first_name FROM users ORDER BY balance DESC LIMIT 10;
