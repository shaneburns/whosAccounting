import ko from 'knockout';

import vmBalancerBoard from './vmBalancerBoard.js';
import vmLoader from './../utils/vmLoader.js';

window.loader = new vmLoader({id: "loaderWrapper"});

const main = function(){
    ko.bindingHandlers.stopBinding = {
        init: function(){
            return { controlsDescendantBindings: true };
        }
    }
    ko.virtualElements.allowedBindings.stopBinding = true;

    const board = new vmBalancerBoard();

}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    main();
} else {
    document.addEventListener("DOMContentLoaded", main);
} 
