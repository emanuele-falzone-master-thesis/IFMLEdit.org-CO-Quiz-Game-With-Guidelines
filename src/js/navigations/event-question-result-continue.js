/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['action-random-question-2']();
        context.runningActionsByContainer['view-container-question-result'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-question-result'].splice(
                context.runningActionsByContainer['view-container-question-result'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
