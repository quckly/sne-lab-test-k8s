'use strict';
console.log("Begin index.js")

const express = require('express')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const app = express()
const port = 3000

console.log(path.join(__dirname, 'public'))

let metrics = {visits: 0}

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    metrics.visits++

    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname + "\n" +
            "Node.JS Version = " + process.version)
})

app.get('/content', (req, res) => {
    metrics.visits++

    getHash()

    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/healtz', (req, res) => {
    res.send('Ok!')
})

app.get('/metrics', (req, res) => {
    res.send('visitCount=' + metrics.visits)
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
    while (i < (500 * 1000)) {
        hash.update('I love cupcakes');
        i++;
    }

    return hash.digest('hex');
}

app.get('/cpu', (req, res) => {
    metrics.visits++

    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname +
        "\nFibonacci of 35 is " + fibo(35) + ". Hash is " + getHash())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
