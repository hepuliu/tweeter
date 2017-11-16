/* Hover Function 
 * Add icons when hover on the tweets section
 */

$(document).ready(function(){
  // set var to contain html with 3 icons
  let icons = `
    <span class='icons'>
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </span>
  `;

  // hover function to show icons on tweets
  $('article.tweets').hover(function(){
    $(this).find(".postdate").after(icons);
  }, function(){
    $(this).find(".icons").remove();
  });

  
  // hover function to toggle tweet input form by clikcing compose
  $('#nav-bar .compose').on('click', function(event) {
    $('.new-tweet').toggle();
    $('.container textarea').focus();
  })
  
});

