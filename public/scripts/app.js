/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to display time stamp for tweet post
function timeDifference(current, previous) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    } else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    } else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

// function to render tweets
function renderTweets(tweets) {
  for (tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    tweetElement.appendTo($('.container'));
  }
}

// cross-site escepe function

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function to render tweet elements to html 

function createTweetElement(tweet) {
  var $tweet = $('<article>').addClass('tweets');
  
  // create header
  var $header = $('<header>');
  var $img = $('<img>').addClass('profile');
  $img.attr('src', tweet.user.avatars.small);
  $img.appendTo($header);
  var $h2 = $('<h2>').text(tweet.user.name);
  $h2.appendTo($header);
  let $span = $('<span>').html(`${escape(tweet.user.handle)}`);
  $span.appendTo($header);
  $header.appendTo($tweet);
  var $p = $('<p>').text(tweet.content.text);
  $p.appendTo($tweet);
  var $footer = $('<footer>');
  var $footer_span = $('<span>').addClass('postdate').text(timeDifference(new Date(), tweet.created_at));
  $footer_span.appendTo($footer);
  $footer.appendTo($tweet);
  return $tweet;
}

$(document).ready(function(){

  // submission and fetching tweet with AJAX
  $(".new-tweet form").on('submit', function(event) {
    event.preventDefault(); 
    // validate input text
    let len = $('textarea').val().length;
    if ( len < 1 && len > 0){
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $(this).serialize(),
        success: function(){
          console.log('ok');
        }
      });
    } else {
      $('.new-tweet').append('<span class="' + 'err' + '">! Please Enter between 1 to 140 characters! </span>');
    } 
  });

    // remove submission error message when cursor is back to textarea
    $(".new-tweet form textarea").on('click', function(event) {
      $('.new-tweet .err').fadeOut('slow'); 
    });
    
// function to get data from the /tweet page
  function loadTweets(){
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function(data){
        renderTweets(data);  
      }
    });
  }

  loadTweets();

});
