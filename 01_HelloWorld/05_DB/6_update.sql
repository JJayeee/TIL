-- SQLite
-- 특정 table에 특정 record 수정하기

-- UPDATE table 
-- SET column1=value1, ... 
-- WHERE condition;

SELECT * FROM classmates WHERE id=5;

UPDATE classmates
SET name='김철수', address='서울', age=27
WHERE id=5;

SELECT * FROM classmates WHERE id=5;