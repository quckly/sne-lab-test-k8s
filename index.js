const express = require('express')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname)
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

app.get('/cpu', (req, res) => {
    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret);

    let i = 0
    while (i < 1000) {
        hash.update('I love cupcakes')
        i++
    }

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname +
        "Fibonacci of 25 is " + fibo(25) + ". Hash is " + hash.digest('hex'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
