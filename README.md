# Sora Iro
> An app for Fansubs Management System

[![Build Status][travis-image]][travis-url]
[![Country][country-image]](#)
[![MIT licensed][license-image]][license-url]

This repository is a Fansub Site that was built on nodejs, expressjs, bookshelf knex ORM for the backend and modular-admin, bootstrap, daemonite-material, etc for the frontend.

## Installation
First you need knex CLI for the first time use.
```sh
$ npm install -g knex
```
After install knex CLI, you need to clone this repository and install all required dependencies.
```sh
$ git clone https://github.com/lowsprofile/soraio.git
$ npm install
```
Last step, migrate and seed the databases then start the engine.
```sh
$ knex migrate:latest && knex seed:run
$ npm start
```

Then navigate to the app in browser, default port is on ``3000`` or you can customize it on ``config.js`` file.

## Run as production
Changes environtment on ```conf/config.js``` file, from development to production.

If you run as a production that means you need to setup the other variables such as ```databaseHost```, ```databaseUsername```, ```databasePassword```, and ```databaseName```. That was all required for mysql database connection.

## Release History

* 0.0.1
    * Work in progress

## Meta

Eries Trisnadi – zdumb1885@outlook.com

- Distributed under the MIT License.
- See ``LICENSE`` for more information.

[https://github.com/lowsprofile/soraio](https://github.com/lowsprofile/soraio)

[travis-image]: https://img.shields.io/travis/lowsprofile/soraio/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/lowsprofile/soraio
[country-image]: https://img.shields.io/badge/country-indonesia-blue.svg?style=flat-square
[license-image]: https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square
[license-url]: https://sorairo.mit-license.org/
