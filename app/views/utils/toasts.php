<div id="toasts">
    <div id="toastWrapper">
        <ul class="section container is-pulled-right" data-bind="foreach: toasts">
            <li class="container group box block">
                <!-- ko if: dismissable -->
                    <button class="delete is-pulled-right" data-bind="click: resolve"></button>
                <!-- /ko -->
                <div class="content">
                    <p class="toastMessage" data-bind="html: message, css: {withButtons: buttons.length > 0}"></p>
                    <div class="buttons is-flex is-justify-content-flex-end" data-bind="foreach: buttons">
                        <input type="submit" class="button" data-bind="value: text, css: {'is-success': type == 'success', 'is-danger': type == 'danger', 'is-warning': type == 'warning'}, click: $parent.resolve">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>