import ko from 'knockout'
import vmEntry from './vmEntry.js'

export default function vmQuestion(settings){
    const self = this;

    /**
     * members
     */
    self.current = ko.observable(false);
    self.title = null;
    self.description = null;
    self.correct_answers = null;
    self.cashEntries = [];
    self.accrualEntries = [];
    self.answered = false;

    self.current.subscribe(function (v){
        if(!v) return;
        return setTimeout(self.setEntryFocus, 200)
    })

    /**
     * methods
     */
    self.matchAnswers = function(input, inputType){
        // Loop through user answers for cash or accrual type.
        let noMatch = 0;
        let entries = self.correct_answers.find(el => el.type == inputType).entries;
        input.forEach(function(answer){
            // If they are filled out correctly...
            if(answer.validate() && answer.match() == undefined){
                // ...then find a correct answer that matches the user's
                answer.match(entries.find(el => el.when == answer.whenFormatted() && el.type == answer.selectedType() && ((el.Dr && el.Dr == answer.dr()) || (el.Cr && el.Cr == answer.cr()))));
                // If a match is found...
                if(answer.match() !== undefined){
                    let index = entries.indexOf(answer.match());
                    // ...take it out of the running so it can't be doubled up
                    entries.splice(index, 1);
                }else{
                    noMatch++;
                    answer.errors.push("Something is off");
                }
            }
            if(answer.match() == undefined) noMatch++;
        })
        self.setEntryFocus();
        return noMatch;
    };

    self.isCorrect = function(){
        return self.matchAnswers(self.cashEntries, "cash") + self.matchAnswers(self.accrualEntries, "accrual") == 0;
    };

    self.setEntryFocus = function(){// Just for usability - Auto focus next appropriate input element
        let i = self.cashEntries.findIndex(e=>!e.match()),
            j = self.accrualEntries.findIndex(e=>!e.match());
        i = i >= 0 ? "ul#cash li:nth-of-type("+(i+1)+")" : undefined;
        j = j >= 0 ? "ul#accrual li:nth-of-type("+(j+1)+")" : undefined;
        let offender =  (i || j) ? document.querySelector((i ?? j) +" input:not(:valid), " + (i ?? j) + " select:not(:valid), " + (i ?? j) + " input:placeholder-shown") : null
        return offender != null ? offender.focus() : (i !== undefined || j !== undefined) ?  setTimeout(self.setEntryFocus, 200) : null;
    };

    self.set = function(q){
        self.current(q.current ?? false);
        self.title = q.title ?? "Unspecified";
        self.description = q.description ?? "No description";
        self.answered = q.answered ?? false;
        self.correct_answers = q.correct_answers ?? [];
        self.cashEntries = q.cashEntries ? q.cashEntries.map(e=> new vmEntry(e)) : [];
        self.accrualEntries = q.accrualEntries ? q.accrualEntries.map(e=> new vmEntry(e)) : [];

        if(self.cashEntries.length === 0 && self.accrualEntries.length === 0){
            for(let i = 0; i <= self.correct_answers.length - 1; i++){
                for(let j = 0; j <= self.correct_answers[i].entries.length - 1; j++){
                    if(self.correct_answers[i].type == 'cash'){
                        self.cashEntries.push(new vmEntry());
                    }
                    if(self.correct_answers[i].type == 'accrual'){
                        self.accrualEntries.push(new vmEntry());
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
            answered: self.answered, 
            cashEntries: self.cashEntries.map(e => e.toFormatted()), 
            accrualEntries: self.accrualEntries.map(e => e.toFormatted()), 
            correct_answers: self.correct_answers
        };
    };

    self.init = function(){
        if(settings != undefined || settings != null) self.set(settings);
    }()

    return self;
}