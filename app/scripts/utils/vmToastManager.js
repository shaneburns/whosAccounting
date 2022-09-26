import { ajax } from "jquery"
import ko from "knockout"


export function vmToast(settings){
    const self = this;
    self.id = null;
    self.parent = null;
    self.duration = settings.duration ?? 5000;
    self.dismissable = settings.dismissable ?? true;
    self.message = settings.message ?? "This is a message in a toast.";
    self.buttons = settings.buttons ?? [];
    self.timeout = null;
    /**
     * Functions
     *////////////////////////////////////////////////////////////////
    self.setTimeout = function(){
        self.timeout = self.duration < Infinity ? setTimeout(self.destroy, self.duration) : null;
    }
    self.onHover = function(){
        self.timeout && clearTimeout(self.timeout);
        self.timeout = null;
    }
    self.resolve = function(button){
        self.destroy()
        return button.callback && typeof button.callback === "function" ? button.callback() : 'toast destroyed'
    }

    self.destroy = function(){
        self.parent.removeToast(self)
    }

    self.init = function(){
        // not really needed
    }()
    return self
}

export default function vmToastManager(settings){
    const self = this
    self.toasts = ko.observableArray()
    /**
     * Functions
     *////////////////////////////////////////////////////////////////
    self.addToast = function(toast){
        toast.parent = self
        self.toasts.unshift(toast)
        toast.setTimeout()
        return true
    }
    self.removeToast = function(toast){
        self.toasts.remove(toast)
    }

    self.getToastMarkUp = function(){
        // loader.start('get modal markup')
        return ajax({
            type: "get",
            url: "/utils/toasts",
            success: function (response) {
                if(response.startsWith('<div id="toasts')){
                    let div = document.createElement('div')
                    div.innerHTML = response
                    self.id = "toasts"
                    while (div.children.length > 0) {
                        document.body.appendChild(div.children[0])
                    }
                    // loader.end('get modal markup')
                }
            },
            error: function(error){
                console.error('Toast Error: ', error);
            }
        });
    }

    self.init = function(){
        return self.getToastMarkUp().then(function(){
            ko.applyBindings(self, document.getElementById(self.id))
        })
    }()
    return self
}