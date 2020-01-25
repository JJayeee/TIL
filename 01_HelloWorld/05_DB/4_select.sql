SQLite
-- Data 조회(SELECT): 특정 table에서 특정 Column만 가져오기


SELECT name, age FROM classmates;
SELECT id FROM classmates;
SELECT * FROM classmates;

-- LIMIT num; 원하는 개수만큼 col가져오기 
-- OFFSET num; 특정 위치에서 가져오기
SELECT * FROM classmates LIMIT 2; -- 앞에서 2개만
SELECT * FROM classmates LIMIT 1 OFFSET 2; -- 앞에 두개 띄우고 1개만
-- 게시판 등에서 페이지 1, 페이지 2 등에 활용 된다. limit 50 offset 50
-- 매번 개인 컴퓨터 메모리에 50만개를 다 올리는 것이 아니라 각 페이지에 필요한 정보 만
-- classmates에서 id, name column값을 세번째에 있는 값 하나만 가져오기
SELECT rowid, name FROM classmates LIMIT 1 OFFSET 2;


-- WHERE column=value; column 값 중에 특정한 값만 가져오기
SELECT * FROM classmates WHERE name='박준영';
SELECT * FROM classmates WHERE address='서울' LIMIT 1;
-- 순서 있는 것, where에 limit (db 마다 다름)


-- DISTICT : 중복 제거
SELECT DISTINCT age FROM classmates;