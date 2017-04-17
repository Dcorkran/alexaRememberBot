'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME" : "Remember Bot",
            "GET_NAME_MESSAGE" : "Here's what I remember: ",
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetName');
    },
    'GetNameIntent': function () {
        this.emit('GetName');
    },
    'GetName': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        // var factArr = this.t('FACTS');
        // var factIndex = Math.floor(Math.random() * factArr.length);
        // var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_NAME_MESSAGE") + 'name test';
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), 'test success')
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
