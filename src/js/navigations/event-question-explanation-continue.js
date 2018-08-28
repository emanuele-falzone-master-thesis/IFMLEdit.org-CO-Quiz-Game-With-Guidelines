/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['action-random-question-3']();
        context.runningActionsByContainer['view-container-question-explanation'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-question-explanation'].splice(
                context.runningActionsByContainer['view-container-question-explanation'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
