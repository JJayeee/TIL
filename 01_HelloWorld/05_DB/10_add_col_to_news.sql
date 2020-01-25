ALTER TABLE newss
ADD COLUMN create_at DATETIME NOT NULL;


-- sqlite> .read 10_add_col_to_news.sql
-- Error: near line 1: Cannot add a NOT NULL column with default value NULL
-- ==> 생성해 둔 row는 title, content로 만들어 두었기 때문에
-- title       content
-- ----------  ----------
-- 1번 제목       1번 내용
"""
기존 데이터의 NOT NULL 조건으로 인해 NULL 값으로 새로운
컬럼이 추가 될 수 없으므로 에러가 발생한다.
NOT NULL 조건을 없애거나, 기본값(DEFAULT)를 지정해야 한다.
"""

-- DEFAULT 값을 넣어서 추가한다.
ALTER TABLE newss
ADD COLUMN create_at DATETIME
NOT NULL DEFAULT 1;

-- title       content     create_at
-- ----------  ----------  ----------
-- 1번 제목       1번 내용       1


-- NOT NULL 조건을 빼고 컬럼을 추가하면 추가 된다. NULL 값이 들어간다.
sqlite> ALTER TABLE newss
   ...> ADD COLUMN updated_at DATETIME;
