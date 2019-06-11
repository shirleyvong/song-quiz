var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var rp = require('request-promise-native');
var cors = require('cors');
var querystring = require('querystring');

var clientId = '9c56e0d5c9774a07be5bc361c6e778f1'; // Your client id
var clientSecret = 'f5ecc1a18e6544c188029f7c439b8b11'; // Your secret
var redirectUri = 'http://localhost:9000/callback'; // Your redirect uri

var authorizationCode = ""
var accessToken = ""
var refreshToken = "";

var app = express();
app.use(cors());
// app.use(express.static(__dirname + '/public'));

var albumIds = [];
var songs = [];  // song name, preview url

function getStringOfIds(ids) {
    strings = []
    str = ""
    for (var i = 0; i < ids.length; i++) {
        if (i % 20 == 0) {
            strings.push(str.substring(0, str.length))
            str = ""
        }
        str += ids[i] + ","
    }
    return strings;
}

function getSongsFromAlbum(id) {
    return rp({
        method: "GET",
        uri: "https://api.spotify.com/v1/albums/" + id + "/tracks",
        headers: { "Authorization": "Bearer " + accessToken },
        json: true,
    })
}

function songNotInList(name, list) {
    list.forEach((i) => {
        if (i.name === name) {
            return false;
        }
    })

    return true;
}


app.get("/getTopArtists", (req, res) => {

});
    
app.get('/login', (req, res) => {
    console.log("/login called");
    const str = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
    });

    res.redirect('https://accounts.spotify.com/authorize?' + str);
});

app.get('/callback', (req, res) => {
    console.log("callback called");
    var code = req.query.code || null;
    
    // request refresh and access tokens
    var authOptions = {
        method: "POST",
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        },
        json: true
    };

    rp(authOptions).then((val) => {
        accessToken =  val.access_token;
        refreshToken = val.refresh_token;
        console.log("access token: " + accessToken);
        res.redirect("http://localhost:3000/?access_token=" + accessToken);
    }).catch((err) => {
        res.redirect("http://localhost:3000");
    })
});

app.get("/success", (req, res) => {
    if (accessToken && refreshToken) {
        res.send({authorized: true})
    } else {
        res.send({authorized: false})
    }
})

// app.get('/callback', (req, res) => {
//     var code = req.query.code || null;

//     // request refresh and access tokens
//     var authOptions = {
//         method: "POST",
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri: redirectUri,
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
//         },
//         json: true
//     };

//     rp(authOptions).then((val) => {
//         return { 
//             accessToken: val.access_token,
//             refreshToken: val.refresh_token
//         }
//     }).then((val) => {
//         let id = "3Nrfpe0tUJi4K4DXYWgMUX"; //sefa
//         accessToken = val.accessToken;
//         refreshToken = val.refreshToken;
//         console.log(accessToken);
//         console.log(refreshToken);
        
//         // get an artists album
//         return rp({
//             method: "GET",
//             uri: "https://api.spotify.com/v1/artists/" + id + "/albums",
//             headers: { "Authorization": "Bearer " + accessToken }
//         })  
//     }).then((val) => {
//         const msg = JSON.parse(val);
//         // get each album id
//         msg.items.forEach((i) => {
//             albumIds.push(i.id);
//         })
        
//         promises = []
//         albumIds.forEach((id) => {
//             promises.push(getSongsFromAlbum(id));
//         });
//         // promises.push(getSongsFromAlbum(albumIds[0]));
//         // promises.push(getSongsFromAlbum(albumIds[1]));
        
//         return Promise.all(promises);
//     }).then((values) => {
//         let messages = (values);
//         messages.forEach((msg) => {
//             msg.items.forEach(song => {
//                songs.push({
//                     name: song.name,
//                     id: song.id,
//                     previewUrl: song.preview_url,     
//                 })
//             })
//         })

//         // console.log(songs);
//     }).catch((err) => {
//         if(err.error.error == 'invalid_grant') {
//             res.redirect("/refresh_token");
//         }
//     })
// });

app.get('/refresh_token', (req, res) => {
    // requesting access token from refresh token
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')) 
        }, 
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            accessToken = body.access_token;
            console.log("new access token: " + accessToken);
            res.send("got a new access token.");
        }   
    });
});





console.log('Listening on 9000');
app.listen(9000);
