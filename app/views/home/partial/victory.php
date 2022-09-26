<div id="victoryMessage">
    <div class="container columns">
        <div class="column">
            <div style="width:100%;max-width=150px;margin:0 auto;height:0;padding-bottom:35%;position:relative;"><iframe src="https://giphy.com/embed/msKNSs8rmJ5m" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
            <p class="is-hidden"><a href="https://giphy.com/gifs/day-subreddit-msKNSs8rmJ5m">via GIPHY</a></p>
        </div>
        <div class="column">
            <P class="has-text-centered" data-bind="text: parent.userInput().length + ' of ' + parent.questions.length +' entries corrected!'"></P>
            <p class="has-text-centered">The books are back in order, thanks to you.</p>
        </div>
    </div>

    <div class="box has-background-primary">
        <p>With that, you've <em>earned</em> a spot for your initials on the coveted <strong>Balancer Board</strong>.</p>
        <form>
            <div class="field">
                <label class="label is-underlined">Enter Your Initials</label>
                <div class="control" data-bind="css: {'box': true}">
                    <input class="input is-success" type="text" data-bind="textInput: parent.initials" maxlength="3" placeholder="AAA">
                </div>
            </div>
        </form>
    </div>
</div>