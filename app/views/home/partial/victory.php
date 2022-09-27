<div id="victoryMessage">
    <div class="container columns">
        <div class="column is-flex is-justify-content-center">
            <figure class="image is-128x128">
                <img src="/images/yesh.gif" alt="">    
            </figure>
            <p class="is-hidden"><a href="https://giphy.com/gifs/day-subreddit-msKNSs8rmJ5m">via GIPHY</a></p>
        </div>
        <div class="column">
            <P class="has-text-centered" data-bind="text: parent.userInput().length + ' of ' + parent.questions.length +' entries corrected!'"></P>
            <p class="has-text-centered">The books are back in order, thanks to you.</p>
        </div>
    </div>

    <div class="box has-background-success has-text-white">
        <p>With that, you've <em>earned</em> a spot for your initials on the coveted <strong class="has-text-white">Balancer Board</strong>.</p>
        
        <div class="field">
            <label class="label is-underlined has-text-white">Enter Your Initials</label>
            <div class="control" data-bind="css: {'box': true}">
                <input class="input is-success" type="text" data-bind="textInput: parent.initials" maxlength="3" placeholder="AAA">
            </div>
        </div>
    </div>
</div>