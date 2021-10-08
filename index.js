const fs = require('fs');
const http = require('http');
const url = require('url');

const individualProduct = require('./modules/individualProduct');

/////////////////////////////////
////////// FILE SYSTEM

//Blocking or Synchronous
// const inputTxt = fs.readFileSync('./txt/input.txt','utf-8');

// const outputTxt = `This is about avacado: ${inputTxt}. Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',outputTxt);

//Non-Blocking or Asynchronous
// fs.readFile('./txt/start.txt','utf-8',(err, data1)=>{
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2)   
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,(err)=>{
//                 console.log('written inside final');
//             })
//         })
//     })
// })
// console.log('After Async action');

/////////////////////////////////
////////// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req,res)=>{
    const {pathname, query} = url.parse(req.url,true);

    //overview
    if(pathname==='/overview' || pathname==='/'){
        
        const productListing = dataObj.map(item => individualProduct(item,tempCard)).join('');

        const output = tempOverview.replace(/{%Product card%}/g, productListing)

        res.writeHead(200,{'content-type':'text/html'})
        res.end(output);
    }
    
    //Product
    else if(pathname==='/product'){
        const item = dataObj[query.id];
        
        

        if(item){
            const output = individualProduct(item,tempProduct);
            res.end(output);
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.end('<h1>Please provide the product id</h1>')
        }
        
    }
    
    //API
    else if(pathname==='/api'){
            res.writeHead(200,{'content-type':'application/json'})
            res.end(data);
    }

    else{
        res.writeHead('404',{
            'content-type':'text/html',
            'my-header-content':'custom text'
        });
        res.end('<h1>Page Not Found!</h1>');
    }
})

server.listen('8000','127.0.0.1',()=>{
    console.log('server has started!');
})
