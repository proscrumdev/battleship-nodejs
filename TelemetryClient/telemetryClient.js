const appInsights = require('applicationinsights');

class TelemetryClient {
    constructor() {
        let connectionString = 'InstrumentationKey=c764f176-19a5-4949-825d-9f30db2f14e8;IngestionEndpoint=https://germanywestcentral-1.in.applicationinsights.azure.com/';
        appInsights.setup(connectionString).start();
    }

    trackevent(eventName, properties, callback) {
        appInsights.defaultClient.trackEvent({name: eventName, properties: properties});
        appInsights.defaultClient.flush({callback: callback});
    }
}

module.exports = TelemetryClient;