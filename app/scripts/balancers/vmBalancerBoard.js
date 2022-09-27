import ko from 'knockout';

import vmBalancer from './vmBalancer';

export default function vmBalancerBoard(settings){
    const self = this;

    // observables
    self.balancers = ko.observableArray([]);
    self.loaded = ko.observable(false);
    self.highlight = ko.observable();
    
    // Async
    self.getList = function(){
        loader.start('getting list')
        return fetch('/balancers/allInitials',{headers: {'Content-Type': 'application/json'}})
            .then(function(response){
                return response.json();
            })
    }

    self.getGetVars = function(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        self.highlight(JSON.parse(urlParams.get('dateTime')));
    }
    
    self.init = function(){
        self.getList().then((data)=> {
            self.getGetVars();
            self.balancers(((typeof data == "object" && data.length > 0) ? data.map((e)=> new vmBalancer(e)) : []).reverse());
            loader.end('getting list');

            let offset = self.balancers().length*100 + 270;
            if(self.highlight() && self.highlight().length > 0) offset = Math.min(Math.max(offset, 0), 2800);
            ko.applyBindings(self)
            
            setTimeout(()=> self.loaded(true), offset);
            if(self.highlight()) setTimeout(()=> document.querySelector('.highlight').scrollIntoView({behavior: 'smooth', block: 'center'}), offset / 2)
            
        })
    }();
    return self;
}
