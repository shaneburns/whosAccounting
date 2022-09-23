<?php 
    $this->title = "Reclique/DaxCo - Technical Interview ";
    $this->description = "Reclique Technical Interview";
    $this->styles[] = "/css/dist/main.min.css";
    include(APP_ROOT.ds."views".ds."shared".ds."head.php");
?>

<body>
    <header>
        <h1 class="title">$$$ ¿Who's Accounting? $$$</h1>
    </header>

    <main class="hidden" data-bind="css: {hidden: !currentQuestion().title}">
        <form>
            <div id="currentQuestion" data-bind="with: currentQuestion">
                <h2 class="title" data-bind="text: title + ' of ' + $root.questions.length""></span></h2>
                <div id="question" data-bind="text: description + '?'"></div>
                
                <div id="indicators">
                    <ul data-bind="foreach: $root.questions">
                        <li data-bind="css: {curr: $index() == $root.currentIndex()}, attr: {title: title}, text: $root.userInput()[$index()] && $root.userInput()[$index()].answered ? '&#x2705;' : $index() == $root.currentIndex() ? '&#10687;' :  '&#10686;', click: () => $root.next($index())"></li>
                    </ul>
                </div>

                <div id="answers" class="section">
                    <h3 class="title">Cash Entries</h3>
                    <ul id="cash" class="group container" data-bind="foreach: cashEntries">
                        <?php include(APP_ROOT.ds."views".ds."home".ds."accountingEntryForm.php"); ?>
                    </ul>

                    <h3 class="title">Accrual Entries</h3>
                    <ul id="accrual" class="group container" data-bind="foreach: accrualEntries">
                        <?php include(APP_ROOT.ds."views".ds."home".ds."accountingEntryForm.php"); ?>
                    </ul>
                </div>
            </div>

            <input id="submit" type="submit" class="button" data-bind="click: currentQuestion().answered ? next : checkAnswers, value: currentQuestion().answered ? 'Next' : 'Submit'"/>
        </form>
    </main>

    <?php include(APP_ROOT.ds.'views'.ds.'utils'.ds.'loader.php'); ?>

    <script src="/scripts/dist/accountBundle.js"></script>
</body>
</html>