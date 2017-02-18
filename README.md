# Sora Iro
> An app for Fansubs Management System

[![Build Status][travis-image]][travis-url]
[![Country][country-image]](#)
[![MIT licensed][license-image]][license-url]
[![Website][website-image]][website-url]
[![Dev Dependencies][dependencies]](dependencies-url)
[![Dependencies][dev-dependencies]][dev-dependencies-url]

This repository is a Fansub Site that was built on nodejs, expressjs, bookshelf knex ORM for the backend and modular-admin, bootstrap, daemonite-material, etc for the frontend.

## Installation
First, you need to clone this repository and install all required dependencies.
```sh
$ git clone https://github.com/soraio/soraio.git
$ npm install
```
Then, migrate and seed the databases then start the engine.
```sh
$ npm run build
$ npm start
```

Then navigate to the app in browser, default port is on ``3000`` or you can customize it on ``config.js`` file.

## Run as production
Changes environtment on ```conf/config.js``` file, from ```development``` to ```production```.

###### Default Configuration
```javascript
module.exports = {
  /**
    * Environments.
    * @var
    * @param environment {string} - The environment type
    * Environment list :
    * - development
    * - staging
    * - production
    */
  environment: 'development',
  port: 3000,

  /**
    * Database Configuration.
    * @var
    * @param databaseHost {string} - Your Database Host
    * @param databaseUsername {string} - Your Database Username
    * @param databasePassword {string} - Your Database Password
    * @param databaseName {string} - Your Database Name
    */

  dbPrefix          : 'sora_',
  databaseHost      : 'Hostname',
  databaseUsername  : 'Username',
  databasePassword  : 'Password',
  databaseName      : 'Database'

}
```

## Release History

* 0.0.1
    * Work in progress

## Credits

Eries Trisnadi – [zdumb1885@outlook.com](mailto:zdumb1885@outlook.com)

- Distributed under the MIT License.
- See ``LICENSE`` for more information.

[website-image]: https://img.shields.io/website-up-down-green-red/http/sorairo.fansubs.pw.svg?style=flat-square
[website-url]: https://sorairo.fansubs.pw
[dev-dependencies]: https://img.shields.io/david/dev/soraio/soraio.svg?style=flat-square
[dependencies]: https://img.shields.io/david/soraio/soraio.svg?style=flat-square
[dev-dependencies-url]: https://david-dm.org/soraio/soraio?type=dev
[dependencies-url]: https://david-dm.org/soraio/soraio
[travis-image]: https://img.shields.io/travis/soraio/soraio/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/soraio/soraio
[country-image]: https://img.shields.io/badge/country-indonesia-blue.svg?style=flat-square
[license-image]: https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square
[license-url]: https://sorairo.mit-license.org/
