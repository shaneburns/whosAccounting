import ko from 'knockout'
import vmAnswer from './vmAnswer.js'

export default function vmCurrentQuestion(settings){
    const self = this;

    /**
     * members
     */
    self.title = null;
    self.description = null;
    self.correct_answers = null;
    self.cashEntries = [];
    self.accrualEntries = [];
    self.answered = false;

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
        return noMatch;
    }

    self.checkAnswers = function(){
        return self.matchAnswers(self.cashEntries, "cash") + self.matchAnswers(self.accrualEntries, "accrual");
    }

    self.set = function(q){
        self.title = q.title;
        self.description = q.description;
        self.correct_answers = q.correct_answers;
        self.cashEntries = [];
        self.accrualEntries = [];
        for(let i = 0; i <= self.correct_answers.length - 1; i++){
            for(let j = 0; j <= self.correct_answers[i].entries.length - 1; j++){
                if(self.correct_answers[i].type == 'cash'){
                    self.cashEntries.push(new vmAnswer());
                }
                if(self.correct_answers[i].type == 'accrual'){
                    self.accrualEntries.push(new vmAnswer());
                }
            }
        }
    }
    self.init = function(){
        if(settings != undefined || settings != null) self.set(settings);
    }()
    return self;
}