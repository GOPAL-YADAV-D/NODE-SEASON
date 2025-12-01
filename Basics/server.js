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

        // Method One: Assuming Only Textual MIME Types
        let body = '';
        const MAX_SIZE = 1e6;

        req.on('data', (chunk) => {
            body += chunk.toString();

            if(body.length > MAX_SIZE){
                req.destroy();
            }
        });

        req.on('end', async ()=>{
            const params = new URLSearchParams(body);
            const message = params.get('message') || "";

            try {
                await fs.appendFile(filepath, message + '\n');
            } catch (err){
                console.error("File Write Failed:", err)
            }

            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })  
        return;


        // Method Two: Handling Binary Data (Uncomment to use)
        // const dataChunks = [];
        // const MAX_SIZE = 1 * 1024 * 1024;
        // let totalSize = 0;

        // req.on('data', (chunk) =>{
        //     totalSize += chunk.length;

        //     if(totalSize > MAX_SIZE){
        //         req.destroy();
        //     }

        //     dataChunks.push(chunk);
        // })

        // req.on('end',async () => {
        //     const buffer = Buffer.concat(dataChunks);
        //     const bodyString = buffer.toString();
        //     const params = new URLSearchParams(bodyString);
        //     const message = params.get('message');

        //     try {
        //         await fs.appendFile(filepath, message + '\n');
        //     } catch (err){
        //         console.error("File Write Failed:", err)
        //     }

        //     res.statusCode = 302;
        //     res.setHeader('Location', '/');
        //     res.end();
        // })
        // return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);

