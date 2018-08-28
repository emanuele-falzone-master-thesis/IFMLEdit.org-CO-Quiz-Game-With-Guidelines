/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'language': data['language'],
        };
        var promise = context.actions['action-save-settings']({ filters: packet });
        context.runningActionsByContainer['view-container-settings'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-settings'].splice(
                context.runningActionsByContainer['view-container-settings'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
