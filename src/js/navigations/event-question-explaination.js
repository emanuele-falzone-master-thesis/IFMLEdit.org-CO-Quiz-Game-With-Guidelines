/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-question-explanation']) {
            context.top.active('view-container-question-explanation');
            context.vms['view-container-question-explanation'].init({ mask: 'details-question-explanation' });
        }
        data = data || {};
        var packet = {
            'id': data['question'],
        };
        context.vms['details-question-explanation'].init({ input: packet });
    };
};
