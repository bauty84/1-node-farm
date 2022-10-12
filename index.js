const fs = require('fs');
const http = require('http');

////////////////////////////////////////
////// FILES 
// Blocking, Synchronous Way
/* const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File has benn written!'); */

// Non Blocking, Asynchronous Way
/* fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error!');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./text/final.txt', `${data2}\n${data3}`, 'utf-8', (err) =>{
                console.log("The file has been written! :D");
            });
        });
    });
});

console.log('Will read file!'); */

////////////////////////////////////////
////// SERVER
const server = http.createServer((req, res) => {
    res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});