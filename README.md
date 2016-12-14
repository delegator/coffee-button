# Coffee Button

AWS Lambda function.

# Requirements

 - Node.js `>= 4.3.2`
 - Yarn `^0.18.0`

# Getting started

```bash
# Export environment variables...
export FOO=bar

# Run program
$ yarn start
```

# Environment variables

### `TZ` : Process time zone, used for the Date() constructor.

Example:
```
TZ=America/New_York
```

### `SLACK_URL` : One or more Slack "Incoming Webhook" integration URLs.

If more than one endpoint is desired, the URLs should be space-separated.

Examples:
```
SLACK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

```
SLACK_URL="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
```

# Hacking

```bash
# Install deps
$ yarn install

# Lint
$ yarn run lint
```

# License

[Apache 2.0][license]

[license]: LICENSE
