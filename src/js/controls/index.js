/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

exports.register = function () {
    require('./main-application').register();
    // ==============
    require('./c-view-container-camera').register();
    // ==============
    require('./c-view-container-card').register();
    // ==============
    require('./c-view-container-card-result').register();
    // ==============
    require('./c-view-container-home').register();
    // ==============
    require('./c-list-card-answers').register();
    // ==============
    require('./c-details-card-question').register();
    // ==============
    require('./c-details-card-result').register();
    // ==============
    require('./c-system-event-qr-decode').register();
    // ==============
    require('./c-system-event-back-0').register();
    // ==============
    require('./c-system-event-back-1').register();
    // ==============
    require('./c-system-event-back-2').register();
    // ==============
};
