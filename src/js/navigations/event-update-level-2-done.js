/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-question-result']) {
            context.top.active('view-container-question-result');
            context.vms['view-container-question-result'].init({ mask: 'details-question-result' });
        }
        data = data || {};
        var packet = {
            'id': data['id'],
        };
        context.vms['details-question-result'].init({ input: packet });
    };
};
