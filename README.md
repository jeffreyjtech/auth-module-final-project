# Auth Module Final Project

This is a HTTP-based Forum Application. Users are able to signin/signup, create threads, and reply to threads. It has full CRUD for managing threads and replies, and prevents users from manipulating other's posts and replies without admin override.

[Deployed API](https://auth-module-final-project1.herokuapp.com/)

<!-- ## UML Diagram

![UML Diagram](./assets/lab-7-uml.jpg) -->

## Installation

1. Clone from this repo `git clone https://github.com/BeauHibbert/auth-module-final-project.git`
2. `cd` into `auth-module-final-project`
3. Run `npm install`
4. Optionally, create an .env file with variable `PORT` to assign your preferred port number. The default `PORT` is `3000`.

## Contributors / Authors

- Beau Hibbert
- Jeffrey Jenkins

### Credits

- Used the authentication model and routes from Lab 08.

## Features & Routes

### Security

- Two ACL roles exists: `editor` and `admin`
  - Editors are able to perform full CRUD on their own replies and threads.
  - Admins are able to perform full CRUD on all content in the database.

### Routes

- POST : `signup`
  - Required: Request body
    - Requires a JSON body containing a key-value pair for a `username` and a `password`.
  - Response
    - status `200`, and a JSON body which is the `user` record created in the database.
      - body: `{ // refer to schema }`
    - status `500`, `id` param is invalid.

- POST : `/signin`
  - Required: Authorization header
    - Requires a `Basic` authorization header containing a base-64-encoded `username:password` auth string.
  - Response
    - status `200`, and a JSON body which is the `user` record which matches the given username and password.
    - status `403`, if auth string is invalid.

- GET : `/users`
  - Required: Authorization header
    - Requires a `Bearer` authorization header containing a valid sign-in token which belongs to an **admin** account.
  - Response
    - status `200`, and a JSON body of all the usernames present in the `users` table.
    - status `403`, if sign-in token is invalid.

#### `/forum` CRUD

- POST : `/forum`
  - Requires: Request body & Bearer auth header
    - Requires a JSON body containing the thread `title`.
    - Requires a valid login token
  - Response
    - Status `201`, and a JSON body which is the `thread` record created in the database.

- GET : `/forum`
  - Requires: Bearer auth header
    - Requires a valid login token
  - Response
    - Status `200`, and a JSON body which contains all threads in the database.

- PUT : `/forum/:threadId`
  - Requires: Request body, auth header, & param
    - Requires a JSON body containing the thread `title` to update in the target thread.
    - Requires a valid login token
    - Requires a threadId param
  - Response
    - Status `201`, and a JSON body which is the `thread` record updated in the database.

- DELETE : `/forum/:threadId`
  - Requires: Auth header & param
    - Requires a valid login token
    - Requires a threadId param
  - Response
    - Status `200`, and a JSON body which is the `thread` record removed from the database.

#### `replies` CRUD

- POST : `/forum/:threadId`
  - Requires: Request body, auth header, & param
    - Requires a JSON body containing the thread `title`.
    - Requires a valid login token
    - Requires a threadId param
  - Response
    - Status `201`, and a JSON body which is the `reply` record created in the database.

- GET : `/forum/:threadId`
  - Requires: Bearer auth header & param
    - Requires a valid login token
    - Requires a threadId param
  - Response
    - Status `200`, and a JSON body which contains all replies attached to the given `threadId`.

- PUT : `/forum/:threadId/replyId`
  - Requires: Request body, auth header, & params
    - Requires a JSON body containing the `bodyText` to update in the target reply.
    - Requires a valid login token
    - Requires a threadId and replyId param
  - Response
    - Status `201`, and a JSON body which is the `reply` record updated in the database.

- DELETE : `/forum/:threadId`
  - Requires: Auth header & params
    - Requires a valid login token
    - Requires a threadId and replyId params
  - Response
    - Status `200`, and a JSON body which is the `reply` record removed from the database.

### Schemas

#### `users` schema:

```js
{
  username: "testUser", // Required and must be unique
  password: "secret", // Required
  token: "<jwt-signed-token>", // A generated jwt created on get and set in combination with a secret
  roles: ENUM["editor","admin"], // Required, defaults to "editor" if not provided
  capabilities: ARRAY[RIGHTS] // An array of rights for each role
}
```

#### `threads` schema:

```js
{
  creator: "testUser", // Required, filled in with your validated username by the API upon creation
  title: "My thread title!" // Required
}
```

#### `replies` schema:

```js
{
  creator: "testUser", // Required, filled in with your validated username by the API upon creation
  title: "My reply to my thread" // Required
}
```

<!-- 

# Bearer Auth

This API is able to handle users signing up, signing in, and verifying the integrity of both `Basic` auth strings and `Bearer` tokens. With the latter feature, it prevents un-authorized operations on the API's resources.

[Deployed API](https://jjtech-bearer-auth.herokuapp.com/)

## UML Diagram

![UML Diagram](./assets/lab-7-uml.jpg)

## Installation

1. Clone from this repo `git clone https://github.com/jeffreyjtech/bearer-auth.git`
2. `cd` into `bearer-auth`
3. Run `npm install`
4. Optionally, create an .env file with variable `PORT` to assign your preferred port number. The default `PORT` is `3000`.

## Usage

After installation, run `npm start`.

## Contributors / Authors

- Jeffrey Jenkins

## Features / Routes

### Token Security Options

Token security can be enhanced with the following options:

- `TOKEN_SINGLE_USE`: If this environment variable is set to `true`, tokens will expire immediately after use.
- `TOKEN_EXPIRATION`: If this environment variable is set to `true`, tokens will expire after 10 minutes.

### Routes

- POST : `signup`
  - Required: Request body
    - Requires a JSON body containing a key-value pair for a `username` and a `password`.
  - Response
    - status `200`, and a JSON body which is the `user` record created in the database.
      - body: `{ // refer to schema }`
    - status `500`, `id` param is invalid.

- POST : `/signin`
  - Required: Authorization header
    - Requires a `Basic` authorization header containing a base-64-encoded `username:password` auth string.
  - Response
    - status `200`, and a JSON body which is the `user` record which matches the given username and password.
    - status `403`, if auth string is invalid.

- GET : `/users`
  - Required: Authorization header
    - Requires a `Bearer` authorization header containing a valid sign-in token.
  - Response
    - status `200`, and a JSON body of all the usernames present in the `users` table.
    - status `403`, if sign-in token is invalid.



-->
![uml-401-lab-9](https://user-images.githubusercontent.com/91757275/161650604-bcc62175-0831-4d9a-905b-6f1d7e7142ab.jpg)
