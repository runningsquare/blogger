# Blogger
Daabase Networks and the Web course project (July 2023)

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Three-tier Web Application Architecture](#three-tier-web-application-architecture)
- [routes](#routes)
- [views](#views)
- [db_schema.sql](#db_schemasql)
- [Getting Started](#getting-started)

## Introduction
Blogger is a simple blogging web application for authors and readers. Authors can create, edit and publish articles. For readers, they can browse, read, comment on and like the published articles.

## Project Structure
```
├── routes
│   ├── author.js
│   ├── reader.js
│   ├── user.js
├── styles
│   ├── author-article-edit.css
│   ├── author-home.css
│   ├── author-settings.css
│   ├── reader-article.css
│   ├── reader-home.css
├── views
│   ├── author-article-edit.ejs
│   ├── author-home.ejs
│   ├── author-settings.ejs
│   ├── create-user-record.ejs
│   ├── reader-article.ejs
│   ├── reader-home.ejs
├── .gitignore
├── README.md
├── db_schema.sql
├── index.js
├── package-lock.json
├── package.json
```

## Three-tier Web Application Architecture
![alt text](three-tier-web-application-architecture.png)

## routes
### index.js
The index.js file sets up the configuration of the web application, such as creating and running the web application's database, seting the view engine and the routes of the web app. There are three main routes ```/author``` ```/reader``` ```/user``` which are defined in the javascript files below. The root route redirects the user to ```/reader/home```.

### author.js
author.js creates and defines 8 subroutes:
- ```/author/home```
- ```/author/article/create```
- ```/author/article/edit/:id?```
- ```/author/article/update/:id?```
- ```/author/article/publish/:id?```
- ```/author/article/delete/:id?```
- ```/author/settings```
- ```/author/update/:id?```

```/author/home```
The web app receives a ```get``` request when a user enters the ```/author/home``` route. It queries the database for the author's data and articles and passes the data to ```author-home.ejs``` for rendering the author's homme page.

```/author/article/create```
A ```POST``` request is sent to this route when the author clicks on the "CREATE NEW DRAFT" button in the author home page. Then, the web app creates a new empty article in the database and redirects to the article edit page ```/author/article/edit/:id?```. The id is the newly created article id.

```/author/article/edit/:id?```
 retrieves data about the author and article to be edited from the database and then passes the data to ```author-article-edit.ejs``` for rendering the article edit page.

```/author/article/update/:id?```
 updates the new article content submitted by the author into the database then redirects to its edit page.

```/author/article/publish/:id?```
 updates the article published field in the database then redirects to author home page.

```/author/article/delete/:id?```
 deletes the article from database then redirects to author home page.

```/author/settings```
 queries the database for author data then renders the page for author settings ```author-settings.ejs```.

```/author/update/:id?```
 updates the database with the newly submitted author blog information from the author settings page and then redirects to the author home page.

### reader.js
reader.js creates and defines 4 subroutes:
- ```/home```
- ```/article/:id?```
- ```/article/likes/:id?```
- ```/article/comment/:id?```

```/reader/home```
Queries user data and all articles from the database and then passes the data to render reader home page ```reader-home.ejs```.

```/reader/article/:id?```
Queries user data, comments and contents from the selected article from the database and then passes the data to render the article page ```reader-article.ejs```.

```/reader/article/likes/:id?```
When the user interacts with the article's like button on the article page, the web app queries the database for the article's current number of likes then updates the number. Then the reader is redirected back to the article page.

```/reader/article/comment/:id?```
When the user posts a new comment on the article page, the web app inserts it into the database then redirects the user back to the article page.

### user.js
user.js creates and defines 3 subroutes:
- ```/users/get-test-users```
- ```/users/get-user-records```
- ```/users/create-user-record``` (```get``` request)
- ```/users/create-user-record``` (```POST``` request)

It also defines the following helper functions for the routes:
- ```generateRandomData(numWords=5)```
- ```choose(array)```

```/users/get-test-users```
retrieves the current users from database.

```/users/get-user-records```
retrieves the current users records from database.

```/users/create-user-record``` (```get``` request)
renders ```create-user-record.ejs``` for creating a new user record.

```/users/create-user-record``` (```POST``` request)
add a new user record to the database for user id = 1.

```generateRandomData(numWords=5)```
generates a random string for users test record value.

```choose(array)```
choose and return an item from an array.

## db_schema.sql
TODO

## Getting Started
### Dependencies
- NodeJS

Follow installation instructions at https://nodejs.org/en/
- sqlite3

<b>Windows:</b> https://www.sqlitetutorial.net/download-install-sqlite/
<br>
<b>Mac users:</b> it comes preinstalled
<br>
<b>Linux users:</b> use a package manager eg. apt install

### Installation / Executing Program
Run the following commands to get started:
1. Clone repository from Github
```
git clone https://github.com/runningsquare/blogger.git
```
2. Install all the node packages required
```
npm install
```
3. Build the database (for Windows)
```
Get-Content db_schema.sql | sqlite3 database.db
```
3. Build the database (for macOS, Linux)
```
npm run build-db
```
4. Run the program
```
npm run start
```
5. Open the program at ```http://localhost:3000/author/home```