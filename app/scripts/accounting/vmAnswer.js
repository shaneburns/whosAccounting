import ko from 'knockout';

export default function vmAnswer(settings = {}){
    const self = this;

    // Should be made into a db entry and retrieved asynchronously
    self.typeList = ['revenue','deferred','cash','receivable','contra','system-credit'];

    self.when = ko.observable(settings.when ?? undefined);
    self.selectedType = ko.observable(settings.type ?? undefined);
    self.dr = ko.observable(settings.Dr ?? undefined);
    self.cr = ko.observable(settings.Cr ?? undefined);
    self.match = ko.observable();

    self.errors = ko.observableArray([]);

    self.whenFormatted = ko.pureComputed(function(){
        return new Date(self.when().replace('-','/')).toLocaleDateString('en-US', {month: 'numeric', day: '2-digit'});
    });

    self.validate = function(){
        // Verify all appriate fields are provided
        self.errors([]);
        if(self.when() !== undefined && 
            self.selectedType() !== undefined && 
            ((self.dr() !== undefined && self.dr() !== "" && (self.cr() === undefined || self.cr() === "")) || 
            (self.cr() !== undefined && self.cr() !== "" && (self.dr() === undefined || self.dr() === "")))){
                // Stricter validation can be done to ensure dates are correct, etc.
        }else{self.errors.push('Fill all apropriate fields.');}
        return self.errors().length == 0 ? true : false
    }
};