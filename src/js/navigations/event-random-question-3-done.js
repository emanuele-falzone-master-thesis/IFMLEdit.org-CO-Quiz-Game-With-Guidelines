/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-question']) {
            context.top.active('view-container-question');
            context.vms['view-container-question'].init({ mask: 'details-question' });
        }
        data = data || {};
        var packet = {
            'id': data['question'],
        };
        context.vms['details-question'].init({ input: packet });
    };
};
