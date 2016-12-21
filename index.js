/**
 * Copyright 2016 Delegator, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

function hookshot (webhookUrl, slackMessage) {
  var options = url.parse(webhookUrl)
  options.method = 'POST'
  options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': slackMessage.length
  }

  var req = https.request(options, (res) => {
    console.log('\n===')
    console.log('Status: ', res.statusCode)
    console.log('Headers: ', res.headers)
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
      process.stdout.write(chunk)
    })
  })

  req.on('error', (e) => {
    console.error(e)
  })

  req.write(slackMessage)
  req.end()
}

exports.handler = (event, context, callback) => {
  // Slack-formatted JSON message
  var slackMessage = JSON.stringify({
    text: getCoffeeMessage()
  })

  // For each webhook url
  var slackUrls = process.env.SLACK_URL.split(' ')
  var len = slackUrls.length
  for (var i = 0; i < len; i++) {
    // Send notification
    hookshot(slackUrls[i], slackMessage)
  }

  // Done
  callback(null, 'Done.')
}

if (!process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  exports.handler(null, null, (d) => console.log('Callback: ', d))
}
