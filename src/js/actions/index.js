/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        // ==============
        'action-read-card': require('./action-read-card').createAction(options),
        // ==============
        'action-update-level-1': require('./action-update-level-1').createAction(options),
        // ==============
    };
};
