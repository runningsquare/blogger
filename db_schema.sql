
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INT NOT NULL, --the author that the article belongs to
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    created TEXT NOT NULL,
    content TEXT,
    last_modified TEXT NOT NULL,
    published TEXT,
    likes INT DEFAULT 0 NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT NOT NULL,
    comment TEXT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

--insert default data (if necessary here)

INSERT INTO testUsers ('test_name') VALUES ('Simon Star');
INSERT INTO testUserRecords ('test_record_value', 'test_user_id') VALUES ('Lorem ipsum dolor sit amet', 1); --try changing the test_user_id to a different number and you will get an error
INSERT INTO authors ('name', 'blog_title', 'blog_subtitle') VALUES ('Loo Xin Yun', 'Adventures In Code', 'a beginner''s journey');

COMMIT;

