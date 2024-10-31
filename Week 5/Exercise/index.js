let http = require('http');
let port = 3000;
let fs = require('fs');

let server = http.createServer(function(req, res) {
    fs.readFile('./index.html', function(err, data) {
        if (!err) {
            res.write(data);
            res.end();
        }
    })
})

server.listen(3000, () => {console.log(`Listening on port http://localhost:${port}`)})
