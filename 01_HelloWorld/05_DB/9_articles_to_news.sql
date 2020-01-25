-- ALTER TABLE exist_table
-- RENAME TO new_table;

ALTER TABLE articles RENAME to news;

.schema news

CREATE TABLE IF NOT EXISTS "news"(
title TEXT NOT NULL,
content TEXT NOT NULL
);