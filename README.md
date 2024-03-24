# Home Library Service

For now it's a simple CRUD api for musical service, including the following resources:

- /track
- /artist
- /album
- /favs
- /user

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop [Download & install Docker Desktop](https://www.docker.com/products/docker-desktop/) to view/edit running docker images and containers

## Downloading & installing

1. First, clone the repository:
```
git clone {repository URL}
```
2. Switch to the current branch: 
```
git switch docker-orm
or
git checkout docker-orm
```
3. Then, install the dependencies using the following command in cloned project directory:
```
npm i or npm ci
```
4. Rename `.env.example` to `.env`
or create am `.env` file in the current directory

## Running application

To start building and running docker image:

```
npm run docker
```
Wait until container finishes building..

### And everything's done! You can run tests, or use `npm run docker:scan` to scan the image for vulnerabilities

After starting the app you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Some important things

Note that default .env ports are:
- api: 4000
- postgre: 5432

My docker image hub link:
https://hub.docker.com/repository/docker/svygzhryr/music-service/tags?page=1&ordering=last_updated
