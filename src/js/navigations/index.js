/*jslint node: true, nomen: true */
"use strict";

exports.createNavigations = function (options) {
    return {
        // ==============
        'event-read-card-done': require('./event-read-card-done').createNavigation(options),
        // ==============
        'event-update-level-1-done': require('./event-update-level-1-done').createNavigation(options),
        // ==============
        'system-event-qr-decode': require('./system-event-qr-decode').createNavigation(options),
        // ==============
        'system-event-back-0': require('./system-event-back-0').createNavigation(options),
        // ==============
        'system-event-back-1': require('./system-event-back-1').createNavigation(options),
        // ==============
        'system-event-back-2': require('./system-event-back-2').createNavigation(options),
        // ==============
        'event-home-decode-a-card': require('./event-home-decode-a-card').createNavigation(options),
        // ==============
        'selected-card-answer': require('./selected-card-answer').createNavigation(options),
        // ==============
    };
};
