/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-camera']) {
            context.top.active('view-container-camera');
        }
        context.vms['view-container-camera'].init();
    };
};
