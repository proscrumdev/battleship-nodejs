const { Worker, isMainThread, parentPort } = require('worker_threads');

const appInsights = require('applicationinsights');

let connectionString = 'InstrumentationKey=c764f176-19a5-4949-825d-9f30db2f14e8;IngestionEndpoint=https://germanywestcentral-1.in.applicationinsights.azure.com/';
appInsights.setup(connectionString)
    .setAutoCollectConsole(true)
    .setAutoCollectExceptions(true)
    .start();

parentPort.on('message', (message) => {
    appInsights.defaultClient.trackEvent({name: message.eventName, properties: message.properties});
    appInsights.defaultClient.flush();
});


 