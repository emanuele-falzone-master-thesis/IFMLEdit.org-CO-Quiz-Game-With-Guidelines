/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    return {
        // ==============
        'answers': require('./answers').createRepository(options),
        // ==============
        'questions': require('./questions').createRepository(options),
        // ==============
    };
};
