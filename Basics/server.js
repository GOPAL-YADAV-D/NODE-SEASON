const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;

// 1 MB
// To test set to 10 bytes.
const MAX_SIZE = 1e6; 

const server = http.createServer((req, res) => {

    const { url, method } = req;

    if (url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <html>
            <head><title>Form</title></head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>
        `);
        return;
    }

    if (url === '/message' && method === 'POST'){
        const filepath = path.join(__dirname, 'message.txt');
        let totalSize = 0;
        let aborted = false;

        // Method One: Assuming Only Textual MIME Types
        let body = '';

        req.on('data', (chunk) => {
            totalSize += chunk.length;

            if(totalSize > MAX_SIZE){
                aborted = true;
                
                // Terminates the Connection Abruptly and the Page and sends a ERR_EMPTY_RESPONSE in Browser
                // req.destroy(); 

                // res.statusCode = 413;
                // Location Header is redundant
                // res.setHeader('Content-Type', 'text/plain');

                res.writeHead(413, {'Content-Type': 'text/plain'}); 
                res.end("Payload to Large");

                req.removeAllListeners('data');
                req.removeAllListeners('end');

                return;
            }
            
            body += chunk.toString();
        });

        req.on('end', async ()=>{
            if (aborted) return;

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
        /*const dataChunks = [];

        req.on('data', (chunk) =>{
            totalSize += chunk.length;

            if(totalSize > MAX_SIZE){
                req.destroy();
            }

            dataChunks.push(chunk);
        })

        req.on('end',async () => {
            const buffer = Buffer.concat(dataChunks);
            const bodyString = buffer.toString();
            const params = new URLSearchParams(bodyString);
            const message = params.get('message');

            try {
                await fs.appendFile(filepath, message + '\n');
            } catch (err){
                console.error("File Write Failed:", err)
            }

            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
        return;*/
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);

