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

const RESPONSE_TEST = 'Hello!!!';
const GET_NAME_MESSAGE = "Here's what I remember: ";

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetName');
        Object.assign(this.attributes, {
            nameToUpdate: ''
        });
    },
    'GetNameIntent': function () {
        this.emit('GetName');
        // Object.assign(this.attributes, {
        //     nameToUpdate: ''
        // });
    },
    'GetName': function () {
        let name = this.event.request.intent.slots.Name.value;
        console.log(this.event.request.intent.slots.Name);
        return http_calls.getName(name)
        .then((description)=>{
          if (description.data.length === 0) {
            this.emit(':tell', `I don't have any information about ${name}. You can say, remember bot, remember something about ${name}, and I will remember it for next time.`)
          } else {
            let emitDescription = description.data[0].description;
            console.log(emitDescription);
            this.emit(':tell', emitDescription)
          }
        })
        // this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), 'test success')
    },
    'UpdateNameIntent': function () {
      Object.assign(this.attributes, {
          nameToUpdate: ''
      });
        console.log('hit');
        console.log(this.event.request.intent.slots.Name.value);
        let name = this.event.request.intent.slots.Name.value;
        this.attributes.nameToUpdate = name;
        this.emit(':ask',`Okay. What would you like me to remember about ${name}? Please limit your description to one sentence.`,`Okay. What would you like me to remember about ${name}? Please limit your description to one sentence.`);
    },
    'DescriptionNameIntent': function () {
        let name = this.attributes.nameToUpdate;
        let description = this.event.request.intent.slots.DescriptionText.value;
        console.log(description);
        return http_calls.postName(name, description)
        .then((data)=>{
          this.emit(':tell',`Okay, here is what I remember about ${name}: ${description}`);
        })

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
