# GameArchiveApp

This application is a game finder for the third edition of the Altimetrik Front end Bootcamp, (BEFEDA).
It was made with HTML5, CSS and vanilla JavaScript.
It allows users to search games using RAWG.IO API.

## Features

- Infinite Scroll
- Modal with details of every game
- Log in functionality made client-side


## Screenshots

![App Screenshot](https://prnt.sc/kEAi_1d9XI-c)


## Deployment

To deploy this project run

```bash
  npm install -g json-server json-server-auth
```
```bash
  json-server-auth db.json
```


## API Reference

#### RAWG.IO

#### Get a list of games

```http
  GET /api/games
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/games/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

