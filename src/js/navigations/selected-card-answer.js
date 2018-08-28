/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id': data['id'],
            'correctness': data['correctness'],
        };
        var promise = context.actions['action-update-level-1']({ filters: packet });
        context.runningActionsByContainer['view-container-card'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-card'].splice(
                context.runningActionsByContainer['view-container-card'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
