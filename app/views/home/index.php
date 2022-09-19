<?php 
    $this->title = "Reclique/DaxCo - Technical Interview ";
    $this->description = "Reclique Technical Interview";
    $this->styles[] = "/css/dist/main.min.css";
    include(APP_ROOT.ds."views".ds."shared".ds."head.php");
?>

<body>
    <header>
        <h1>Who's Accounting?</h1>
    </header>

    <main>
        <form>
            <div id="currentQuestion" data-bind="with: currentQuestion">
                <h2 data-bind="text: title"></h2>
                <div id="question" data-bind="text: description + '?'"></div>
                <div id="answers">
                    <h3>Cash Entries</h3>
                    <ul id="cash" class="group" data-bind="foreach: cashEntries">
                        <li class="answer" data-bind="css: {'error': errors().length > 0}">

                            <span class="entryNumberWrapper"><span class="entryNumber" data-bind="text: $index() + 1"></span></span>
                            
                            <span class="checkmarkWrapper hidden" data-bind="css: {hidden: match() === undefined }"><span class="checkmark">✔️</span></span>

                            <div class="formElWrapper">
                                <label class="floatingLabel">When</label>
                                <input type="date" data-bind="value: when, disable: match() !== undefined" required>
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Type</label>
                                <select class="type" data-bind="options: typeList, value: selectedType, optionsCaption: 'Choose', disable: match() !== undefined" required></select>
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Dr</label>
                                <input type="number" data-bind="textInput: dr, disable: match() !== undefined">
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Cr</label>
                                <input type="number" data-bind="textInput: cr, disable: match() !== undefined">
                            </div>
                            <ul class="errors hidden" data-bind="foreach: errors(), css: {hidden: errors().length == 0}">
                                <li data-bind="text: $data"></li>
                            </ul>
                        </li>
                    </ul>

                    <h3>Accrual Entries</h3>
                    <ul id="accrual" class="group" data-bind="foreach: accrualEntries">
                        <li class="answer" data-bind="css: {'error': errors().length > 0}">

                            <span class="entryNumberWrapper"><span class="entryNumber" data-bind="text: $index() + 1"></span></span>

                            <span class="checkmarkWrapper hidden" data-bind="css: {hidden: match() === undefined }"><span class="checkmark">👍</span></span>

                             <div class="formElWrapper">
                                <label class="floatingLabel">When</label>
                                <input type="date" data-bind="value: when, disable: match() !== undefined" required>
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Type</label>
                                <select class="type" data-bind="options: typeList, value: selectedType, optionsCaption: 'Choose', disable: match() !== undefined" required></select>
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Dr</label>
                                <input type="number" data-bind="textInput: dr, disable: match() !== undefined">
                            </div>
                            <div class="formElWrapper">
                                <label class="floatingLabel">Cr</label>
                                <input type="number" data-bind="textInput: cr, disable: match() !== undefined">
                            </div>
                            <ul class="errors hidden" data-bind="foreach: errors(), css: {hidden: errors().length == 0}">
                                <li data-bind="text: $data"></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="indicators">
                <ul data-bind="foreach: questions">
                    <li data-bind="css: {curr: $index() == $parent.questionNumber()}, attr: {title: title}, text: $index() == $parent.questionNumber() ? '&#10687;' : '&#10686;', click: () => $parent.setQuestion($index())"></li>
                </ul>
            </div>
            <input id="submit" type="submit" data-bind="click: currentQuestion().answered ? next : checkAnswers, value: currentQuestion().answered ? 'Next' : 'Submit'"/>
        </form>
    </main>

    <?php include(APP_ROOT.ds.'views'.ds.'utils'.ds.'loader.php'); ?>

    <script src="/scripts/dist/accountBundle.js"></script>
</body>
</html>