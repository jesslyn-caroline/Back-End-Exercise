let http = require('http');
let fs = require('fs');
let port = 3000;
let hostName = "127.0.0.1";

let server = http.createServer(function(req, res) {
    fs.readFile('./index.html', function(err, data) {
        if (!err) {
            res.write(data);
            res.end();
        }
    })
})

server.listen(port, hostName, () => {
    console.log(`http://${hostName}:${port}`);
})
