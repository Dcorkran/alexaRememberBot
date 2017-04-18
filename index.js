'use strict';
var Alexa = require('alexa-sdk');
var http_calls = require('./httpCalls');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var RESPONSE_TEST = 'Hello!!!';
var GET_NAME_MESSAGE = "Here's what I remember: ";

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetName');
    },
    'GetNameIntent': function () {
        this.emit('GetName');
    },
    'GetName': function () {
        let name = this.event.request.intent.slots.Name.value;
        console.log(this.event.request.intent.slots.Name);
        return http_calls.getName(name)
        .then((description)=>{
          let emitDescription = description.data[0].description;
          console.log(emitDescription);
          this.emit(':tell', emitDescription)
        })
        // this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), 'test success')
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
