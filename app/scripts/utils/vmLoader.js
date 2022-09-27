import $ from 'jquery'
import ko from 'knockout'
export default function vmLoader(settings){
    const self = this;
    self.id = settings && settings.id ? settings.id : null;
    self.el = settings && settings.el ? settings.el : self.id ? document.getElementById(self.id) : null;
    self.hidden = ko.observable(true);
    self.onInit = settings && settings.onInit ? settings.onInit : null;

    self.processes = ko.observableArray();

    self.isRunning = function(processName){
        return (processName && self.processes().indexOf(processName) !== -1) || self.processes().length;
    };
    self.end = function(processName){
        self.processes.remove(processName);
    };
    self.start = function(processName){
        let i = self.processes().indexOf(processName);
        if(i == -1) self.processes.push(processName);
    };
    self.getLoader = function(){
        return $.ajax({
            url: "/utils/loader",
            success: (response) => {
                if(response.startsWith('<div id="loaderProtector')){
                    let div = document.createElement('div');
                    div.innerHTML = response;
                    while (div.children.length > 0) {
                        document.body.appendChild(div.children[0]);
                    }
                    self.el = document.getElementById(self.id);
                }
            }, 
            error: function(error){
                console.error(error);
            }
        });
    };
    self.init = function(){
        if(self.el === null) return self.getLoader().then(self.init);
        if(self.onInit) self.onInit();
        ko.applyBindings(self, self.el);
    }();
    return self;
};