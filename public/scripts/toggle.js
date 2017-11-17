/* Toggle Function 
 * Hide and show new tweet section when clicking compose button
 */

$(document).ready(function(){
  $('#nav-bar .compose').on('click', function(event) {
    $('.new-tweet').toggle();
    $('.container textarea').focus();
  })
});

