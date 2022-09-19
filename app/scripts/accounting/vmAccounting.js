import $, { ajax } from 'jquery'
import ko from 'knockout'
import 'knockout-mapping'
import vmCurrentQuestion from './vmCurrentQuestion.js'
import vmModal from '../utils/vmModal.js'

export default function vmAccounting(settings){
    const self = this;
    /**
     * members
     */////////////////////////////////////////////////////////////
    self.questionSource = settings.url;
    self.questions = [];
    self.answers = [];
    /**
     * observables
     */////////////////////////////////////////////////////////////
    self.questionNumber = ko.observable(0);
    self.currentQuestion = ko.observable(new vmCurrentQuestion());
    self.errors = ko.observableArray([]);


    self.unfinishedAnswers = function(){
        let index = self.answers.findIndex(Object.is.bind(null, undefined));
        index = index == -1 ? self.answers.findIndex((el, i)=> el != undefined && el.answered == false) : index
        return index;
    }
    self.answersJSON = ko.pureComputed(function() { 
        return JSON.stringify(self.answers.map(function(answer){
            return {title: answer.title, description: answer.description, cashEntries: ko.mapping.toJS(answer.cashEntries), accrualEntries: ko.mapping.toJS(answer.accrualEntries)} 
        }))
    })
    /**
     * methods
     */////////////////////////////////////////////////////////////
    self.getQuestions = function(){
        loader.start('getQuestions');
        return $.ajax({
            type: "get",
            url: self.questionSource,
            dataType: "json",
            success: function(response){
                self.questions = response;
                loader.end('getQuestions');
            }
        });
    };

    self.sendAnswers = function(){
        loader.start('sendAnswers');
        return $.ajax({
            type: "post",
            url: "/home/putResults",
            data: {results: self.answersJSON()},
            success: function (response) {
                loader.end('sendAnswers');
            },
            error: function(error){
                loader.end('sendAnswers');
            }
        });
    }

    self.setQuestion = function(index){
        if(index !== undefined && typeof index == "number") self.questionNumber(index);
        let answered = self.answers[index]
        self.currentQuestion( answered != undefined ? answered : new vmCurrentQuestion(self.questions[self.questionNumber()]));
        window.scrollTo(0, 0);
    };

    self.checkAnswers = function(){
        if(self.answers[self.questionNumber()] == undefined) self.answers[self.questionNumber()] = self.currentQuestion();
        if(self.currentQuestion().checkAnswers() == 0){
            self.currentQuestion().answered = true;
            if(self.questions.length != self.answers.length || self.unfinishedAnswers() >= 0){
                new vmModal({
                    title: "Correct!",
                    message: "Click next to continue.",
                    buttons: [{ text: "Next", callback: self.next}]
                });
            }else{
                self.sendAnswers().then(function(){
                    new vmModal({
                        title: "You Win!",
                        message: self.answers.length + " out of " + self.questions.length +" answered correctly! Wanna try again?",
                        buttons: [
                            { text: "Yes", callback: () => window.location.reload() }, 
                            {text: "No", callback: function(){ location.href="https://www.youtube.com/watch?v=KxGRhd_iWuE"; }
                        }]
                    });
                });
            }
        }
    };

    self.next = function(){
        let next = self.answers.length > 0 ? self.unfinishedAnswers() : -1;
        self.questionNumber(next >= 0 && next <= self.questions.length ? next : self.questionNumber() < self.questions.length ? self.questionNumber()+1 : 0);
        self.setQuestion(self.questionNumber());
    }

    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     * init                                              |||||||
     */////////////////////////////////////////////////////////
    self.init = function(){
        self.getQuestions().then(function(){
            self.setQuestion();
            ko.applyBindings(self);
        });
    }();
    return self;
};