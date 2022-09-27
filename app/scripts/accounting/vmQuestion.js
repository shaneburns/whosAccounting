import ko from 'knockout'
import vmEntry from './vmEntry.js'

export default function vmQuestion(settings, parent){
    const self = this;

    /**
     * members
     */
    self.parent = parent ?? null;
    self.title = null;
    self.description = null;
    self.correct_answers = null;

    /**
     * observables
     */
    self.current = ko.observable(false);
    self.cashEntries = ko.observableArray([]);
    self.accrualEntries = ko.observableArray([]);
    self.answered = ko.pureComputed(()=> !(self.cashEntries().filter(e=> e.match() == undefined).length + self.accrualEntries().filter(e=> e.match() == undefined).length));
    self.answered.subscribe((v)=> v && self.parent.showModal());


    self.current.subscribe(function (v){
        if(!v) return;
        return setTimeout(()=>self.setEntryFocus(), 200)
    })

    /**
     * methods
     */
    self.findMatch = function(input, inputType){
        // Look through all provided input for input type
        let noMatch = 0;
        let singleAnswer = input instanceof vmEntry; // If singular input object
        let entries = self.correct_answers.find(el => el.type == (singleAnswer ? input.type : inputType)).entries;// get appropriate entries to check
        
        (singleAnswer ? new Array(input) : ko.isObservableArray(input) ? input() : new Array()).forEach(function(answer){
            // If they are filled out correctly...
            if(answer.validate() && answer.match() == undefined){
                // ...then find a correct answer that matches the user's
                answer.match(entries.find(el => el.when == answer.whenFormatted() && el.type == answer.selectedType() && ((el.Dr && el.Dr == answer.dr()) || (el.Cr && el.Cr == answer.cr()))));
                // If a match is found...
                if(answer.match() !== undefined){

                    let index = entries.indexOf(answer.match());
                    // ...take it out of the running so it can't be doubled matched
                    entries.splice(index, 1);
                }else{
                    noMatch++;
                    answer.errors.push("Something is off");
                }
            }
            if(answer.match() == undefined) noMatch++;
        });
        ((singleAnswer && !noMatch) || !singleAnswer) && self.setEntryFocus();
        return noMatch;
    };

    self.matchAll = function(){
        return self.findMatch(self.cashEntries, "cash") + self.findMatch(self.accrualEntries, "accrual") == 0;
    };

    self.setEntryFocus = function(position = 'center'){// Just for usability - Auto focus next appropriate input element
        let i = self.cashEntries().findIndex(e=>!e.match()),
            j = self.accrualEntries().findIndex(e=>!e.match());
        i = i >= 0 ? "ul#cash li:nth-of-type("+(i+1)+")" : undefined;
        j = j >= 0 ? "ul#accrual li:nth-of-type("+(j+1)+")" : undefined;
        let offender =  (i || j) ? document.querySelector((i ?? j) +" input:not(:valid), " + (i ?? j) + " select:not(:valid), " + (i ?? j) + " input:placeholder-shown") ?? document.querySelector((i ?? j) + " input:not([disabled])") : null
        return offender != null ? (offender.focus() || true) && offender.scrollIntoView({behavior: 'smooth', block: position }) : (i !== undefined || j !== undefined) ?  setTimeout(self.setEntryFocus, 200) : null;
    };

    self.set = function(q){
        self.current(q.current ?? false);
        self.title = q.title ?? "Unspecified";
        self.description = q.description ?? "No description";
        self.correct_answers = q.correct_answers ?? [];
        self.cashEntries(q.cashEntries ? q.cashEntries.map(e=> new vmEntry(e, self)) : []);
        self.accrualEntries(q.accrualEntries ? q.accrualEntries.map(e=> new vmEntry(e, self)) : []);

        if(self.cashEntries().length === 0 && self.accrualEntries().length === 0){
            for(let i = 0; i <= self.correct_answers.length - 1; i++){
                //let ce;
                for(let j = 0; j <= self.correct_answers[i].entries.length - 1; j++){
                    //ce = self.correct_answers[i].entries[j];
                    if(self.correct_answers[i].type == 'cash'){
                        self.cashEntries.push(new vmEntry({
                            type: 'cash'//,
                            // when: ce.when,
                            // selectedType: ce.type,
                            // dr: ce.Dr,
                            // cr: ce.Cr
                        
                        }, self));
                    }
                    if(self.correct_answers[i].type == 'accrual'){
                        self.accrualEntries.push(new vmEntry({
                            type: 'accrual'//,
                            // when: ce.when,
                            // selectedType: ce.type,
                            // dr: ce.Dr,
                            // cr: ce.Cr
                        }, self));
                    }
                }
            }
        }
    };

    self.toFormatted = function(){
        return {
            current: self.current(),
            title: self.title, 
            description: self.description, 
            answered: self.answered(), 
            cashEntries: self.cashEntries().map(e => e.toFormatted()), 
            accrualEntries: self.accrualEntries().map(e => e.toFormatted()), 
            correct_answers: self.correct_answers
        };
    };

    self.init = function(){
        if(settings != undefined || settings != null) self.set(settings);
    }()

    return self;
}