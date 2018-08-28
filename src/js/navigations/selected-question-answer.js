/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id': data['id'],
            'correctness': data['correctness'],
        };
        var promise = context.actions['action-update-level-2']({ filters: packet });
        context.runningActionsByContainer['view-container-question'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-question'].splice(
                context.runningActionsByContainer['view-container-question'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
