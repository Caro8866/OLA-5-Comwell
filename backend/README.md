## Description

Project created as a assignment for cphbusiness.dk based upon a case presented by DWARF.dk.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Seed database

The commands listed below will insert default data into your MongoDB, execute them in the order they are listed in.

```bash
# create hotels
$ npx nestjs-command create:hotels

# create and link rooms
$ npx nestjs-command create:hotel-rooms

# create and link hotel packages
$ npx nestjs-command create:packages
```
