const express = require('express');

const app = express();
const axios = require('axios');
const logger = require('./middleware/logger');
const multer = require('multer');
const upload = multer();

const bp = require('body-parser');

// Application servers
const servers = [
    "http://localhost:3000",
    "http://localhost:3001"
]

// Track the current application server to send request
let current = 0;

// Receive new request
// Forward to application server
const handler = async(req, res) => {

    // Destructure following properties from request object
    const { method, url, headers, body } = req;


    console.log(method)
    console.log(url)
        // console.log(headers)
        // console.log((body))
        // Select the current server to forward the request
    const server = servers[current];

    // Update track to select next server
    current === (servers.length - 1) ? current = 0 : current++
        let response;
    try {


        let response;
        if (method == "POST") {

            response = await axios.post(`${server}${url}`, body, headers);
        }
        // Requesting to underlying application server
        else {
            response = await axios.get(`${server}${url}`, { headers: headers });

        }
        // Send back the response data
        // from application server to client

        console.log(`reverse proxy on ${servers[current]}`)
        res.send(response.data)
    } catch (err) {
        // Send back the error message
        res.status(500).send(`Server error : ${err} on (${servers[current]}${url} !`)
    }
}
app.use(logger)

app.use(bp.json())
app.use(bp.urlencoded({
    extended: false

}))


app.use(express.json());

// When receive new request
// Pass it to handler method
app.use((req, res) => {

    handler(req, res)
});

// Listen on PORT 3030

app.listen(3030, err => {
    err ?
        console.log("Failed to listen on PORT 3030") :
        console.log("Load Balancer Server " +
            "listening on PORT 3030");
});