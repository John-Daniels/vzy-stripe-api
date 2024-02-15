# VZY Test API

## PM Docs

> https://documenter.getpostman.com/view/29881481/2sA2r6XPfd

## Tasks

#### Task 1: Build API Endpoints

- [x] Develop API endpoints to connect with MongoDB Atlas
- [x] Create an endpoint to register new users and authenticate existing users. Upon successful authentication, generate an access token that expires after one minute. This access token should be used as an authentication header for subsequent requests
- [x] Implement an endpoint to update user records, accessible by authorized users

#### Task 2: Implement Stripe Webhook

- [x] Set up an endpoint to accept requests from the Stripe webhook.
- [x] Verify successful payment events from Stripe.
- [x] Upon receiving payment event, update user status to "paid" in the database.

## Tools Used

- Express
- MongoDB
- Stripe
- Cloudinary
- Nodemailer
- Docker
- NGINX

## Achitecture

I this project i made use of clean achitecture

`Application layer (REST)` -> `Domain Layer (Repositories)` -> `Data Layer (Mongodb)`
Which then encourages easy error handling, mock testing, and refactoring of code

## For **dev**

Replicate .env.example to a .env file

### Response Object

> most likely looks like this!

```json
{
    "status": "success",
    "message": "Successully perform an action",
    "data": {...},
}
```

## Startup The Project

## install

```bash
yarn
```

## Then run the development server:

```bash
yarn dev
```

## Using Docker

```bash
make dev-start
```

> Check the Makefile for more commands
