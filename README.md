![Money Bag](https://accounting.shaneburns.com/images/favicons/base.png)

# whosAccounting - Reclique - Technical Interview

[My solution](https://accounting.shaneburns.com/) for the following [requirements](https://reclique.github.io/web-dev-testing/1_accounting_game/).

## Description

A web project that creates an interactive questionnaire from the json structure provided [here](https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json) and checks user input against the given data.  Questions have multiple answers categorized by *cash* and *accrual* entries.  These entries are individually checked for validity and possible matches upon user input; answers can be mass checked with a submit button. Question/Answer groups are paginated, maintained independently, and can be filled out in any order.  Cookies store user input for quick resumption if page is reloaded. User can reject cookie use and maintain core functionality. Upon completing the final question, the user can choose to input a set of initials and a special little db record will be made in remembrance of that special little moment when the user was the one who was accounting. 👏😃

## Tech Stack
- MySql/MariaDB
- php7.4.30 (MVC)
- KnockoutJS (MVVM)
- SASS 
- HTML 5

## Dependencies
| PHP Dependencies | JS Dependencies  | CSS Frameworks |
| --- | ---- | ------- |
| [ChemMVC](https://github.com/shaneburns/ChemMVC) | [jQuery](https://github.com/jquery/jquery) | [Sass](https://sass-lang.com) |
| [TDBM](https://github.com/thecodingmachine/tdbm) | [Knockout](https://github.com/knockout/knockout) | [Bulma](https://bulma.io) |
|                                                | [js-cookie](https://github.com/js-cookie/js-cookie) | [Animate](https://animate.style) |
|                                                | [js-confetti](https://github.com/loonywizard/js-confetti) |                           |
|                                                | **--dev** [webpack](https://github.com/webpack/webpack) |                             |