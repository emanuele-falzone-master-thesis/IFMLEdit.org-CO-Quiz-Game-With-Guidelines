/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-card-explanation']) {
            context.top.active('view-container-card-explanation');
            context.vms['view-container-card-explanation'].init({ mask: 'details-card-explanation' });
        }
        data = data || {};
        var packet = {
            'id': data['question'],
        };
        context.vms['details-card-explanation'].init({ input: packet });
    };
};
