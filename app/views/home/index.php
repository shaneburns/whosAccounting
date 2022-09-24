<?php 
    // Independent page vars
    $this->title = "Reclique/DaxCo - Technical Interview ";
    $this->description = "Reclique Technical Interview";
    array_push($this->styles, 
        "/css/dist/accounting.min.css",
        "/css/dist/myBulma.min.css"
    );

    include(APP_ROOT.ds."views".ds."shared".ds."head.php");
?>

<body class="has-navbar-fixed-top is-clipped">
    <header class="navbar is-fixed-top has-background-transparent-white">
        <h1 class="title is-3"><span class="money has-text-success">$🧠</span> ¿Who's Accounting? <span class="money has-text-success">💰</span></h1>
    </header>

    <main class="is-hidden my-6 py-6" data-bind="css: {'is-hidden': !currentQuestion().title}">
        <form class="container is-flex is-flex-direction-column mt-6" data-bind="submit: haveFun">
            <div id="currentQuestion" class="block" data-bind="with: currentQuestion">
                <div class="section">
                    <h2 class="title is-1 is-underlined" data-bind="text: title"></h2>
                    <h3 class="subtitle block ml-4 " data-bind="text: ' of ' + $root.questions.length"></h3>
                    <div id="question" class="block is-size-3 has-text-centered" data-bind="text: description + '?'"></div>
                </div>
                <div id="indicators" class="container is-flex is-justify-content-center block">
                    <div data-bind="foreach: $root.questions"  class="columns">
                        <div class="column button is-white py-1 px-3 is-inline-block" data-bind="css: {curr: $index() == $root.currentIndex()}, attr: {title: title}, text: $root.userInput()[$index()] && $root.userInput()[$index()].answered() ? '&#x2705;' : $index() == $root.currentIndex() ? '&#10687;' :  '&#10686;', click: () => $root.next($index())"></div>
                    </div>
                </div>

                <div id="answers" class="section">
                    <div class="block mb-6 pb-6">
                        <h3 class="title block">Cash Entries</h3>
                        <ul id="cash" class="group container block" data-bind="foreach: cashEntries">
                            <?php include(APP_ROOT.ds."views".ds."home".ds."accountingEntryForm.php"); ?>
                        </ul>
                    </div>
                    <div class="block">
                        <h3 class="title block">Accrual Entries</h3>
                        <ul id="accrual" class="group container block" data-bind="foreach: accrualEntries">
                            <?php include(APP_ROOT.ds."views".ds."home".ds."accountingEntryForm.php"); ?>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section mb-6">
                <div class="columns pb-6">
                    <input id="submit" type="submit" class="button box is-large is-success column is-half is-offset-one-quarter is-half-mobile is-offset-one-quarter-mobile" data-bind="click: currentQuestion().answered() ? next : currentQuestion().matchAll, value: currentQuestion().answered() ? 'Next' : 'Submit'"/>
                </div>    
            </div>
        </form>
    </main>

    <?php include(APP_ROOT.ds.'views'.ds.'utils'.ds.'loader.php'); ?>

    <script src="/scripts/dist/accountBundle.js"></script>
</body>
</html>