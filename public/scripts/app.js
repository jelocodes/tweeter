$(document).ready(function(){

  const escape = (str) => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweetObject) => {
    let $tweetArticle = $('<article>', {class: 'tweet'});

    let $img = $('<img />', {class: 'avatar', 'src': tweetObject.user.avatars.regular, alt: 'avatar'});
    let $userName = $('<h2>', {class: 'username'}).append(`${tweetObject.user.name}`);
    let $handle = $('<span>', {class: 'tag'}).append(`${tweetObject.user.handle}`);

    let $header = $('<header>').append($img).append($userName).append($handle);

    let $tweet = $('<p>', {class: 'tweet'}).append(`${escape(tweetObject.content.text)}`);

    let $date = $('<p>', {class: 'date'}).append(`${Math.ceil((Math.abs(new Date() - new Date(tweetObject.created_at))) / (1000 *3600 * 24))} days ago`);

    let $icons = $('<span id="icons"><i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i></span>')

    let $footer = $('<footer>').append($date).append($icons);

    return $tweetArticle.append($header).append($tweet).append($footer);
  }

  $('button#compose').click(() => {
    if ($('section.new-tweet').is(':hidden')) {
      $('section.new-tweet').slideDown('slow', () => $('textarea').focus());
    } else {
      $('section.new-tweet').slideUp('slow', () => $('section.new-tweet').hide());
    }
  })


  $("#new-tweet-form").submit(event => {
    event.preventDefault();
    $('#error').css('display', 'none');

    let inputLength = $('textarea').val().length;

    if (inputLength > 140) {
      $('#error').css({'display': 'block', 'position': 'relative', 'left': '1em', 'top': '.3em'}).text('Error: Tweet exceeds 140 characters.');
    } else if (inputLength < 1) {
      $('#error').css({'display': 'block', 'position': 'relative', 'left': '1em', 'top': '.3em'}).text('Error: Cannot send empty tweet.');
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $('#new-tweet-form').serialize()
      })
      .done(function(msg) {
        loadTweets(true);
        $('textarea').val('');
      });
    }
 });


  const renderTweets = (tweetObjectArray) => {
    for (tweetObject of tweetObjectArray) {
      $('#tweet-container').append(createTweetElement(tweetObject));
    }
  }

  const loadTweets = (last = false) => {
    if (last === true) {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (theTweets) {
        $('#tweet-container').prepend(createTweetElement(theTweets[theTweets.length-1]));
      });
    } else {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (theTweets) {
        console.log('Success: ', theTweets);
        console.log(theTweets);

        for (tweetObject of theTweets) {
          $('#tweet-container').append(createTweetElement(tweetObject));
        }

      });
    }
  }


  loadTweets();
})

