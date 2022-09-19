import $ from 'jquery'
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
        //console.log(index);
        index = index == -1 ? self.answers.findIndex((el, i)=> el != undefined && el.answered == false) : index
        console.log(index, self.answers.find((el, i)=> el != undefined && el.answered == false));
        return index;
    }
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

    self.setQuestion = function(index){
        if(index !== undefined && typeof index == "number") self.questionNumber(index);
        let answered = self.answers[index]
        self.currentQuestion( answered != undefined ? answered : new vmCurrentQuestion(self.questions[self.questionNumber()]));
    };

    self.checkAnswers = function(){
        self.answers[self.questionNumber()] = self.currentQuestion();
        if(self.currentQuestion().checkAnswers() == 0){
            self.currentQuestion().answered = true;
            if(self.questions.length != self.answers.length || self.unfinishedAnswers() >= 0){
                new vmModal({
                    title: "Correct!",
                    message: "Click next to continue.",
                    buttons: [{ text: "Next", callback: self.next}]
                });
            }else{
                new vmModal({
                    title: "You Win!",
                    message: self.answers.length + " out of " + self.questions.length +" answered correctly! Wanna try again?",
                    buttons: [
                        { text: "Yes", callback: () => window.location.reload() }, 
                        {text: "No", callback: function(){ location.href="https://www.youtube.com/watch?v=KxGRhd_iWuE"; }
                    }]
                });
            }
        }
    };

    self.next = function(){
        let next = self.answers.length > 0 ? self.unfinishedAnswers() : -1;
        self.questionNumber(next >= 0 && next <= self.questions.length ? next : self.questionNumber()+1 );
        self.setQuestion();
    }

    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     * init                                              |||||||
     */////////////////////////////////////////////////////////
    self.init = function(){
        self.getQuestions().then(function(){
            self.setQuestion();
            ko.applyBindings(self);
            loader.end()
        })
    }();
    return self;
};