# Backend

**TL;DR** - **REMEBER TO SEED DATABASE**. run the seeding commands after opening your mogodb client. and then start backend

## Description

Built using NestJs, this backend handles functionalities like user management, hotel bookings, and data management related to hotels, rooms, and packages.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

```bash
$ npm install
```

## Setting Up Environment Variables

Copy the .env.template file to a new file named .env in the backend directory. Fill in the required details:

`JWT_SECRET="" # Replace with a secure, randomly generated 64-byte string. This is used for JWT authentication.`
`DB_HOST="127.0.0.1" # If the backend is to be run locally include this in the .env NB! Not needed for Docker`

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

Run the following commands to insert default data into your MongoDB. If the backend server is already running, open a new terminal to execute these commands.

```bash
# create hotels
$ npx nestjs-command create:hotels

# create and link rooms
$ npx nestjs-command create:hotel-rooms

# create and link hotel packages
$ npx nestjs-command create:packages

# add comwell offers
$ npx nestjs-command create:offers
```

## API endpoints

The backend provides the following endpoints:

### Authentication

- POST /auth/signup - User signup
- POST /auth/login - User login
- GET /auth/profile - Get user profile
- GET /auth/logout - User logout

### Hotels

- POST /hotels - Create a new hotel
- GET /hotels - Get all hotels
- GET /hotels/:id - Get a specific hotel
- PUT /hotels/:id - Update a specific hotel
- DELETE /hotels/:id - Delete a specific hotel
- POST /hotels/:id/packages - Create a package for a hotel
- DELETE /hotels/:id/packages/:pkgId - Delete a hotel package
- POST /hotels/:id/offers - Create an offer for a hotel
- DELETE /hotels/:id/offers/:offId - Delete a hotel offer
- POST /hotels/:id/rooms - Create a room for a hotelDELETE /hotels/:id/rooms/:RoomId - Delete a hotel room

### Packages

- POST /packages - Create a new package
- GET /packages - Get all packages
- GET /packages/:id - Get a specific package
- PUT /packages/:id - Update a specific packageDELETE /packages/:id - Delete a specific package

### Hotel Offers

- POST /hotel-offers - Create a new hotel offer
- GET /hotel-offers - Get all hotel offers
- GET /hotel-offers/:id - Get a specific hotel offer
- PUT /hotel-offers/:id - Update a specific hotel offer
- DELETE /hotel-offers/:id - Delete a specific hotel offer

### Hotel Rooms

- POST /hotel-rooms - Create a new hotel room
- GET /hotel-rooms - Get all hotel rooms
- GET /hotel-rooms/:id - Get a specific hotel room
- PUT /hotel-rooms/:id - Update a specific hotel roomDELETE /hotel-rooms/:id - Delete a specific hotel room

### Bookings

- POST /bookings - Create a new booking
- GET /bookings - Get all bookings
- GET /bookings/:id - Get a specific booking
- PUT /bookings/:id - Update a specific booking
- DELETE /bookings/:id - Delete a specific booking
