import { ajax } from "jquery"
import ko from "knockout"

export default function vmModal(settings){
    const self = this;
    self.id = null;
    self.title = settings.title ?? "Modal";
    self.message = settings.message ?? null;
    self.buttons = settings.buttons ?? [{text: 'Click Me'}];
    self.defaultResolve = settings.defaultAction ?? self.buttons[0];
    self.onInit = settings.onInit ?? false;
    self.partialView = settings.partialView ?? null;
    self.parent = settings.parent ?? null;
    self.dismissable = settings.dismissable ?? true;
    self.clickOff = settings.clickOff ?? null;
    /**
     * Functions
     *////////////////////////////////////////////////////////////////
    self.resolve = function(button){
        if(button.defaultResolve && button.defaultResolve.callback) button = self.defaultResolve;
        self.destroy();
        return button.callback && typeof button.callback === "function" ? button.callback() : 'modal destroyed';
    };

    self.destroy = function(){
        document.getElementById(self.id).remove();
    };

    self.getModalMarkUp = function(){
        loader.start('modalGet');
        return ajax({
            type: "get",
            url: "/utils/modal",
            success: function (response) {
                if(response.startsWith('<div id="modal')){
                    let div = document.createElement('div');
                    div.innerHTML = response;
                    self.id = div.firstChild.id;
                    while (div.children.length > 0) {
                        document.body.appendChild(div.children[0]);
                        loader.end('modalGet');
                    }
                }
            },
            error: function(error){
                console.error('Modal Error: ', error);
            }
        });
    };
    self.getPartial = function(){
        loader.start('partialGet');
        return ajax({
            type: "get",
            url: self.partialView,
            success: function (response) {
                if(response.startsWith('<')){
                    let div = document.createElement('div');
                    div.innerHTML = response;
                    while (div.children.length > 0) {
                        document.querySelector("#"+self.id+" .modal-card .modal-card-body .content").appendChild(div.children[0]);
                    }
                    loader.end('partialGet');
                }
            },
            error: function(error){
                console.error('Partial Error: ', error);
            }
        });
    };

    self.bindModal = function(){
        if(self.onInit) self.onInit()
        ko.applyBindings(self, document.getElementById(self.id));
        document.querySelector("#"+self.id+" button.is-success").focus();
    }

    self.init = function(){
        if(self.dismissable && self.clickOff == null) self.clickOff = self.resolve;
        return self.getModalMarkUp().then(function(){
            self.partialView && self.getPartial().then(function(){
                self.bindModal()
            }) || self.bindModal();
        });
    }();
}