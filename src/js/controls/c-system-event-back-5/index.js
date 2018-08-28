/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;

    self.listener = function () {
        self.trigger();
    }

    self.context = params.context;

    self.trigger = params.trigger;

    document.addEventListener("backbutton", self.listener, false);
}

ViewModel.prototype.dispose = function() {
    document.removeEventListener("backbutton", this.listener, false);
}

ViewModel.prototype.id = 'system-event-back-5';

exports.register = function () {
    ko.components.register('c-system-event-back-5', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    vm.dispose();
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
