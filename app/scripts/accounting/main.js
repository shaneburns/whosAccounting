import ko from 'knockout'
import vmAccounting from './vmAccounting.js'
import vmLoader from './../utils/vmLoader.js'

window.loader = new vmLoader({id: "loaderWrapper"})

const main = function(){
    ko.bindingHandlers.stopBinding = {
        init: function(){
            return { controlsDescendantBindings: true };
        }
    }
    ko.virtualElements.allowedBindings.stopBinding = true;

    const game = new vmAccounting({url: 'https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json'});
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    main();
} else {
  document.addEventListener("DOMContentLoaded", main);
} 