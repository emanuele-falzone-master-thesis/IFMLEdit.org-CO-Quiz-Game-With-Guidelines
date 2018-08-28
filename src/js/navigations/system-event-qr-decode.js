/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['action-read-card']();
        context.runningActionsByContainer['view-container-camera'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-camera'].splice(
                context.runningActionsByContainer['view-container-camera'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
