import $, { ajax } from 'jquery'
import ko from 'knockout'
import 'knockout-mapping'
import Cookies from 'js-cookie'
import JSConfetti from 'js-confetti'

import vmQuestion from './vmQuestion.js'
import vmModal from '../utils/vmModal.js'

export default function vmAccounting(settings){
    const self = this;
    /**
     * members
     */////////////////////////////////////////////////////////////
    self.questionSource = settings.url;
    self.questions = [];
    self.cookieName = settings.cookieName ?? 'ACCOUNT_ME_IN';
    self.cookieExpireIn = settings.expireIn ?? 7;
    self.fun = new JSConfetti();
    self.haveFun = function(forever = 0){
        self.fun.addConfetti({emojis: ['🤘', '💰', '👍','✍', '🧠', '💁‍♀️', '💁‍♂️','👩‍💻', '🍍', '⚙', '💣', '🔑', '📈', '📉', '📊','📋' , '📐' ]}).then(()=>forever && self.haveFun(forever))
        return true;
    }
    /**
     * observables
     */////////////////////////////////////////////////////////////
    self.userInput = ko.observableArray();


    /**
    * computed
    */////////////////////////////////////////////////////////////
    self.currentIndex = ko.computed(function(){
        return self.userInput().findIndex(e=>e && e.current()) ?? 0;
    })
    self.currentQuestion = ko.computed(function(){
        return  self.userInput()[self.currentIndex()] ?? new vmQuestion();
    })
    self.answersJSON = ko.computed(function() { 
        return JSON.stringify(self.userInput().map(answer => answer.toFormatted()));
    });
    
    
    /**
     * methods
     */////////////////////////////////////////////////////////////

    // Cookie CRUD
    self.isCookie = (cookieName) => Cookies.get(cookieName) && Cookies.get(cookieName) !== 'undefined';
    self.updateCookie = (cookieName, val, expireIn) => Cookies.set(cookieName, val, {expires: expireIn, path: '' });
    self.getCookie = () => JSON.parse( self.isCookie(self.cookieName) ? Cookies.get(self.cookieName) : '[]' ).map(userInput => new vmQuestion(userInput));
    self.removeCookie = () => Cookies.remove(self.cookieName, {expires: -1, path: '' });

    // Async calls
    self.getQuestions = function(){ // aquire json object with questions
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

    self.sendAnswers = function(){// send json object of question-userInput data to server 
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

    // User Interactions
    // Add designated question to userInput array
    self.addUserInput = (index) => self.userInput.splice(index, 1, new vmQuestion(self.questions[index]));
    
    self.nextUnfinishedIndex = function(wanted){
        if(typeof wanted == 'number'){
            console.log('here');
            if(self.userInput()[wanted] == undefined) self.addUserInput(wanted);
            return wanted
        }
        let index = self.userInput().findIndex(Object.is.bind(null, undefined));// find index of first undefined element
        if(index == -1) index = self.userInput().findIndex((e)=> e.answered == false); // no undefined - find unfinished

        // no unfinished and user isnt finished with all questions
        if(index == -1 && self.userInput().length < self.questions.length){
            // add the next question using array length ass index
            index = self.userInput().length;
            self.addUserInput(index);
        }
        return index;// tell em where it is
    }

    self.next = function(index){
        self.currentQuestion().current(false);// unset current
        let i = self.nextUnfinishedIndex(index);
        self.userInput()[i].current(true);// set current
        window.scrollTo(0, 0);// show the world
    };
    
    self.checkAnswers = function(){
        if(self.currentQuestion().isCorrect()){// no errors found in answers and all matched
            self.currentQuestion().answered = true;// mark it forever answered
            
            if(self.questions.length != self.userInput().length || self.nextUnfinishedIndex() >= 0){// if short on answers or there are any unfinished
                // Show they got it right
                new vmModal({
                    title: "Correct!",
                    message: "Click next to continue.",
                    onInit: self.haveFun,
                    buttons: [{ text: "Next", callback: self.next}]// keep going
                });
            }else{// Trial completed
                self.sendAnswers().then(function(){
                    self.removeCookie()// get rid of the evidence
                    // Congratulations all around //
                    new vmModal({
                        title: "You Win!",
                        message: self.userInput().length + " out of " + self.questions.length +" answered correctly! Wanna try again?",
                        onInit: () => self.haveFun(1),
                        buttons: [
                            { text: "Yes", callback: () => window.location.reload() }, // Go insane
                            { text: "No", callback: () => { location.href="https://www.youtube.com/watch?v=KxGRhd_iWuE"; } // Get inspired and back to work
                        }]
                    });
                });
            }
        }
    };


    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     * init                                              |||||||
     */////////////////////////////////////////////////////////
    self.start = function(){
        self.userInput(self.getCookie()); // Check for cookie containing unfinished answer array
            
        self.answersJSON.subscribe( value => self.updateCookie(self.cookieName, value, self.cookieExpireIn)); // update cookie when userInput changes
        
        self.userInput().findIndex(e=>e.current && e.current()) < 0 && self.next() // if no cookie data kick it off
    }
    
    self.init = function(){
        self.getQuestions().then(function(){// start by getting the questions
            if(self.isCookie(self.cookieName)) self.start()
            else {
                return new vmModal({
                    title: "Ready to play?",
                    message: 'Fill out the fields according to the questions and see if you can get them all. Try it out!',
                    buttons: [
                        { text: "Start", callback: function(){ return self.haveFun() && self.start(); } }// Start
                    ]
                });
            }
        });
    }();

    return self;
};
