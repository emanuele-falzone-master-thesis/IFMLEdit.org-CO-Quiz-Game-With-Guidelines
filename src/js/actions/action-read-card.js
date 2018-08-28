/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {
    this.collection = {
        questions: options.repositories.questions,
        answers: options.repositories.answers
    };
}

Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    var self = this;

    $.ajax({
        url: 'http://funergy.ifmledit.org/funergy/Services/ffv/getNextQuestion',
        data: {
            language: 'en',
            level: localStorage.getItem("question.level"),
            oid: localStorage.getItem("question.oid")

        },
        timeout: 1500
    }).done(function (obj) {
        localStorage.setItem("question.oid", obj.oid);
        self.collection.questions.insert({
            id: 'online',
            content: obj.content,
            correct: obj.correct,
            explanation: obj.explaination,
            language: 'en',
            level: localStorage.getItem("question.level")
        }).then(function () {
            return self.collection.answers.insert([{
                id: 'online-wrong',
                content: obj.wrong,
                correctness: false,
                question: 'online'
            }, {
                id: 'online-correct',
                content: obj.correct,
                correctness: true,
                question: 'online'
            }]);
        }).then(function () {
            solve({
                event: 'event-read-card-done',
                data: {
                    'question': 'online'
                }
            });
        });
    }).fail(function (xhr) {
        self.collection.questions.random().then(function (result) {
            solve({
                event: 'event-read-card-done',
                data: {
                    'question': String(result.id)
                }
            });
        });
    });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
