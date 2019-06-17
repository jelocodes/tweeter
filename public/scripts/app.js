$(document).ready(function(){

  // Safely escape HTML strings
  const escape = (str) => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const timeConverted = (millisec) => {
    let seconds = Math.round(millisec / 1000);
    let minutes = Math.round(millisec / (1000 * 60));
    let hours = Math.round(millisec / (1000 * 60 * 60));
    let days = Math.round(millisec / (1000 * 60 * 60 * 24));
    let years = Math.round(millisec / (1000 * 60 * 60 * 24 * 365))

    if (seconds < 60) {
      return `${seconds} secs ago`;
    }

    if (minutes < 60) {
      return `${minutes} mins ago`;
    }

    if (hours < 24) {
      return `${hours} hours ago`;
    }

    if (days < 365) {
      return `${days} days ago`;
    }

    return `${years} years ago`;
  };

  // Create new twitter article DOM element from fetched database object
  const createTweetElement = (tweetObject) => {
    let $tweetArticle = $('<article>', {class: 'tweet'});

    let $img = $('<img />', {class: 'avatar', 'src': tweetObject.user.avatars.regular, alt: 'avatar'});
    let $userName = $('<h2>', {class: 'username'}).append(`${tweetObject.user.name}`);
    let $handle = $('<span>', {class: 'tag'}).append(`${tweetObject.user.handle}`);

    let $header = $('<header>').append($img).append($userName).append($handle);

    let $tweet = $('<p>', {class: 'tweet'}).append(`${escape(tweetObject.content.text)}`);

    let $date = $('<p>', {class: 'date'}).append(`${timeConverted(Date.now() - tweetObject.created_at)}`);

    let $icons = $('<span id="icons"><i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i></span>')

    let $footer = $('<footer>').append($date).append($icons);

    return $tweetArticle.append($header).append($tweet).append($footer);
  }

  // Appends the new created tweet elements to the DOM
  const renderTweets = (tweetObjectArray) => {
    for (tweetObject of tweetObjectArray) {
      $('#tweet-container').append(createTweetElement(tweetObject));
    }
  }

  // AJAX request to load tweets from the database
  const loadTweets = (last = false) => {
    if (last === true) {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (theTweets) {
        $('#tweet-container').prepend(createTweetElement(theTweets[0]));
      });
    } else {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (theTweets) {

        for (tweetObject of theTweets) {
          $('#tweet-container').append(createTweetElement(tweetObject));
        }

      });
    }
  }

  // Slide the compose form up and down on button press
  $('button#compose').click(() => {
    if ($('section.new-tweet').is(':hidden')) {
      $('section.new-tweet').slideDown('slow', () => $('textarea').focus());
    } else {
      $('section.new-tweet').slideUp('slow', () => $('section.new-tweet').hide());
    }
  })

  // Logic to handle new tweet submissions including error handling
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
        $('span.counter')[0].innerText = '140';
      });
    }
 });


  loadTweets();
})

