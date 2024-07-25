/** These are routes for readers */

const express = require("express");
const router = express.Router();

/**
 * @desc Renders the home page for reading articles
 */
router.get("/home", (req, res, next) => {

    // query header info from database
    let author;
    let sqlQuery = "SELECT * FROM authors WHERE id=1";
    global.db.all(sqlQuery, function(err, result) {
        if (err) {
            next(err); //send the error on to the error handler
        }
        else {
            author = result[0];
        }
    });

    // query articles from database
    sqlQuery = "SELECT * FROM articles WHERE published IS NOT NULL ORDER BY published DESC";
    global.db.all(sqlQuery, function(err, result) {
        if (err) {
            next(err);
        }
        else {
            res.render("reader-home", {
                author: author, articles: result
            });
        }
    });
});


/**
 * Renders the article page that the reader picked
 */
router.get("/article/:id?", (req, res, next) => {

    // query header info from database
    let author;
    let sqlQuery = "SELECT * FROM authors WHERE id=1";
    global.db.all(sqlQuery, function(err, result) {
        if (err) {
            next(err); //send the error on to the error handler
        }
        else {
            author = result[0];
        }
    });

    // query article comments from datatbase
    let comments;
    sqlQuery = "SELECT * FROM comments WHERE article_id=? ORDER BY created DESC"
    global.db.all(sqlQuery, [req.query.id], function(err, result) {
        if (err) {
            next(err);
        }
        else {
            comments = result;
            getArticle();
        }
    });

    // query article from database
    function getArticle() {
        sqlQuery = "SELECT * FROM articles WHERE id=?";
        global.db.all(sqlQuery, [req.query.id], function(err, result) {
            if (err) {
                next(err);
            }
            else {
                res.render("reader-article", {
                    author: author, comments: comments, article: result[0]
                });
            }
        });
    }
});


/**
 * @desc Update article likes then redirect back to article page
 */
router.post("/article/likes/:id?", (req, res, next) => {

    // query article current no. of likes
    let likes;
    let sqlQuery = "SELECT likes FROM articles WHERE id = ?";
    global.db.all(sqlQuery, [req.query.id], function(err, result) {
        if (err) {
            next(err);
        }
        else {
            likes = result[0].likes;
            updateLikes();
        }
    });

    // update article no. of likes in database
    function updateLikes() {
        likes++;
        sqlQuery = "UPDATE articles SET likes = ? WHERE id = ?";
        global.db.run(sqlQuery, [likes, req.query.id], function (err) {
            if (err) {
                next(err);
            }
            else {
                res.redirect(`/reader/article?id=${req.query.id}`);
                next();
            }
        });
    }
});


/**
 * Add new comment then redirect back to article page
 */
router.post("/article/comment/:id?", (req, res, next) => {

    let sqlQuery = "INSERT INTO comments ('created', 'comment', 'article_id') VALUES (datetime('now', 'localtime'), ?, ?)";
    let keywords = [req.body.comment, req.query.id];
    global.db.run(sqlQuery, keywords, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect(`/reader/article?id=${req.query.id}`);
            next();
        }
    });
});

module.exports = router;