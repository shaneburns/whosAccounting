![Money Bag](https://accounting.shaneburns.com/images/favicons/base.png)

# whosAccounting - Reclique - Technical Interview

[My solution](https://accounting.shaneburns.com/) for the follwoing [requirements](https://reclique.github.io/web-dev-testing/1_accounting_game/).

## Description

This web project creates an interactive questionaire from the json structure provided and checks user input against the given data.  Questions have multiple answers categorized by *cash* and *accrual* entries.  These entries are individually checked for validity and possible matches upon user input; they can be mass checked with a submit button. 

This project uses cookies to store user input with the ability to reject. Questions are paginated allowing a user to go from one to another and maintain all current inputs and matches. Upon completing the final previously unfinished question, the page will allow the user to input a set of initials and a special little db record will be made in rememberance of that special little moment when the user was the one who was accounting.

### PHP Dependencies
* [ChemMVC](https://github.com/shaneburns/ChemMVC)

### JS Dependencies 
* [jQuery](https://github.com/jquery/jquery)
* [Knockout](https://github.com/knockout/knockout)
* [js-confetti](https://github.com/loonywizard/js-confetti)

### CSS Frameworks
* [Bulma](https://bulma.io)
* [Animate](https://animate.style)
