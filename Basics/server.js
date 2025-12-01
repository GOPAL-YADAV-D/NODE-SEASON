const http = require('http');
const fs = require('fs').promises;
const { constants } = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && req.method === 'POST'){
        const filepath = path.join(__dirname, 'message.txt');
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        console.log(body);

        req.on('end', async ()=>{
            const params = new URLSearchParams(body);
            const message = params.get('message');

            try {
                await fs.access(filepath, constants.F_OK);
                await fs.appendFile(filepath, `\n${message}`);
            } catch (err){
                await fs.writeFile(filepath, message);
            }

            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })  
        return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);

