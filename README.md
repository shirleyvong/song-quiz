
  

#  melody 🎹
A game to guess songs from an artist based using audio previews from Spotify API.

##  Technologies
* React
* Redux
* Express

##  Installation

A premium Spotify account is required.

We need to get the `CLIENT_ID`, `CLIENT_SECRET`, and `REFRESH_TOKEN` to create an `.env` file. The `authRoutes` in `/server/app.js` are used for authorization using the authorization code flow for Spotify API, so make sure it isn't commented out.

1. Log in to Spotify and access the Dashboard to create an app [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/)

2. Edit app settings and add `http://localhost:<port>` to "Redirect URIs". Make sure to save after.

3. Create a `.env` file under `/server` with the following:

```

CLIENT_ID=<your client id>
CLIENT_SECRET=<your client secret>
PORT=<port used in redirect uri>

```

4. Start the back-end server using `npm run start` under `server`

5. Make a request to `localhost:<port>/auth`. You will be redirected to Spotify to log in. After you log in, the server will return JSON with the access token and refresh token

6. Add the refresh token to `.env`

```

CLIENT_ID=<your client id>
CLIENT_SECRET=<your client secret>
PORT=9000
REFRESH_TOKEN=<your refresh token>

```

7. Comment out the `authRoutes` in `/server/app.js`
8. Start the front end in `/client` using `npm run start` and restart the back end. 

Try it out at `localhost:3000`.
