# Simple CRUD API

This project is a simple CRUD (Create, Read, Update, Delete) API using an in-memory database built with **Node.js** and **Express.js**. The API provides endpoints to manage user records, handling HTTP requests for creating, retrieving, updating, and deleting users. Each user record contains an `id`, `username`, `age`, and `hobbies`.

## Features

- **CRUD Operations** for managing users
  - **GET** all users
  - **GET** user by ID
  - **POST** new user
  - **PUT** update user by ID
  - **DELETE** user by ID
- **Error handling** for invalid requests (e.g., invalid user ID, missing required fields)
- **In-memory database** for user records
- **Environment variable support** for port configuration
- **Development and Production modes**
- **Optional horizontal scaling** with Node.js Cluster API and load balancer

## Requirements

- **Node.js** (version 22.9.0 or higher)
- **npm** (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/fabiandres88/basic-crud-api.git (HTTPS)

git clone git@github.com:fabiandres88/basic-crud-api.git (SH)

cd basic-crud-api

npm install
```

Create an .env file in the root directory and specify the port (optional):

```
PORT=4000
```

```bash
npm run start
PORT=4000
```
