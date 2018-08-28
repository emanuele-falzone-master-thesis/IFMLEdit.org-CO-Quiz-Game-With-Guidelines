/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.db = Promise.promisifyAll(new DataStore({
        filename: 'answers',
        inMemoryOnly: true
    }));

    this.db.insert(require('./default'));
}

Repository.prototype.findById = function (id) {
    return this.db.findOneAsync({ id: id });
};

Repository.prototype.find = function (fields, project) {
    return this.db.findAsync(fields, project);
};

Repository.prototype.insert = function (fields) {
    var self = this;
    return this.db.removeAsync({ question: 'online' }, { multi: true })
        .then(function () {
            return self.db.insert(fields);
        });
};

exports.createRepository = Repository;
