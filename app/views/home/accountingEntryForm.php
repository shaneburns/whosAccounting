<li class="answer container" data-bind="css: {'error': errors().length > 0}">

    <span class="entryNumberWrapper"><span class="entryNumber" data-bind="text: $index() + 1"></span></span>

    <span class="checkmarkWrapper hidden" data-bind="css: {hidden: match() === undefined }"><span class="checkmark">👍</span></span>

    <div class="formElWrapper">
        <label class="floatingLabel">When</label>
        <input type="date" class="input" data-bind="textInput: when, disable: match() !== undefined, valueUpdate: 'afterkeydown'" placeholder="00/00/0000" required>
    </div>
    <div class="formElWrapper">
        <label class="floatingLabel">Type</label>
        <select class=" type input select" data-bind="options: typeList, value: selectedType, optionsCaption: 'Choose', disable: match() !== undefined, valueUpdate: 'input'" placeholder="Choose"  required></select>
    </div>
    <div class="formElWrapper">
        <label class="floatingLabel">Dr</label>
        <input type="number" class="input"  data-bind="textInput: dr, disable: match() !== undefined" placeholder="Ammount">
    </div>
    <div class="formElWrapper">
        <label class="floatingLabel">Cr</label>
        <input type="number" class="input"  data-bind="textInput: cr, disable: match() !== undefined" placeholder="Ammount">
    </div>
    <ul class="errors hidden" data-bind="foreach: errors(), css: {hidden: errors().length == 0}">
        <li data-bind="text: $data"></li>
    </ul>
</li>