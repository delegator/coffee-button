# Coffee Button

AWS Lambda function.

# Requirements

 - Node.js `>= 4.3.2`

# Getting started

```bash
node index.js
```

# Environment variables

### `TZ` : Process time zone, used for the Date() constructor.

Example:
```
TZ=America/New_York
```

### `SLACK_URL` : The URL of a Slack "Incoming Webhook" integration.

Example:
```
SLACK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```


# Hacking

```bash
# Install deps
$ yarn install

# Lint
$ yarn run lint
```
