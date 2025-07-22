
[![Build status](https://dev.azure.com/APS-SD-Stewards/APS-SD/_apis/build/status/proscrumdev.battleship-nodejs-CI)](https://dev.azure.com/APS-SD-Stewards/APS-SD/_build/latest?definitionId=22)

# Battleship NodeJs

A simple game of Battleship, written in NodeJs. The purpose of this repository is to serve as an entry point into coding exercises and it was especially created for scrum.orgs Applying Professional Scrum for Software Development course (www.scrum.org/apssd). The code in this repository is unfinished by design.

# Getting started

To edit and debug this project, you can use [Visual Studio Code](https://code.visualstudio.com/) or any other suitable editor.
You might want to install these extensions to better support this project in VSCode:
* Mocha Test Explorer https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter
* Cucumber (Gherkin) Full Support https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete

## Run locally

Install packages

```bash
npm install
```

Run battleship

```bash
npm start
```

Or alternatively:
```bash
node index.js
```

## Execute tests

Execute all tests
```bash
npm test
```

Execute Mocha tests only
```bash
mocha './**/*Tests.js'
```

Execute Cucumber-js tests only
```bash
./node_modules/.bin/cucumber-js .\GameController_ATDD
```

## Docker

To run and test the project in a container, use these steps:

```bash
docker run -it -v ${PWD}:/battleship -w /battleship node bash
npm install
npm test
npm start
```
