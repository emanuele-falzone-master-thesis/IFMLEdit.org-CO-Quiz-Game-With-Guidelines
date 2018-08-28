/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    repositories = require('./repositories'),
    controls = require('./controls'),
    navigations = require('./navigations'),
    actions = require('./actions'),
    Promise = require('bluebird'),
    resourceBundle = require('./i18'),
    i18nextko = require('i18next-ko');

Promise.config({ cancellation: true });

controls.register();
// TODO: register any custom control

function ApplicationViewModel() {
    // TODO: initialize global state
    var repos = repositories.createRepositories({});
    this.context = {
        repositories: repos,
        navigations: navigations.createNavigations({}),
        actions: actions.createActions({ repositories: repos }),
        vms: {},
        runningActionsByContainer: {}
    };
}

ko.bindingHandlers.clickDelay = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        function delayed() {
            return function () {
                var self = this,
                    args = arguments;

                if (this.correctness === true) {
                    $(element).addClass("correct");
                } else {
                    $(element).addClass("wrong");
                }

                setTimeout(function () {
                    valueAccessor().apply(self, arguments);
                }, 1000);
            };
        }
        ko.bindingHandlers.click.init.call(this, element, delayed, allBindings, viewModel, bindingContext);
    }
};

if (localStorage.getItem("question.level") === null) {
    localStorage.setItem("question.level", "1");
}

if (localStorage.getItem("question.count") === null) {
    localStorage.setItem("question.count", "0");
}

if (localStorage.getItem("settings.language") === null) {
    var lng = (navigator.language || "en").substring(0, 2);
    if (["it","en"].indexOf(lng) > -1) {
        localStorage.setItem("settings.language", lng);
    } else {
        localStorage.setItem("settings.language", "en");
    }
}

i18nextko.init(resourceBundle, localStorage.getItem("settings.language"), ko);

var application = new ApplicationViewModel();

ko.applyBindings(application);

application.context.top.init();
