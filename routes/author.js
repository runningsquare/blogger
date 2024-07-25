/** These are routes for author */

const express = require("express");
const router = express.Router();

/**
 * @desc Renders the page for author
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
    sqlQuery = "SELECT * FROM articles";
    global.db.all(sqlQuery, function(err, result) {
        if (err) {
            next(err);
        }
        else {
            res.render("author-home", {author: author, articles: result});
        }
    });
});


/**
 * @desc Creates a new article then redirects to its edit page
 */
router.post("/article/create", (req, res, next) => {

    let sqlQuery = "INSERT INTO articles ('author_id', 'title', 'subtitle', 'created', 'last_modified') VALUES (1, 'Insert title', 'Insert subtitle', datetime('now', 'localtime'), datetime('now', 'localtime'))";
    global.db.run(sqlQuery, function(err) {
        if (err) {
            next(err); //send the error on to the error handler
        }
        else {
            res.redirect(307, `/author/article/edit?id=${this.lastID}`);
            next();
        }
    });
});


/**
 * @desc Renders the page for article edit
 */
router.post("/article/edit/:id?", (req, res, next) => {

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

    // query article info from database
    sqlQuery = "SELECT * FROM articles WHERE id=?";
    global.db.all(sqlQuery, [req.query.id], function(err, result) {
        if (err) {
            next(err);
        }
        else {
            res.render("author-article-edit", {
                article: result[0], author: author
            });
            next();
        }
    });
});


/**
 * @desc Updates the article content in database then redirects to its edit page
 */
router.post("/article/update/:id?", (req, res, next) => {

    let id = req.query.id;
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let content = req.body.content;

    let sqlQuery = "UPDATE articles SET title = ?, subtitle = ?, content = ?, last_modified = datetime('now', 'localtime') WHERE id = ?";
    let keywords = [title, subtitle, content, id];
    global.db.run(sqlQuery, keywords, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect(307, `/author/article/edit?id=${id}`);
            next();
        }
    });
});


/**
 * @desc Update the article as published in database then redirects to author home page
 */
router.post("/article/publish/:id?", (req, res, next) => {

    let sqlQuery = "UPDATE articles SET published = datetime('now', 'localtime') WHERE id = ?";
    global.db.run(sqlQuery, [req.query.id], function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect("/author/home");
            next();
        }
    });
});


/**
 * @desc Delete the article from database then redirects to author home page
 */
router.post("/article/delete/:id?", (req, res, next) => {

    let sqlQuery = "DELETE FROM articles WHERE id = ?";
    global.db.run(sqlQuery, [req.query.id], function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect("/author/home");
            next();
        }
    });
});


/**
 * @desc Renders the page for author settings
 */
router.get("/settings", (req, res, next) => {

    // query header info from database
    let sqlQuery = "SELECT * FROM authors WHERE id=1";
    global.db.all(sqlQuery, function(err, result) {
        if (err) {
            next(err); //send the error on to the error handler
        }
        else {
            res.render("author-settings", {author: result[0]});
        }
    });
});


/**
 * @desc Update the author information
 */
router.post("/update/:id?", (req, res, next) => {

    let id = req.query.id;
    let blogTitle = req.body.blogTitle;
    let blogSubtitle = req.body.blogSubtitle;
    let authorName = req.body.authorName;

    let sqlQuery = "UPDATE authors SET blog_title = ?, blog_subtitle = ?, name = ? WHERE id = ?";
    let keywords = [blogTitle, blogSubtitle, authorName, id];
    global.db.run(sqlQuery, keywords, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect("/author/home");
            next();
        }
    });
});

module.exports = router;