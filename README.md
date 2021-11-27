
[![Build status](https://dev.azure.com/APS-SD-Stewards/APS-SD/_apis/build/status/proscrumdev.battleship-cpp-CI)](https://dev.azure.com/APS-SD-Stewards/APS-SD/_build/latest?definitionId=22)

# Battleship NodeJs

A simple game of Battleship, written in NodeJs.  

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
node index.js
```

## Execute tests

Execute all tests
```bash
npm test
```

Execute Mocha tests
```bash
mocha './**/*Tests.js'
```

Execute Cucumber-js tests
```bash
./node_modules/.bin/cucumber-js .\GameController_ATDD
```

## Docker

To run and test the project in a container, use these steps:

```bash
docker run -it -v ${PWD}:/battleship -w /battleship node bash
npm install
npm test
node index.js
```
