import ko from 'knockout';

export default function vmAnswer(settings = {}, parent){
    const self = this;

    self.parent = parent ?? null;
    // Should be made into a db entry and retrieved asynchronously
    self.type = settings.type ?? null;
    self.typeList = ['revenue','deferred','cash','receivable','contra','system-credit'];

    self.when = ko.observable(settings.when ?? undefined);
    self.selectedType = ko.observable(settings.selectedType ?? undefined);
    self.dr = ko.observable(settings.dr ? settings.dr : settings.Dr ? settings.Dr : undefined);
    self.cr = ko.observable(settings.cr ? settings.cr : settings.Cr ? settings.Cr :  undefined);
    self.match = ko.observable(settings.match ?? undefined);
    self.dateFormats = {
        ios: /^\w{3}\ \d{2}(\,\ )\d{4}$/,
        android: /^\d{2}([./-])\d{2}\1\d{4}$/,
        monthDay: /^([0-1]\d{1}|\d{1})([./-])\d{2}$/
    };

    self.errors = ko.observableArray(settings.errors ?? []);

    self.whenFormatted = ko.computed(function(){
        if(!self.when()) return;
        return new Date(!!self.when().match(self.dateFormats.ios) ? self.when() : self.when().replaceAll('-','/')).toLocaleDateString('en-US', {month: 'numeric', day: '2-digit'});
    });

    self.validate = function(){
        // Verify all appriate fields are provided
        self.errors([]);
        if(self.when() !== undefined && 
            self.selectedType() !== undefined && 
            ((self.dr() !== undefined && self.dr() !== "" && (self.cr() === undefined || self.cr() === "")) || 
            (self.cr() !== undefined && self.cr() !== "" && (self.dr() === undefined || self.dr() === "")))){
                if(!self.whenFormatted() || !self.whenFormatted().match(self.dateFormats.monthDay)) self.errors.push('Invalid date', self.whenFormatted())
                if(!self.typeList.find(el => el === self.selectedType())) self.errors.push('Inalid type chosen');
                if((self.dr() && !Number.isInteger(parseInt(self.dr()))) || (self.cr() && !Number.isInteger(parseInt(self.cr())))) self.errors.push('Ammount entered is invalid')
        }else{self.errors.push('Fill all apropriate fields.');}
        return self.errors().length == 0 ? true : false
    };

    self.toFormatted = function(){
        return {
            when: self.when(), 
            whenFormatted: self.whenFormatted(), 
            selectedType: self.selectedType(),
            match: self.match(), 
            dr: self.dr(), 
            cr: self.cr(),
            errors: self.errors(),
            type: self.type
        };
    }
    self.findMatch = () => self.parent && self.parent.findMatch(self)
    self.when.subscribe(self.findMatch)
    self.selectedType.subscribe(self.findMatch)
    self.dr.subscribe(self.findMatch)
    self.cr.subscribe(self.findMatch)
};