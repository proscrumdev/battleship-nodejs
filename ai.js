const { Worker, isMainThread } = require('worker_threads');
const readline = require('readline-sync');

let telemetryWorker = new Worker("./TelemetryClient/telemetryClient2.js");
telemetryWorker.postMessage({eventName: 'Application started', properties:  {Technology: 'Node.js5'}});

var name = readline.question("What is your name? ");
telemetryWorker.postMessage({eventName: 'Name entered', properties:  {Name: name}});

var age = readline.question("What is your age? ");
telemetryWorker.postMessage({eventName: 'Age entered', properties:  {Age: age}});

//client.trackEvent({name: "name entered", properties: {name: name}});
//client.flush({callback: this.askAge});

// class questions {
//     constructor () {
//         this.askAge = this.askAge.bind(this)
//     }

//     askAge() {
//         var age = readline.question("What is your age? ");
//         client.trackEvent({name: "age entered", properties: {age: age}});    
//     }
    
//     askName() {
//         var name = readline.question("What is your name? ");
//         client.trackEvent({name: "name entered", properties: {name: name}});
//         client.flush({callback: this.askAge});
//     }
   
// }

// let q = new questions()

// appInsights.setup(connectionString).setAutoCollectConsole(true).start(); 
// let client = appInsights.defaultClient;
// client.trackEvent({name: "my custom event", properties: {myProp: "custom property value 2"}});

// client.flush({callback: q.askName()});









// const readline = require('readline-sync');
// let appInsights = require("applicationinsights");
// let connectionString = 'InstrumentationKey=c764f176-19a5-4949-825d-9f30db2f14e8;IngestionEndpoint=https://germanywestcentral-1.in.applicationinsights.azure.com';

// class questions {
//     constructor () {
//         this.askAge = this.askAge.bind(this)
//     }

//     askAge() {
//         var age = readline.question("What is your age? ");
//         client.trackEvent({name: "age entered", properties: {age: age}});    
//     }
    
//     askName() {
//         var name = readline.question("What is your name? ");
//         client.trackEvent({name: "name entered", properties: {name: name}});
//         client.flush({callback: this.askAge});
//     }
   
// }

// let q = new questions()

// appInsights.setup(connectionString).setAutoCollectConsole(true).start(); 
// let client = appInsights.defaultClient;
// client.trackEvent({name: "my custom event", properties: {myProp: "custom property value 2"}});

// client.flush({callback: q.askName()});
