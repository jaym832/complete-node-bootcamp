// fs = file system
const fs = require('fs');
const http = require('http');
const url = require('url');



// //reads text / blocking sync way
// const text = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
// console.log(text);

// //writes text /blocking sync way
// const textOut = `this is my new text`
// fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);


// non blocking, async way
//callback hell
// fs.readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
//     fs.readFile(`./1-node-farm/starter/txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.writeFile('./1-node-farm/starter/txt/final.txt', `${data} \n${data2}`, 'utf-8', (err, data3) => {
//             console.log(data3);

//         });

//     });

// });

// console.log('will read file');

const replaceTemplate = function (temp, product) {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    console.log(product.organic)
    if (product.organic == false) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;

}

const tempOverview = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);




//SERVER (creating the server)
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    // OVERVIEW PAGE
    if (pathName == '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);


        res.end(output);
    }
    //PRODUCT PAGE
    else if (pathName == '/product') {
        res.end('this is the product page');
    }
    //API
    else if (pathName == '/api') {
        // res.writeHead(200, { 'Content-type': 'applicaton/json' });
        res.end(data);
        //NOT FOUND
    } else {
        res.end('page not found')
    }
});



server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000!');

});



