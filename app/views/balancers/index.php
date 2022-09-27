<?php 
    // Independent page vars
    $this->title = "Balancer Board";
    $this->description = "Those who have completed the books.";
    array_push($this->styles, 
        "/css/dist/balancer.min.css"
    );

    include(APP_ROOT.ds."views".ds."shared".ds."head.php");
?>

<body class="has-navbar-fixed-top is-clipped">
    <header class="navbar is-fixed-top">
        <div class="is-overlay">
            <h1 class="title is-3"><span class="money has-text-success">$🧠</span> ¿Who's Accounting? <span class="money has-text-success">💰</span></h1>
        </div>
    </header>

    <main class="content section block mt-6 is-hidden" data-bind="css: {'is-hidden': balancers().length === 0}">
        <h1 class="title is-1">Board of Balancers</h1>
        <h2 class="subtitle ml-6 block">Those who have looked through the books and filled the fields.</h2>
        <div class="container my-6 is-medium">
            <p><strong data-bind="text: balancers().length"></strong> have joined these ranks.  Are you among them?</p>
            <p>Join the board by completing <a href="/">the trial</a>.</p>
        </div>
        <div class="container">
            <ul class="has-background-success-light is-flex-desktop is-flex-wrap-wrap is-justify-content-space-between is-align-content-center ml-0 box" data-bind="foreach: balancers">
                <li class="is-clickable box content is-flex-grow-1 mx-1 animate__animated" 
                    data-bind="
                        css: {
                            'animate__bounceIn loading': !$parent.loaded(), 
                            'highlight': createdAt() == $parent.highlight(),
                            'has-text-light has-background-success': $parent.loaded() && createdAt() == $parent.highlight(),
                            'active': $parent.loaded()
                        }, 
                        style: { 'animation-delay': $parent.loaded() ? '0s' : $index()*100+'ms'}
                    ">
                    <p class="title is-3" data-bind="text: initials"></p>
                    <p class="title is-4" data-bind="text: convertedDate"></p>
                </li>
            </ul>
        </div>
    </main>

    <footer class="footer has-background-transparent is-hidden" data-bind="css: {'is-hidden': balancers().length === 0}">
        <div class="content has-text-centered">
            <p>
            <strong>Designed</strong> by <a href="https://shaneburns.com"  target="_blank">Shane Burns</a>
            </p>
            <p>
                Get your initials on this page by discovering <a href="/"  target="_blank">Who's Accounting</a>
            </p>
            <p>
                <em>
                    <a href="https://github.com/shaneburns/whosAccounting" target="_blank"> View on
                            <span class="image ml-1 is-16x16 is-inline-block">
                                <img class="is-rounded" style="margin-top: 2px" src="https://github.githubassets.com/apple-touch-icon-144x144.png" />
                            </span>
                        GitHub
                    </a>
                </em>
            </p>
        </div>
    </footer>

    <?php include(APP_ROOT.ds.'views'.ds.'utils'.ds.'loader.php'); ?>
    <script src="/scripts/dist/balancerBundle.js"></script>
</body>
</html>