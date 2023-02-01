# log-parser-app

**This app take log file as input and outputs json file with log level error and warn in a specific format.**

- Input File Format : `<ISO Date> - <Log Level> - {"transactionId: "<UUID>", "details": "<message event/action description>", "err": "<Optional, error description>", ...<additional log information>}`

- Output File Format : `[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "err": "<Error message>" }]`

## FRONTEND

- Run  `npm install` to install node_modules
- Run `npm run start` to start the application

## BACKEND

- Run  `npm install` to install node_modules
- Run `npm run start` to start the application