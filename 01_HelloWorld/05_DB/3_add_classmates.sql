-- SQLite
INSERT INTO classmates(name, age, address)
VALUES
('허재웅', 27, '서울'),
('이경환', 27, '서울');



- 모든 열에 데이터를 넣을 때에는 column을 명시할 필요가 없다.

INSERT INTO classmates VALUES (value1, value2, ...);

- SQLite는 따로 PRIMARY KEY 속성의 컬럼을 작성하지 않으면 값이 자동으로 증가하는 PK옵션을 가진 rowid 컬럼을 정의한다.

  - rowid는 64bit 정수 타입의 유일한 식별값 이다.
  - `INTEGER` PRIMARY KEY 타입으로 컬럼을 만들면 이는 rowid를 대체한다.
  - rowid는 자동으로 작성되었는데 직접 id 컬럼을 만든 후에는 입력할 컬럼을 명시하지않으면 자동으로 입력되지 않는다.


sqlite> SELECT * FROM classmates2;
"허재웅",27,"서울"
sqlite> SELECT rowid, * FROM classmates2;
1,"허재웅",27,"서울"


- 따라서 컬럼을 명시해주거나, value에 id를 함께 기입해주어야 한다.
- 그래서 PK 컬럼은 직접 작성하기보다, SQLite가 만들어주는 rowid를 사용하는 것이 좋다.
INSERT INTO classmates VALUES (2, '홍길동', 30, '서울');
INSERT INTO classmates (name, age, address) VALUES ('김영희', 11, '대전')