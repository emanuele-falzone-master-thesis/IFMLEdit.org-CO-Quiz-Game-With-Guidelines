/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.db = Promise.promisifyAll(new DataStore({
        filename: 'questions',
        autoload: true
    }))
}

Repository.prototype.findById = function (id) {
    return this.db.findOneAsync({ id: id });
};

Repository.prototype.find = function (fields, project) {
    return this.db.findAsync(fields, project);
};

Repository.prototype.insert = function (fields) {
    var self = this;
    return this.db.removeAsync({ id: 'online' })
        .then(function () {
            return self.db.insert(fields);
        });
};

Repository.prototype.random = function () {
    var id,
        self = this,
        language = 'en',
        filter = {
            language: language,
            id: { $ne: 'online' },
            done: { $ne: true }
        };
    return self.db.countAsync(filter)
        .then(function (count) {
            return count === 0 && self.db.removeAsync({}, { multi: true })
                .then(function () {
                    return self.db.insertAsync(require('./default'));
                });
        }).then(function () {
            return self.db.findAsync(filter)
        }).then(function (results) {
            id = results[0].id;
            return self.db.updateAsync({ id: id }, { $set: { done: true } })
        }).then(function () {
            return { id: id };
        });
};

exports.createRepository = Repository;
