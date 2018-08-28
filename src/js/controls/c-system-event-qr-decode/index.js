/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery');

function ViewModel(params) {
    var self = this;

    QRScanner.prepare(function (err, status) {
        if (err) {
            Materialize.toast('Access to camera denied', 2000);
            return;
        }

        QRScanner.show(function (status) {
            QRScanner.scan(function (err, contents) {
                QRScanner.destroy();
                if (err) {
                    Materialize.toast('Error scanning Card', 2000);
                    return;
                }
                self.trigger();
            });
        });
    });

    self.context = params.context;

    self.trigger = params.trigger;
   
    //self.trigger();
}

ViewModel.prototype.dispose = function () {
    // TODO: Teardown everything you setup to listen for the event
    /*
    example [continue]:
    clearInterval(this.timer);
    */
}

ViewModel.prototype.id = 'system-event-qr-decode';

exports.register = function () {
    ko.components.register('c-system-event-qr-decode', {
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
