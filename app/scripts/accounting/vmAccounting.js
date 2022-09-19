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
    /**
     * observables
     */////////////////////////////////////////////////////////////
    self.questionNumber = ko.observable(0);
    self.questions = ko.observableArray();
    self.currentQuestion = ko.observable(new vmCurrentQuestion());
    self.answers = ko.observable();
    self.errors = ko.observableArray([]);

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
                self.questions(response);
                loader.end('getQuestions');
            }
        });
    };

    self.setQuestion = function(index){
        if(index !== undefined && typeof index == "number") self.questionNumber(index);
        self.currentQuestion(new vmCurrentQuestion(self.questions()[self.questionNumber()]));
    };

    self.checkAnswers = function(){
        if(self.currentQuestion().checkAnswers() == 0){
            if(self.questions().length -1 > self.questionNumber()){
                new vmModal({
                    title: "Correct!",
                    message: "Click next to continue.",
                    buttons: [{ text: "Next", callback: self.next}]
                });
            }else{
                new vmModal({
                    title: "You Win!",
                    message: "That's it for now? Wanna try again?",
                    buttons: [{ text: "Yes", callback: () => window.location.reload() }, {text: "No", callback: function(){location.href="https://www.youtube.com/watch?v=KxGRhd_iWuE";}}]
                });
            }
        }
    };

    self.next = function(){
        self.questionNumber(self.questionNumber()+1);
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