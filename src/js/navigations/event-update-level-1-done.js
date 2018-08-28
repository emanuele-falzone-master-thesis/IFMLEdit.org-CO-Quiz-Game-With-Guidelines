/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-card-result']) {
            context.top.active('view-container-card-result');
            context.vms['view-container-card-result'].init({ mask: 'details-card-result' });
        }
        data = data || {};
        var packet = {
            'id': data['id'],
        };
        context.vms['details-card-result'].init({ input: packet });
    };
};
