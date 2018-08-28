/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    var level = localStorage.getItem("question.level"),
        count = parseInt(localStorage.getItem("question.count"));

    var count_back = -2;
    var count_up_1_2 = 10;
    var count_up_2_3 = 15;

    switch (level) {
        case "1":
            if (parameters['correctness'] === true) {
                count++;
            } else {
                count = 0;
            }
            if (count >= count_up_1_2) {
                count = 0;
                level = "2";
                Materialize.toast('Level 2', 2000);
            }
            break;
        case "2":
            if (parameters['correctness'] === true) {
                if (count < 0) {
                    count = 0;
                }
                count++;
            } else {
                if (count > 0) {
                    count = 0;
                }
                count--;
            }

            if (count <= count_back) {
                count = 0;
                level = "1";
                Materialize.toast('Level 1', 2000);
            }
            if (count >= count_up_2_3) {
                count = 0;
                level = "3";
                Materialize.toast('Level 3', 2000);
            }
            break;
        case "3":
            if (parameters['correctness'] === true) {
                count = 0;
            } else {
                count--;
            }
            if (count <= count_back) {
                count = 0;
                level = "2";
                Materialize.toast('Level 2', 2000);
            }
            break;
    }

    localStorage.setItem("question.level", level);
    localStorage.setItem("question.count", count);

    solve({
        event: 'event-update-level-1-done', // done
        data: {
            'id': parameters['id'],
        }
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
