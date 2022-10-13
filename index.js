const fs = require('fs');
const http = require('http');
const path = require('node:path/win32');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataJson = JSON.parse(data);

const slug = dataJson.map(el => slugify(el.productName, {lower: true}));
console.log(slug);

const server = http.createServer((req, res) => {

    const {query, pathname } = url.parse(req.url, true);

    // Overview page
    if (req.url ==='/' || req.url === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataJson.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataJson[query.id];
        const output = replaceTemplate(templateProduct, product);
        res.end(output);

    // API page
    } else if (req.url === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello World'
        });
        res.end('<h1>Page not FOUND!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});