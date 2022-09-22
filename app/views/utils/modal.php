<div id="modal<?php echo \ChemMVC\utils::GUID(); ?>" class="modalWrapper">
    <div class="clickOffModal" data-bind="click: resolve"></div>
    <div class="modalBody">
        <h2 data-bind="html: title"></h2>
        <p data-bind="text: message"></p>
        <div class="modalButtons" data-bind="foreach: buttons">
            <input type="submit" data-bind="value: text, click: $parent.resolve, css: {defaultBtn: $index() == 0}">
        </div>
    </div>
</div>