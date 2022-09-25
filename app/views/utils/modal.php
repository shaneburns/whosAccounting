<div id="modal<?php echo \ChemMVC\utils::GUID(); ?>" class="modal is-active">
    <div class="modal-background" data-bind="click: resolve"></div>
    <div class="modal-card animate__animated animate__bounceIn">
        <header class="modal-card-head">
            <p class="modal-card-title" data-bind="html: title"></p>
            <button class="delete" aria-label="close" data-bind="click: destroy"></button>
        </header>
        <section class="modal-card-body">
            <div class="content is-medium">
                <p data-bind="text: message"></p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div data-bind="foreach: buttons">
                <button class="button" data-bind="text: text, click: $parent.resolve, css: {'is-success': $index() == 0, 'is-danger': $index() == $parent.buttons.length}"></button>
            </div>
        </footer>
    </div>
</div>