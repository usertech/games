# U+Game

Hello there,

so you want to be developer in U+? We prepared a little challenge for you. No bullshit, just a real world scenario, you could face as dev here.

## Description

We love to play our Playstation in office, one of the game here is GTA V. But we would like to buy older games from this series. And of course as cheap as possible.
You will be Backend developer providing API endpoint for your colleague on frond-end checking if game is cheap enough to buy.

Your tech stack will be Nest.js which is wrapper around Node.js + Express taking advantage of Typescript. If you don't know it, check it out, its really easy to start, check `https://docs.nestjs.com/`.

## Your task

You will work with API `https://www.cheapshark.com/api/`. Lucky for you somebody just started on this project, so continue, where he left. Fork this repo and:

- Expand app logic to fetch the cheapest price ever for game (spoiler alert - you need to call `https://www.cheapshark.com/api/documentation.html#deals`).
- Return just data in `IGame` interface to endpoint GET `/games`.
- When endpoint GET `/games` is called, you have to save this event to database (of your choice). You will save just when endpoint was called. In the end you will have in table two columns `id` and `called_at` of type DATETIME.
- Make endpoint GET `/calls` and return data from database you created. Return only calls made on Mondays.
- Endpoint GET `/calls` has to be private, make it so, it's up to you what method will you choose.
- Tests are up to you, if you will provide them, you will get in front of other candidates.

## Installation and run

```bash
$ npm install
```

```bash
$ npm start
```

### Using docker-compose

Run the app with postgres with adminer accessible at `localhost:8080` (use `postgres` for server name when logging in).

```bash
$ docker-compose up --build
```

## Tests

### Unit

```bash
$ npm test
```

### e2e (using docker-compose)

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.e2e.yml up --build
```

### Authorization

`GET /calls` endpoint is authorized. Use `Authorization: Bearer {token}` header to
access it. Find the token in `development.env`
