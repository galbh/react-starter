## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [node run-node-server.js](#run-node-server)
  - [python run_servers.py](#run_servers)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
runs karma with --single-run for production CI environment.
In order to run tests in development with watch configuration:
1. npm install -g karma-cli
2. npm run test:local
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `node run-node-server.js`

run node server on localhost port 3000, this server serves the compiled files from dist as well as the rest api.

### `python run_servers.py`

runs both the node server on port 3000 and webpack-dev-server on port 8080