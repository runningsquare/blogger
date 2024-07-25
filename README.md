# Blogger
Daabase Networks and the Web course project (July 2023)

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
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

## routes

## views

## db_schema.sql

## Getting Started
### Dependencies
1. NodeJS
- Follow installation instructions at https://nodejs.org/en/
2. sqlite3
- Windows: https://www.sqlitetutorial.net/download-install-sqlite/
- Mac users: it comes preinstalled
- Linux users: use a package manager eg. apt install

### Installation / Executing Program
Run the following commands to get started:
1. Clone repository from Github
```git clone https://github.com/runningsquare/blogger.git```
2. Install all the node packages required
```npm install```
3. Build the database
```Get-Content db_schema.sql | sqlite3 database.db``` (Windows)
```npm run build-db``` (macOS, Linux)
4. Run the program
```npm run start```