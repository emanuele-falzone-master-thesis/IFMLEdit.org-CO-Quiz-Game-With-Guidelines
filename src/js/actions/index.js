/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        // ==============
        'action-random-question-1': require('./action-random-question-1').createAction(options),
        // ==============
        'action-random-question-2': require('./action-random-question-2').createAction(options),
        // ==============
        'action-random-question-3': require('./action-random-question-3').createAction(options),
        // ==============
        'action-read-card': require('./action-read-card').createAction(options),
        // ==============
        'action-update-level-1': require('./action-update-level-1').createAction(options),
        // ==============
        'action-update-level-2': require('./action-update-level-2').createAction(options),
        // ==============
    };
};
