$(document).ready(function(){
  const createTweetElement = (tweetObject) => {
    let $tweetArticle = $('<article>', {class: 'tweet'});

    let $img = $('<img />', {class: 'avatar', 'src': tweetObject.user.avatars.regular, alt: 'avatar'});
    let $userName = $('<h2>', {class: 'username'}).append(`${tweetObject.user.name}`);
    let $handle = $('<span>', {class: 'tag'}).append(`${tweetObject.user.handle}`);

    let $header = $('<header>').append($img).append($userName).append($handle);

    let $tweet = $('<p>', {class: 'tweet'}).append(`${tweetObject.content.text}`);

    let $date = $('<p>', {class: 'date'}).append(`${Math.ceil((Math.abs(new Date() - new Date(tweetObject.created_at))) / (1000 *3600 * 24))} days ago`);

    let $icons = $('<span id="icons"><i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i></span>')

    let $footer = $('<footer>').append($date).append($icons);

    return $tweetArticle.append($header).append($tweet).append($footer);
  }

  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  const renderTweets = (tweetObjectArray) => {
    for (tweetObject of tweetObjectArray) {
      $('#tweet-container').append(createTweetElement(tweetObject));
    }
  }

  // const $tweet = createTweetElement(tweetData);

  // console.log($tweet);

  // $('#tweet-container').append($tweet);

  renderTweets(data);
})

