#  melody 🎹
A game to guess songs from an artist using audio previews from Spotify API.
Available at http://melody-quiz.herokuapp.com/

##  Technologies
* React
* Redux
* Express
* Redis

##  Installation
To run the application on your own system, a premium Spotify account is required.

1.  Create a `.env` file under `/server` with the following:
    ```
    CLIENT_ID=<client id from spotify>
    CLIENT_SECRET=<client secret from spotify>
    PORT=<port used in redirect uri from spotify>
    REDIS_HOST=<redis host>
    REDIS_PASSWORD=<redis password>
    REDIS_PORT=<redis port>
    ```
    The client ID, client secret, and port from redirect URI is taken from your Spotify API application. 

2. The `authRoutes` in `/server/app.js` are used for authorization using the authorization code flow for Spotify API. Uncomment the routes and start the back-end server using `npm run start`
3. Make a request to `localhost:<port>/auth`. You will be redirected to Spotify to log in. After you log in, the server will return a JSON object with the access token and refresh token
4. Add the refresh token to the .env file:
    ```
    REFRESH_TOKEN=<your refresh token>
    ```
4. Comment the `authRoutes` in `/server/app.js` and start the back-end server using `npm run start`
5. Start the front end in `/client` using `npm run start`

Try it out at `localhost:3000`.
