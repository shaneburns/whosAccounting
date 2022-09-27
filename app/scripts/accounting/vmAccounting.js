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
    /**
     * observables
     */////////////////////////////////////////////////////////////
    self.running = ko.observable(false);
    self.initials = ko.observable()
    self.userInput = ko.observableArray();
    self.scrollTop = ko.observable();
    self.modal = ko.observable();
    self.answerJSONSub = null;
    


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
    self.getCookie = () => JSON.parse( self.isCookie(self.cookieName) ? Cookies.get(self.cookieName) : '[]' );
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
            dismissable: false,
            buttons: [
                {text: '🍪 Sweet 🥛', callback: function(){ self.acceptCookies(true);}, type: 'success'},
                {text: 'Reject', callback: function(){ self.acceptCookies(false);}, type: 'danger'}
            ]
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
            data: {results: self.answersJSON(), initials: self.initials()},
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
        if(typeof wanted == 'number'){ // If a specific Index is being requested
            if(self.userInput()[wanted] == undefined) self.addUserInput(wanted); // add the index if it doesn't exist
            return wanted; // it's good to go
        }
        let index = self.userInput().findIndex(Object.is.bind(null, undefined));// find index of first undefined element
        if(index == -1) index = self.userInput().findIndex((e)=> e.answered() == false); // no undefined - find unfinished

        // no unfinished questions but the user hasn't completed all questions
        if(index == -1 && self.userInput().length < self.questions.length){
            // add the next question
            index = self.userInput().length;
            self.addUserInput(index);
        }
        return index;// tell em where it is
    }

    self.next = function(index){
        self.currentQuestion().current(false);// unset current
        let i = self.nextUnfinishedIndex(index);// find next appropriate index
        if(i === -1 ) return self.showModal();
        self.userInput()[i].current(true);// set current
    };

    self.showModal = function(){            
        if(self.questions.length != self.userInput().length || self.nextUnfinishedIndex() >= 0){// if short on answers or there are any unfinished
            // Show they got it right
            self.modal(new vmModal({
                title: "Correct!",
                //partialView: '/home/correct',
                message: "There are still records to amend.",
                onInit: ()=> self.haveFun() && window.scrollTo(0,0),
                onDestroy: ()=> self.modal(false),
                buttons: [{ text: "Next", callback: self.next}]// keep going
            }));
        }else if(self.running()){// Trial completed
            self.running(false)// turn off the oven
            self.answerJSONSub.dispose(); // dispose of the evidence
            self.updateCookie(self.cookieName, JSON.stringify('You Win'), self.cookieExpireIn);// make sure they know about it
            
            // Congratulations all around //
            self.modal(new vmModal({
                title: "You've Done It!",
                dismissable: false,
                partialView: '/home/victory',
                parent: self,
                onInit: () => self.haveFun(true, 1) && window.scrollTo(0,0),
                buttons: [
                    { 
                        text: "Send Initials", 
                        callback: () => {
                            self.sendAnswers().then(function(response){// Initials sent and stored
                                let r =  JSON.parse(response);
                                if(r && r.success){
                                    window.open("/balancers?dateTime="+JSON.stringify(r.dateTime), '_blank');
                                }
                                window.location.reload();
                            })
                        }
                    }, 
                    { text: "No Thanks", callback: () => window.open("https://www.youtube.com/watch?v=KxGRhd_iWuE", '_blank')}  // Get inspired and back to work
                ]
            }));
            
        }
        return true;
    }

    // Add some flare
    self.haveFun = function(fun = true, forever = 0){
        self.fun.addConfetti({
            emojis: fun ? ['🤘', '💰','✍', '🧠', '💁‍♀️', '💁‍♂️','👩‍💻', '🍍', '⚙', '💣', '🔑', '📈', '📉', '📊','📋' , '📐' ] :
                ['⭕','😡','😡','😤','💢','💢','💢','❌','⭕','💩','💩','⛔','⛔','🙅‍♂️','🙅‍♀️','😒','😒','😒','😒'],
            emojiSize: 40
        }).then(()=>forever && self.haveFun(fun, forever));
        return fun;
    };

    // Events
    document.addEventListener('scroll', (e)=> self.scrollTop(window.scrollY))


    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     * init                                              |||||||
     */////////////////////////////////////////////////////////
    self.start = function(){
        let cookieVal = self.getCookie();
        if(cookieVal === 'You Win'){
            self.modal(new vmModal({
                title: "That's it for now",
                partialView: '/home/victoryLanding',
                dismissable: false,
                buttons: [
                    {text: 'Reset', callback: ()=> { self.removeCookie(); location.reload(); }}
                ]
            }));
            return;
        }

        self.userInput(cookieVal.map(userInput => new vmQuestion(userInput, self))); // Check for cookie containing unfinished answer array

        self.answerJSONSub = self.answersJSON.subscribe( value => {
            if(self.acceptanceCookie() === false || self.acceptanceCookie() === 'false') return self.isCookie(self.cookieName) && self.removeCookie()
            self.updateCookie(self.cookieName, value, self.cookieExpireIn)
        }); // update or reject cookie when userInput changes
        
        self.userInput().findIndex(e=>e.current && e.current()) < 0 && self.next() // if no cookie data kick it off
        
        toastManager.addToast(new vmToast({
            message: 'Articulating splines'
        }));
    }
    
    self.init = function(){
        if(self.acceptanceCookie() == null || self.acceptanceCookie() == 'null') self.showCookieAcceptanceToast()
        self.getQuestions().then(function(){// start by getting the questions
            self.running(true);
            if(self.isCookie(self.cookieName)) self.start()
            else {
                self.modal(new vmModal({
                    title: "Something seems off...",
                    partialView: '/home/intro',
                    dismissable: false,
                    onDestroy: ()=> self.modal(false),
                    buttons: [
                        { text: "Start", callback: function(){ return self.haveFun() && self.start(); } }// Start
                    ]
                }));
                return
            }
        });
    }();

    return self;
};
