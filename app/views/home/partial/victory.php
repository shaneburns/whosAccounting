<div id="victoryMessage" class="box">
    <h2 class="title is-3">You've done it!</h2>
    <P data-bind="text: parent.userInput().length + ' out of ' + parent.questions.length +' answered correctly! Wanna try again?'"></P>
    
    <div style="width:100%;max-width=150px;margin:0 auto;height:0;padding-bottom:74%;position:relative;"><iframe src="https://giphy.com/embed/msKNSs8rmJ5m" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/day-subreddit-msKNSs8rmJ5m">via GIPHY</a></p>
    
    <p>The books are back in order, thanks to you.</p>

    <p>If you would like, put in your initials below and you'll go on the Balanced Board.</p>
    <form>
        <div class="field">
            <label class="label has-text-centered">Initials</label>
            <div class="control" data-bind="css: {'box': true}">
                <input class="input is-success" type="text" data-bind="textInput: parent.initials" maxlength="3" placeholder="AAA">
            </div>
        </div>
    </form>
</div>