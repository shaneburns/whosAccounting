![Money Bag](https://accounting.shaneburns.com/images/favicons/base.png)

# whosAccounting - Reclique - Technical Interview

<a href="https://accounting.shaneburns.com/" target="_blank"><image alt="QR Code Link" src="https://accounting.shaneburns.com/images/qrcode.png" width="300"></a>

Scan or click the qr code above to view my solution following <a href="https://reclique.github.io/web-dev-testing/1_accounting_game/" target="_blank">these requirements</a>.

## Description

A web project that creates an interactive questionnaire from the json structure provided [here](https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json) and checks user input against the given data.  Questions have multiple answers categorized by *cash* and *accrual* entries.  These entries are individually checked for validity and possible matches upon user input; answers can be mass checked with a submit button. Question/Answer groups are paginated, maintained independently, and can be filled out in any order.  Cookies store user input for quick resumption if page is reloaded. User can reject cookie use and maintain core functionality. Upon completing the final question, a user can input their initials and a db record will be made and viewable on [this page](https://accounting.shaneburns.com/balancers). 👏😃

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
