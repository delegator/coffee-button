'use strict'

const https = require('https')
const url = require('url')

function pad (n) {
  return n < 10 ? '0' + n : n
}

function getCoffeeMessage () {
  var d = new Date()
  return '' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ' :coffee: is up!'
}

exports.handler = (event, context, callback) => {
  var postData = JSON.stringify({
    text: getCoffeeMessage()
  })

  var options = url.parse(process.env.SLACK_URL)
  options.method = 'POST'
  options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }

  var req = https.request(options, (res) => {
    console.log('statusCode: ', res.statusCode)
    console.log('headers: ', res.headers)
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
      process.stdout.write(chunk)
    })

    res.on('end', () => {
      callback(null, 'Request complete.')
    })
  })

  req.write(postData)
  req.end()

  req.on('error', (e) => {
    console.error(e)
  })
}

if (!process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  exports.handler(null, null, (d) => console.log(d))
}
