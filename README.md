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

## views

## db_schema.sql

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