<li class="answer box block is-relative animate__animated" data-bind="css: {'has-background-danger-light error animate__shakeX': errors().length > 0, 'has-background-success animate__tada': match() !== undefined}">
    <div class="columns mb-0">
        <span class="is-overlay"><span class="entryNumber is-size-too-big is-pulled-right has-text-grey-light" data-bind="text: $index() + 1"></span></span>

        <div class="column">
            <div class="field">
                <div class="control">
                    <label class="label">When</label>
                    <input type="date" class="input has-background-transparent-white" data-bind="textInput: when, disable: match() !== undefined" placeholder="00/00/0000" required>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <div class="control">
                    <label class="label">Type</label>
                    <div class="select is-flex">
                        <select class="is-flex-grow-1 has-background-transparent-white" data-bind="options: typeList, value: selectedType, optionsCaption: 'Choose', disable: match() !== undefined, valueUpdate: 'input'" placeholder="Choose"  required></select>
                    </div>
                </div>
            </div>
        </div>
        <!-- ko ifnot:  cr() -->
        <div class="column">
            <div class="field">
                <div class="control">
                    <label class="label">Dr</label>
                    <input type="number" class="input has-background-transparent-white"  data-bind="textInput: dr, disable: match() !== undefined || cr()" placeholder="Ammount">
                </div>
            </div>
        </div>
        <!-- /ko -->
        <!-- ko ifnot:  dr() -->
        <div class="column">
            <div class="field">
                <div class="control">
                    <label class="label">Cr</label>
                    <input type="number" class="input has-background-transparent-white" data-bind="textInput: cr, disable: match() !== undefined" placeholder="Ammount">
                </div>
            </div>
        </div>
        <!-- /ko -->
        <div class="column" data-bind="visible: errors().length > 0">
            <article class="message is-danger">
                <div class="message-body">
                    <ul class="errors hidden" data-bind="foreach: errors()">
                        <li data-bind="text: $data"></li>
                    </ul>
                </div>
            </article>
        </div>
    </div>
    
    <span class="checkmarkWrapper hidden is-overlay has-background-transparent-white" data-bind="css: {'hidden': match() === undefined}"><span class="checkmark is-size-too-big">👍</span></span>
</li>