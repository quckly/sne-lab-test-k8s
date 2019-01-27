const express = require('express')
const os = require('os')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let hostname = "not available"
    
    try {
        hostname = fs.readFileSync('/tmp/mainhostname', encoding='utf-8')
    } catch(e) {}

    res.send('Container name: ' + os.hostname() + ". Host: " + hostname)
})

function fibo(n) { 
    if (n < 2)
        return 1;
    else
        return fibo(n - 2) + fibo(n - 1);
}

app.get('/cpu', (req, res) => {
    res.send('Container name: ' + os.hostname() + ". Host: " + hostname +
        "Fibonacci of 15 is " + fibo(15))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
