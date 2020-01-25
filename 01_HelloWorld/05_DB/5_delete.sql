-- SQLite

-- delete all
DELETE FROM classmates;

-- 특정 요소 삭제
DELETE FROM classmates WHERE id=3;
-- 삭제 되었다 해서 id가 정렬 되는 것은 아님
-- primary key가 중요한 것, 특정한 것을 골라서 삭제하거나 해서
-- 중복이 불가능한 Unique 값인 rowid를 기준으로 하는 등
-- DELETE FROM table WHERE rowid=?;

-- rowid, SQlite는 기본적으로 일부 행을 삭제하고 새 행을 삽입하면
-- 삭제 된 행의 값을 재사용하려고 한다. 그렇지 않으려면
-- AUTOINCREMENT
-- 테이블을 만들 때, 
-- id INTEGER PRIMARY KEY AUTOINCREMENT 
-- rowid와 달리, id는 빈 값이 존재할 수 있음.

-- 하지만 SQLite는 특정한 요구사항 (사용 되지 않은 값이나 이전에 삭제된
-- 행의 값을 재사용하지 못하게 하는 바로 이 경우)이 없다면 
-- AUTOINCREMENT 속성을 사용하지 않아야 한다고 한다.
-- 내부적으로 메모리, 디스크 공간 등을 추가로 사용해서. 엄격한 경우에만 사용한다.
