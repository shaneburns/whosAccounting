<div id="toasts" >
    <div id="toastWrapper">
        <ul data-bind="foreach: toasts">
            <li class="toast group">
                <p class="toastMessage" data-bind="html: message, css: {withButtons: buttons.length > 0}"></p>
                <div class="buttons" data-bind="foreach: buttons">
                    <input type="submit" data-bind="value: text, click: $parent.resolve">
                </div>
            </li>
        </ul>
    </div>
</div>