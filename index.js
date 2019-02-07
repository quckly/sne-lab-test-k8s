'use strict';
console.log("Begin index.js")

const express = require('express')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto')
const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname + "\n" +
            "Node.JS Version = " + process.version)
})

app.get('/content', (req, res) => {
    getHash()

    res.sendFile(__dirname + 'public/index.html')
})

app.get('/healtz', (req, res) => {
    res.send('Ok!')
})

function fibo(n) { 
    if (n < 2)
        return 1;
    else
        return fibo(n - 2) + fibo(n - 1);
}

function getHash() {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret);

    let i = 0
    while (i < 100 * 1000) {
        hash.update('I love cupcakes');
        i++;
    }

    return hash.digest('hex');
}

app.get('/cpu', (req, res) => {
    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname +
        "\nFibonacci of 50 is " + fibo(50) + ". Hash is " + getHash())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
