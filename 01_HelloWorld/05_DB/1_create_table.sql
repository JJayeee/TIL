-- SQLite
-- TABLE 생성 CREATE TABLE
-- CREATE TABLE table(
-- column1 datatype PRIMARYKEY,
-- column2 datatype,
-- ...
-- );

CREATE TABLE classmates(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INT NOT NULL,
    address TEXT NOT NULL
);


-- TABLE 삭제 DROP TABLE
DROP TABLE classmates;


-- TABLE 조회 .table 
sqlite> .table
classmates 
-- Schema 조회 .schema 
sqlite> .schema classmates
CREATE TABLE classmates(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INT NOT NULL,
    address TEXT NOT NULL
);



-- 시작
$ sqlite3

-- 종료
ctrl + z
.exit

-- 데이터베이스 생성
-- - 해당하는 db파일이 있으면 해당 db를 콘솔로 연다.
-- - 해당 파일이 없으면 새로 생성하고, 해당 db를 콘솔로 연다.
sqlite> .databases
-- main: C:\Users\ilknn\OneDrive\Desktop\study_home\TIL\05_DB\test\tutorial.sqlite3

-- CSV 파일 읽어서 table로 만들기
-- hellodb.csv 파일을 examples라는 이름의 table로 만듦
sqlite> .mode csv
sqlite> .import hellodb.csv examples

-- SELECT문 : DB에서 특정 테이블을 반환
sqlite> SELECT * FROM examples;
-- 1,"길동","홍",600,"충청도",010-2424-1232

-- 예쁘게 보기
sqlite> . headers on
sqlite> SELECT * FROM examples;
-- id,first_name,last_name,age,country,phone
-- 1,"길동","홍",600,"충청도",010-2424-1232
sqlite> .mode column
sqlite> SELECT * FROM examples;
-- id          first_name  last_name   age         country     phone
-- ----------  ----------  ----------  ----------  ----------  -------------
-- 1           길동          홍           600         충청도         010-2424-1232

sqlite> .tables
examples

-- sqlite> .open tutorial.sqlite3
-- sqlite> .tables
-- sqlite> .read create_table.sql
-- sqlite> .read add_one_classmates.sql
-- sqlite> .read add_classmates.sql