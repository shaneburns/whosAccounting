import $, { ajax } from 'jquery';
import ko from 'knockout';
import 'knockout-mapping';
import Cookies from 'js-cookie';
import JSConfetti from 'js-confetti';

import vmQuestion from './vmQuestion.js';
import vmModal from '../utils/vmModal.js';
import {vmToast} from './../utils/vmToastManager.js';

export default function vmAccounting(settings){
    const self = this;
    /**
     * members
     */////////////////////////////////////////////////////////////
    self.questionSource = settings.url;
    self.questions = [];
    self.cookieName = settings.cookieName ?? 'ACCOUNT_AFTER_ME';
    self.cookieExpireIn = settings.expireIn ?? 7;
    self.acceptanceCookieName = settings.acceptanceCookieName ?? 'ACCOUNT_ME_IN';
    self.acceptanceCookieExpireIn = settings.acceptanceExpireIn ?? 31;
    self.fun = new JSConfetti();
    self.haveFun = function(fun = true, forever = 0){
        self.fun.addConfetti({
            emojis: fun ? ['🤘', '💰','✍', '🧠', '💁‍♀️', '💁‍♂️','👩‍💻', '🍍', '⚙', '💣', '🔑', '📈', '📉', '📊','📋' , '📐' ] :
                ['⭕','😡','😡','😤','💢','💢','💢','❌','⭕','💩','💩','⛔','⛔','🙅‍♂️','🙅‍♀️','😒','😒','😒','😒'],
            emojiSize: 40
        }).then(()=>forever && self.haveFun(forever));
        return fun;
    };
    /**
     * observables
     */////////////////////////////////////////////////////////////
    self.userInput = ko.observableArray();


    /**
    * computed
    */////////////////////////////////////////////////////////////
    self.currentIndex = ko.pureComputed(function(){
        return self.userInput().findIndex(e=>e && e.current()) ?? 0;
    })
    self.currentQuestion = ko.pureComputed(function(){
        return  self.userInput()[self.currentIndex()] ?? new vmQuestion();
    })
    self.answersJSON = ko.pureComputed(function() { 
        return JSON.stringify(self.userInput().map(answer => answer.toFormatted()));
    });
    
    
    /**
     * methods
     */////////////////////////////////////////////////////////////

    // Cookie CRUD
    self.isCookie = (cookieName) => Cookies.get(cookieName) && Cookies.get(cookieName) !== 'undefined';
    self.updateCookie = (cookieName, val, expireIn) => Cookies.set(cookieName, val, {expires: expireIn, path: '' });
    self.getCookie = () => JSON.parse( self.isCookie(self.cookieName) ? Cookies.get(self.cookieName) : '[]' ).map(userInput => new vmQuestion(userInput, self));
    self.removeCookie = () => Cookies.remove(self.cookieName, {expires: -1, path: '' });
    self.acceptCookies = function(verdict){
        self.updateCookie(self.acceptanceCookieName, verdict, self.acceptanceExpireIn)
        if(!verdict) self.removeCookie()
    }

    // Accepting Cookies - a two step process
    self.showCookieAcceptanceToast = function(){
        toastManager.addToast(new vmToast({
            message: 'Cookies are being dunked and gobbled for this website. <a class="is-underlined" href="https://cookiesandyou.com" rel="noopener noreferrer nofollow" target="_blank" style="">What are cookies?</a>',
            duration: Infinity, 
            buttons: [
                {text: '🍪 Sweet 🥛', callback: function(){ self.acceptCookies(true);}, type: 'success'},
                {text: 'Reject', callback: function(){ self.acceptCookies(false);}, type: 'danger'}
            ]
        }));
        toastManager.addToast(new vmToast({
            message: 'Seeing how it happens on the page and through the cycle',
            dismissable: true
        }));
    }
    self.acceptanceCookie = () => self.isCookie(self.acceptanceCookieName) ? Cookies.get(self.acceptanceCookieName) : self.updateCookie(self.acceptanceCookieName, null, self.acceptanceCookieExpireIn) && true ? null : false
    

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
    self.addUserInput = (index) => self.userInput.splice(index, 1, new vmQuestion(self.questions[index], self));
    
    self.nextUnfinishedIndex = function(wanted){
        if(typeof wanted == 'number'){
            if(self.userInput()[wanted] == undefined) self.addUserInput(wanted);
            return wanted
        }
        let index = self.userInput().findIndex(Object.is.bind(null, undefined));// find index of first undefined element
        if(index == -1) index = self.userInput().findIndex((e)=> e.answered() == false); // no undefined - find unfinished

        // no unfinished questions but the user isnt finished with all questions
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

    self.showModal = function(){            
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
                    onInit: () => self.haveFun(true, 1),
                    buttons: [
                        { text: "Yes", callback: () => window.location.reload() }, // Go insane
                        { text: "No", callback: () => { location.href="https://www.youtube.com/watch?v=KxGRhd_iWuE"; } // Get inspired and back to work
                    }]
                });
            });
        }
        return true;
    }
    
    self.checkAnswers = function(){
        if(self.currentQuestion().answered()){// no errors found in answers and all matched
            return self.showModal();
        }
        self.haveFun(false);
        return false;
    };


    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     * init                                              |||||||
     */////////////////////////////////////////////////////////
    self.start = function(){
        self.userInput(self.getCookie()); // Check for cookie containing unfinished answer array
            
        self.answersJSON.subscribe( value => {
            if(self.acceptanceCookie() === false || self.acceptanceCookie() === 'false') return self.isCookie(self.cookieName) && self.removeCookie()
            self.updateCookie(self.cookieName, value, self.cookieExpireIn)
        }); // update cookie when userInput changes
        
        self.userInput().findIndex(e=>e.current && e.current()) < 0 && self.next() // if no cookie data kick it off
    }
    
    self.init = function(){
        if(self.acceptanceCookie() == null || self.acceptanceCookie() == 'null') self.showCookieAcceptanceToast()
        self.getQuestions().then(function(){// start by getting the questions
            if(self.isCookie(self.cookieName)) self.start()
            else {
                return new vmModal({
                    title: "Ready to play?",
                    message: 'Fill out the fields according to the questions and see if you can get them all. Try it out!',
                    buttons: [
                        { text: "Start", callback: function(){ return (self.haveFun() || true) && self.start(); } }// Start
                    ]
                });
            }
        });
    }();

    return self;
};
