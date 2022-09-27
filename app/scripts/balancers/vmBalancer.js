import ko from 'knockout'

export default function vmBalancer(settings){
    const self = this;

    // Observables
    self.initials = ko.observable(settings.initials ?? 'aaa');
    self.createdAt = ko.observable(settings.createdAt ?? new Date());
    self.convertedDate = ko.pureComputed(function(){
        const converted = new Date(self.createdAt());
        return converted.toLocaleDateString('en-US', {month: 'numeric', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false});
    });
    return self;
}